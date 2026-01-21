import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Home from './components/Home';
import Simulation from './components/Simulation';
import Summary from './components/Summary';
import Resources from './components/Resources';
import { scenarios } from './data/scenarios';

function App() {
    // Initialize state from localStorage or defaults
    const [currentView, setCurrentView] = useState(() => {
        return localStorage.getItem('currentView') || 'home';
    });

    const [activeScenarioId, setActiveScenarioId] = useState(() => {
        return localStorage.getItem('activeScenarioId') || null;
    });

    const [simulationResult, setSimulationResult] = useState(null); // Don't persist result for now, simple enough to reset on reload if mid-summary

    const [score, setScore] = useState(() => {
        return parseInt(localStorage.getItem('score') || '0', 10);
    });

    const [completedScenarios, setCompletedScenarios] = useState(() => {
        const saved = localStorage.getItem('completedScenarios');
        return saved ? JSON.parse(saved) : [];
    });

    // Redirect to home if on summary but no result (e.g. after refresh)
    useEffect(() => {
        if (currentView === 'summary' && !simulationResult) {
            setCurrentView('home');
        }
    }, [currentView, simulationResult]);

    // Persist state changes
    useEffect(() => {
        localStorage.setItem('currentView', currentView);
        if (activeScenarioId) localStorage.setItem('activeScenarioId', activeScenarioId);
        else localStorage.removeItem('activeScenarioId');
        localStorage.setItem('score', score.toString());
        localStorage.setItem('completedScenarios', JSON.stringify(completedScenarios));
    }, [currentView, activeScenarioId, score, completedScenarios]);

    const startScenario = (id) => {
        // if (completedScenarios.includes(id)) return; // Removed to allow Retry logic. Score is protected in endScenario.
        setActiveScenarioId(id);
        setCurrentView('simulation');
        setSimulationResult(null);
    };

    const endScenario = (result) => {
        setSimulationResult(result);
        setCurrentView('summary');

        // Only update score if this scenario hasn't been completed in this session
        if (activeScenarioId && !completedScenarios.includes(activeScenarioId)) {
            const newScore = result.success ? score + 1 : score - 1;
            setScore(newScore);
            setCompletedScenarios(prev => [...prev, activeScenarioId]);
        }
    };

    const goHome = () => {
        setCurrentView('home');
        setActiveScenarioId(null);
        setSimulationResult(null);
    };

    const resetGame = () => {
        setScore(0);
        setCompletedScenarios([]);
        setCurrentView('home');
        setActiveScenarioId(null);
        setSimulationResult(null);
        localStorage.clear();
    };

    return (
        <Layout
            onHome={goHome}
            score={score}
            totalScenarios={6}
            onReset={resetGame}
        >
            {currentView === 'home' && (
                <Home
                    scenarios={scenarios}
                    onSelect={startScenario}
                    completedScenarios={completedScenarios}
                    onResources={() => setCurrentView('resources')}
                />
            )}
            {currentView === 'simulation' && activeScenarioId && (
                <Simulation
                    scenario={scenarios.find(s => s.id === activeScenarioId)}
                    onEnd={endScenario}
                    onResetSession={resetGame}
                />
            )}
            {currentView === 'summary' && simulationResult && (
                <Summary
                    result={simulationResult}
                    scenario={scenarios.find(s => s.id === activeScenarioId)}
                    onHome={goHome}
                    onRetry={() => {
                        // Retry logic: Just restart the scenario.
                        // Since we only update score if NOT in completedScenarios, 
                        // retrying won't double-count unless we remove it from completedScenarios.
                        // For now, let's keep it simple: Retry allows you to play again, but score is locked.
                        startScenario(activeScenarioId);
                    }}
                />
            )}
            {currentView === 'resources' && (
                <Resources onBack={goHome} />
            )}
        </Layout>
    );
}

export default App;

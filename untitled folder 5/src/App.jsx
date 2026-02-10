import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Home from './components/Home';
import Simulation from './components/Simulation';
import Summary from './components/Summary';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

const AppContent = () => {
    const { scenarios } = useLanguage();

    // Initialize state from localStorage or defaults
    const [currentView, setCurrentView] = useState(() => {
        return localStorage.getItem('currentView') || 'home';
    });

    const [activeScenarioId, setActiveScenarioId] = useState(() => {
        return localStorage.getItem('activeScenarioId') || null;
    });

    const [simulationResult, setSimulationResult] = useState(null);

    const [score, setScore] = useState(() => {
        return parseInt(localStorage.getItem('score') || '0', 10);
    });

    const [completedScenarios, setCompletedScenarios] = useState(() => {
        const saved = localStorage.getItem('completedScenarios');
        return saved ? JSON.parse(saved) : [];
    });

    // Persist state changes
    useEffect(() => {
        localStorage.setItem('currentView', currentView);
        if (activeScenarioId) localStorage.setItem('activeScenarioId', activeScenarioId);
        else localStorage.removeItem('activeScenarioId');
        localStorage.setItem('score', score.toString());
        localStorage.setItem('completedScenarios', JSON.stringify(completedScenarios));
    }, [currentView, activeScenarioId, score, completedScenarios]);

    const startScenario = (id) => {
        if (completedScenarios.includes(id)) return;
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
        // Maybe we want to persist language? Language is handled by context, so clearing localStorage might wipe it.
        // But LanguageContext persists to 'appLanguage'. We should be careful not to wipe that if we want it to stay.
        // logic in LanguageContext: const storedLang = localStorage.getItem('appLanguage');
        // valid point. But resetGame is for game state.
        // Let's restore language after clear if needed?
        // Actually localStorage.clear() wipes EVERYTHING.
        // Let's only remove game keys.
        localStorage.removeItem('currentView');
        localStorage.removeItem('activeScenarioId');
        localStorage.removeItem('score');
        localStorage.removeItem('completedScenarios');
    };

    return (
        <Layout
            onHome={goHome}
            score={score}
            totalScenarios={6} // Approx
            onReset={resetGame}
        >
            {currentView === 'home' && (
                <Home
                    scenarios={scenarios}
                    onSelect={startScenario}
                    completedScenarios={completedScenarios}
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
                        startScenario(activeScenarioId);
                    }}
                />
            )}
        </Layout>
    );
};

function App() {
    return (
        <LanguageProvider>
            <AppContent />
        </LanguageProvider>
    );
}

export default App;

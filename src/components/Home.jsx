import React from 'react';

const Home = ({ scenarios, onSelect, completedScenarios = [], onResources }) => {
    return (
        <div>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Scam Escape Room</h2>
                <p style={{ fontSize: '1.2rem' }}>
                    Learn how to spot and stop scams before they happen. Choose a scenario below to start.
                </p>
                <button
                    onClick={onResources}
                    className="btn btn-secondary"
                    style={{ marginTop: '20px' }}
                >
                    📚 View Resources & Learn More
                </button>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '24px'
            }}>
                {scenarios.map(scenario => {
                    const isCompleted = completedScenarios.includes(scenario.id);
                    return (
                        <div key={scenario.id} className="card">
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{scenario.title}</h3>
                            <p style={{ marginBottom: '20px' }}>{scenario.description}</p>
                            <button
                                onClick={() => onSelect(scenario.id)}
                                className="btn"
                                style={{ width: '100%', backgroundColor: isCompleted ? '#e0e0e0' : 'var(--color-yellow)' }}
                            >
                                {isCompleted ? 'Play Again' : 'Start Simulation'}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Home;

import React from 'react';

const Layout = ({ children, onHome, score, totalScenarios, onReset }) => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <header style={{
                backgroundColor: 'var(--color-yellow)',
                padding: '20px',
                borderBottom: '4px solid var(--color-black)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: '900', margin: 0 }}>SCAM ESCAPE ROOM</h1>
                    {score !== undefined && (
                        <div style={{
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            backgroundColor: 'white',
                            padding: '5px 10px',
                            borderRadius: '8px',
                            border: '2px solid black'
                        }}>
                            Score: {score} / {totalScenarios}
                        </div>
                    )}
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    {onReset && (
                        <button
                            onClick={onReset}
                            className="btn btn-secondary"
                            style={{ padding: '8px 16px', fontSize: '1rem' }}
                        >
                            Reset
                        </button>
                    )}
                    <button
                        onClick={onHome}
                        className="btn btn-secondary"
                        style={{ padding: '8px 16px', fontSize: '1rem' }}
                    >
                        Home
                    </button>
                </div>
            </header>

            <main style={{ flex: 1, padding: '40px 20px', backgroundColor: '#f0f0f0' }}>
                <div className="container">
                    {children}
                </div>
            </main>

            <footer style={{
                textAlign: 'center',
                padding: '20px',
                backgroundColor: 'var(--color-black)',
                color: 'var(--color-white)'
            }}>
                <p>Scam Prevention Simulator • Educational Purpose Only</p>
            </footer>
        </div>
    );
};

export default Layout;

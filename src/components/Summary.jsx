import React from 'react';

const Summary = ({ result, scenario, onHome, onRetry }) => {
    const isSuccess = result.success;

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{
                textAlign: 'center',
                padding: '40px',
                backgroundColor: isSuccess ? '#d4edda' : '#f8d7da',
                border: `4px solid ${isSuccess ? '#155724' : '#721c24'}`,
                borderRadius: '16px',
                marginBottom: '40px'
            }}>
                <h2 style={{
                    fontSize: '3rem',
                    color: isSuccess ? '#155724' : '#721c24',
                    marginBottom: '20px'
                }}>
                    {isSuccess ? 'SAFE!' : 'SCAMMED!'}
                </h2>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                    {result.message}
                </p>
            </div>

            <div className="card" style={{ marginBottom: '40px' }}>
                <h3 style={{ borderBottom: '2px solid black', paddingBottom: '10px', marginBottom: '20px' }}>
                    What happened?
                </h3>
                <p style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>
                    {result.feedback}
                </p>
            </div>

            <div className="card" style={{ marginBottom: '40px' }}>
                <h3 style={{ borderBottom: '2px solid black', paddingBottom: '10px', marginBottom: '20px' }}>
                    Your Decision Timeline
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {result.history.map((item, index) => (
                        <li key={index} style={{
                            marginBottom: '15px',
                            padding: '15px',
                            backgroundColor: '#f8f9fa',
                            borderRadius: '8px',
                            borderLeft: '4px solid var(--color-yellow)'
                        }}>
                            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Step {index + 1}</div>
                            <div>You chose: <strong>"{item.choice}"</strong></div>
                            <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '5px' }}>
                                Time taken: {item.timeSpent} seconds
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                <button onClick={onRetry} className="btn btn-primary" style={{ minWidth: '150px' }}>
                    Retry Scenario
                </button>
                <button onClick={onHome} className="btn btn-secondary" style={{ minWidth: '150px' }}>
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default Summary;

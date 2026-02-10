import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Home = ({ scenarios, onSelect, completedScenarios = [] }) => {
    const { t } = useLanguage();

    return (
        <div>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{t('app_title')}</h2>
                <p style={{ fontSize: '1.2rem' }}>
                    {t('subtitle')}
                </p>
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
                                onClick={() => !isCompleted && onSelect(scenario.id)}
                                className={`btn ${isCompleted ? 'btn-disabled' : ''}`}
                                style={{ width: '100%' }}
                                disabled={isCompleted}
                            >
                                {isCompleted ? t('completed') : t('start_simulation')}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Home;

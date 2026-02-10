import React from 'react';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '../context/LanguageContext';

const Layout = ({ children, onHome, score, totalScenarios, onReset }) => {
    const { t } = useLanguage();

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
                    <h1 style={{ fontSize: '1.5rem', fontWeight: '900', margin: 0 }}>
                        {t('app_title')}
                    </h1>
                    {score !== undefined && (
                        <div style={{
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            backgroundColor: 'white',
                            padding: '5px 10px',
                            borderRadius: '8px',
                            border: '2px solid black'
                        }}>
                            {t('score')}: {score}
                        </div>
                    )}
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <LanguageSelector />
                    {onReset && (
                        <button
                            onClick={onReset}
                            className="btn btn-secondary"
                            style={{ padding: '8px 16px', fontSize: '1rem' }}
                        >
                            {t('reset')}
                        </button>
                    )}
                    <button
                        onClick={onHome}
                        className="btn btn-secondary"
                        style={{ padding: '8px 16px', fontSize: '1rem' }}
                    >
                        {t('home')}
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
                <p>{t('footer_text')}</p>
            </footer>
        </div>
    );
};

export default Layout;

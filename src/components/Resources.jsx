import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Resources = ({ onBack }) => {
    const { t } = useTranslation();
    const [expandedFaq, setExpandedFaq] = useState(null);

    const toggleFaq = (id) => {
        setExpandedFaq(expandedFaq === id ? null : id);
    };

    // Scam type data with icons and colors
    const scamTypes = [
        { icon: "📧", key: "phishing", color: "#e3f2fd" },
        { icon: "💻", key: "techSupport", color: "#fce4ec" },
        { icon: "🎁", key: "prize", color: "#fff3e0" },
        { icon: "💼", key: "fakeJob", color: "#e8f5e9" },
        { icon: "💕", key: "romance", color: "#fce4ec" },
        { icon: "👵", key: "grandparent", color: "#f3e5f5" },
        { icon: "📈", key: "investment", color: "#e0f2f1" },
        { icon: "💳", key: "debt", color: "#fff8e1" }
    ];

    const redFlags = [
        { icon: "⚠️", key: "urgency" },
        { icon: "👤", key: "generic" },
        { icon: "📧", key: "sender" },
        { icon: "🔗", key: "urls" },
        { icon: "🔐", key: "passwords" },
        { icon: "✏️", key: "spelling" },
        { icon: "📎", key: "attachments" },
        { icon: "😰", key: "emotional" }
    ];

    const protectionTips = [
        { icon: "🛑", key: "pause" },
        { icon: "🔍", key: "hover" },
        { icon: "🌐", key: "direct" },
        { icon: "📞", key: "verify" },
        { icon: "🚫", key: "block" },
        { icon: "🔒", key: "twoFactor" }
    ];

    const faqItems = [
        { id: 1, key: "q1" },
        { id: 2, key: "q2" },
        { id: 3, key: "q3" },
        { id: 4, key: "q4" },
        { id: 5, key: "q5" },
        { id: 6, key: "q6" }
    ];

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            {/* Header */}

            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                <h1 style={{ fontSize: '2.8rem', marginBottom: '15px' }}>
                    {t('resources.title')}
                </h1>
                <p style={{ fontSize: '1.3rem', color: '#555', maxWidth: '600px', margin: '0 auto' }}>
                    {t('resources.subtitle')}
                </p>
            </div>

            {/* Common Scam Types - Grid Layout */}
            <section style={{ marginBottom: '60px' }}>
                <h2 style={{
                    fontSize: '2rem',
                    marginBottom: '25px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    <span style={{
                        backgroundColor: 'var(--color-yellow)',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        border: '2px solid black'
                    }}>
                        {t('resources.scamTypes.title')}
                    </span>
                </h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '20px'
                }}>
                    {scamTypes.map((scam, index) => (
                        <div key={index} style={{
                            backgroundColor: scam.color,
                            borderRadius: '16px',
                            padding: '24px',
                            border: '2px solid #e0e0e0',
                            transition: 'transform 0.2s, box-shadow 0.2s'
                        }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{scam.icon}</div>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>
                                {t(`resources.scamTypes.${scam.key}.title`)}
                            </h3>
                            <p style={{ fontSize: '0.95rem', color: '#333', lineHeight: '1.5' }}>
                                {t(`resources.scamTypes.${scam.key}.description`)}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Red Flags Section */}
            <section style={{ marginBottom: '60px' }}>
                <h2 style={{
                    fontSize: '2rem',
                    marginBottom: '25px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    <span style={{
                        backgroundColor: '#ffcdd2',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        border: '2px solid black'
                    }}>
                        {t('resources.redFlags.title')}
                    </span>
                </h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '16px'
                }}>
                    {redFlags.map((flag, index) => (
                        <div key={index} style={{
                            backgroundColor: 'white',
                            borderRadius: '12px',
                            padding: '20px',
                            border: '2px solid #333',
                            boxShadow: '3px 3px 0px #333',
                            display: 'flex',
                            gap: '15px',
                            alignItems: 'flex-start'
                        }}>
                            <span style={{ fontSize: '1.8rem' }}>{flag.icon}</span>
                            <div>
                                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                                    {t(`resources.redFlags.${flag.key}.text`)}
                                </div>
                                <div style={{ fontSize: '0.9rem', color: '#666', fontStyle: 'italic' }}>
                                    {t(`resources.redFlags.${flag.key}.detail`)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Protection Tips */}
            <section style={{ marginBottom: '60px' }}>
                <h2 style={{
                    fontSize: '2rem',
                    marginBottom: '25px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    <span style={{
                        backgroundColor: '#c8e6c9',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        border: '2px solid black'
                    }}>
                        {t('resources.protection.title')}
                    </span>
                </h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '20px'
                }}>
                    {protectionTips.map((tip, index) => (
                        <div key={index} style={{
                            backgroundColor: '#f8f9fa',
                            borderRadius: '16px',
                            padding: '24px',
                            border: '2px solid #333',
                            boxShadow: '4px 4px 0px var(--color-yellow)'
                        }}>
                            <div style={{
                                fontSize: '2rem',
                                marginBottom: '12px',
                                backgroundColor: 'white',
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '2px solid #333'
                            }}>
                                {tip.icon}
                            </div>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>
                                {t(`resources.protection.${tip.key}.title`)}
                            </h3>
                            <p style={{ fontSize: '0.95rem', color: '#555' }}>
                                {t(`resources.protection.${tip.key}.text`)}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Identity Theft & Data Security - Two Column */}
            <section style={{ marginBottom: '60px' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                    gap: '30px'
                }}>
                    {/* Identity Theft */}
                    <div className="card" style={{
                        backgroundColor: '#fff3e0',
                        border: '3px solid #333'
                    }}>
                        <h3 style={{
                            fontSize: '1.5rem',
                            marginBottom: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}>
                            {t('resources.identityTheft.title')}
                        </h3>
                        <p style={{ marginBottom: '15px' }}>
                            <strong>{t('resources.identityTheft.what')}</strong> {t('resources.identityTheft.whatText')}
                        </p>
                        <p style={{ marginBottom: '15px', fontWeight: 'bold' }}>{t('resources.identityTheft.how')}</p>
                        <ul style={{ marginLeft: '20px', marginBottom: '15px' }}>
                            {t('resources.identityTheft.howItems', { returnObjects: true }).map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                        <p style={{ marginBottom: '10px', fontWeight: 'bold' }}>{t('resources.identityTheft.warning')}</p>
                        <ul style={{ marginLeft: '20px' }}>
                            {t('resources.identityTheft.warningItems', { returnObjects: true }).map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Passwords & 2FA */}
                    <div className="card" style={{
                        backgroundColor: '#e8f5e9',
                        border: '3px solid #333'
                    }}>
                        <h3 style={{
                            fontSize: '1.5rem',
                            marginBottom: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}>
                            {t('resources.passwords.title')}
                        </h3>
                        <p style={{ marginBottom: '15px' }}>
                            <strong>{t('resources.passwords.strong')}</strong> {t('resources.passwords.strongText')}
                        </p>
                        <p style={{ marginBottom: '15px' }}>
                            <strong>{t('resources.passwords.manager')}</strong> {t('resources.passwords.managerText')}
                        </p>
                        <p style={{ marginBottom: '15px' }}>
                            <strong>{t('resources.passwords.twoFactor')}</strong> {t('resources.passwords.twoFactorText')}
                        </p>
                        <div style={{
                            backgroundColor: 'white',
                            padding: '12px',
                            borderRadius: '8px',
                            border: '2px solid #333',
                            marginTop: '10px'
                        }}>
                            {t('resources.passwords.tip')} <strong>{t('resources.passwords.tipText')}</strong>
                        </div>
                    </div>
                </div>
            </section>

            {/* Malware & Misinformation Row */}
            <section style={{ marginBottom: '60px' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                    gap: '30px'
                }}>
                    {/* Malware */}
                    <div className="card" style={{
                        backgroundColor: '#fce4ec',
                        border: '3px solid #333'
                    }}>
                        <h3 style={{
                            fontSize: '1.5rem',
                            marginBottom: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}>
                            {t('resources.malware.title')}
                        </h3>
                        <p style={{ marginBottom: '15px' }}>
                            <strong>{t('resources.malware.description')}</strong>
                        </p>
                        <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>{t('resources.malware.staySafe')}</p>
                        <ul style={{ marginLeft: '20px' }}>
                            {t('resources.malware.items', { returnObjects: true }).map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Misinformation */}
                    <div className="card" style={{
                        backgroundColor: '#e3f2fd',
                        border: '3px solid #333'
                    }}>
                        <h3 style={{
                            fontSize: '1.5rem',
                            marginBottom: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}>
                            {t('resources.misinformation.title')}
                        </h3>
                        <p style={{ marginBottom: '15px' }}>
                            {t('resources.misinformation.description')}
                        </p>
                        <ul style={{ marginLeft: '20px' }}>
                            {t('resources.misinformation.items', { returnObjects: true }).map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* FAQ Section with Accordion */}
            <section style={{ marginBottom: '60px' }}>
                <h2 style={{
                    fontSize: '2rem',
                    marginBottom: '25px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    <span style={{
                        backgroundColor: '#e1bee7',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        border: '2px solid black'
                    }}>
                        {t('resources.faq.title')}
                    </span>
                </h2>
                <p style={{ marginBottom: '20px', fontSize: '1.1rem' }}>
                    {t('resources.faq.subtitle')}
                </p>

                {faqItems.map((faq) => (
                    <div key={faq.id} style={{ marginBottom: '12px' }}>
                        <div
                            onClick={() => toggleFaq(faq.id)}
                            style={{
                                backgroundColor: expandedFaq === faq.id ? 'var(--color-yellow)' : 'white',
                                padding: '18px 24px',
                                borderRadius: expandedFaq === faq.id ? '12px 12px 0 0' : '12px',
                                border: '2px solid #333',
                                cursor: 'pointer',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                fontWeight: 'bold',
                                fontSize: '1.1rem',
                                transition: 'background-color 0.2s'
                            }}
                        >
                            {t(`resources.faq.${faq.key}.question`)}
                            <span style={{ fontSize: '1.5rem' }}>
                                {expandedFaq === faq.id ? '−' : '+'}
                            </span>
                        </div>
                        {expandedFaq === faq.id && (
                            <div style={{
                                backgroundColor: '#f8f9fa',
                                padding: '20px 24px',
                                borderRadius: '0 0 12px 12px',
                                border: '2px solid #333',
                                borderTop: 'none',
                                lineHeight: '1.6'
                            }}>
                                {t(`resources.faq.${faq.key}.answer`)}
                            </div>
                        )}
                    </div>
                ))}
            </section>

            {/* Digital Citizenship Footer */}
            <section style={{ marginBottom: '40px' }}>
                <div style={{
                    backgroundColor: '#333',
                    color: 'white',
                    borderRadius: '16px',
                    padding: '40px',
                    textAlign: 'center'
                }}>
                    <h3 style={{ fontSize: '1.8rem', marginBottom: '15px', color: 'var(--color-yellow)' }}>
                        {t('resources.citizenship.title')}
                    </h3>
                    <p style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 20px', lineHeight: '1.6' }}>
                        {t('resources.citizenship.description')}
                    </p>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '30px',
                        flexWrap: 'wrap',
                        marginTop: '25px'
                    }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '2rem' }}>💭</div>
                            <div style={{ fontSize: '0.9rem' }}>{t('resources.citizenship.think')}</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '2rem' }}>🤝</div>
                            <div style={{ fontSize: '0.9rem' }}>{t('resources.citizenship.respect')}</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '2rem' }}>💪</div>
                            <div style={{ fontSize: '0.9rem' }}>{t('resources.citizenship.standUp')}</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '2rem' }}>✅</div>
                            <div style={{ fontSize: '0.9rem' }}>{t('resources.citizenship.verify')}</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Helpful Links */}
            <section style={{ marginBottom: '40px' }}>
                <div className="card" style={{ textAlign: 'center' }}>
                    <h3 style={{ marginBottom: '15px' }}>{t('resources.officialResources.title')}</h3>
                    <p style={{ marginBottom: '20px' }}>
                        {t('resources.officialResources.description')}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                        <div style={{
                            backgroundColor: '#e3f2fd',
                            padding: '15px 25px',
                            borderRadius: '8px',
                            border: '2px solid #333'
                        }}>
                            <strong>{t('resources.officialResources.identityTheft')}</strong><br />
                            <span style={{ fontSize: '0.9rem' }}>{t('resources.officialResources.identityTheftDesc')}</span>
                        </div>
                        <div style={{
                            backgroundColor: '#e3f2fd',
                            padding: '15px 25px',
                            borderRadius: '8px',
                            border: '2px solid #333'
                        }}>
                            <strong>{t('resources.officialResources.reportFraud')}</strong><br />
                            <span style={{ fontSize: '0.9rem' }}>{t('resources.officialResources.reportFraudDesc')}</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Resources;

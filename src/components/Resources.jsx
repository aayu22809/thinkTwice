import React, { useState } from 'react';

const Resources = ({ onBack }) => {
    const [expandedFaq, setExpandedFaq] = useState(null);

    const toggleFaq = (id) => {
        setExpandedFaq(expandedFaq === id ? null : id);
    };

    // Scam type data with icons and colors
    const scamTypes = [
        { icon: "📧", title: "Phishing & Smishing", color: "#e3f2fd", description: "Fake emails or texts pretending to be from banks, employers, or services you use—trying to steal your login info or personal details." },
        { icon: "💻", title: "Tech Support Scams", color: "#fce4ec", description: "Pop-ups or calls claiming your computer has a virus. They want money for fake 'repairs' or remote access to steal your data." },
        { icon: "🎁", title: "Prize & Lottery Scams", color: "#fff3e0", description: "Messages saying you won money or a prize you never entered to win. They'll ask for fees or personal info to 'claim' it." },
        { icon: "💼", title: "Fake Job Offers", color: "#e8f5e9", description: "Jobs requiring no interview, offering high pay, or asking you to deposit checks and wire money back. Too easy = too fake." },
        { icon: "💕", title: "Romance Scams", color: "#fce4ec", description: "Fake online relationships where someone gains your trust, then invents emergencies to ask for money." },
        { icon: "👵", title: "Grandparent Scams", color: "#f3e5f5", description: "Callers pretending to be a grandchild or family member in trouble, begging for money and secrecy." },
        { icon: "📈", title: "Investment Scams", color: "#e0f2f1", description: "Promises of guaranteed high returns, often involving cryptocurrency. If it sounds too good to be true, it is." },
        { icon: "💳", title: "Debt Scams", color: "#fff8e1", description: "Fake collectors threatening legal action, or companies promising to erase debt for upfront fees." }
    ];

    const redFlags = [
        { icon: "⚠️", text: "Urgency & pressure tactics", detail: '"Act NOW or your account will be closed!"' },
        { icon: "👤", text: "Generic greetings", detail: '"Dear Customer" instead of your actual name' },
        { icon: "📧", text: "Suspicious sender address", detail: "Look for misspellings like 'amaz0n' or weird domains" },
        { icon: "🔗", text: "Mismatched or sketchy URLs", detail: "Hover before you click—where does it really go?" },
        { icon: "🔐", text: "Requests for passwords or PINs", detail: "Legitimate companies never ask for these via email/text" },
        { icon: "✏️", text: "Spelling & grammar errors", detail: "Professional companies proofread their messages" },
        { icon: "📎", text: "Suspicious attachments", detail: "Especially .exe, .zip, or files asking to 'enable macros'" },
        { icon: "😰", text: "Strong emotional triggers", detail: "Fear, excitement, or sympathy designed to override your judgment" }
    ];

    const protectionTips = [
        { icon: "🛑", title: "Pause Before You Click", text: "Urgency is a scammer's weapon. Take a breath and think." },
        { icon: "🔍", title: "Hover Over Links", text: "On desktop, hover to see where a link actually goes before clicking." },
        { icon: "🌐", title: "Go Direct", text: "Type the website URL yourself instead of clicking links in messages." },
        { icon: "📞", title: "Verify by Phone", text: "Call companies using numbers from their official website or your card." },
        { icon: "🚫", title: "Block & Report", text: "Don't engage with scammers. Block them and report to the platform." },
        { icon: "🔒", title: "Enable 2FA", text: "Two-factor authentication adds an extra lock even if your password is stolen." }
    ];

    const faqItems = [
        {
            id: 1,
            question: "What if I already clicked a suspicious link?",
            answer: "Don't panic. Close the page immediately without entering any information. Run a virus scan on your device. If you entered any passwords, change them right away starting with email and banking. Monitor your accounts for unusual activity."
        },
        {
            id: 2,
            question: "What if I gave someone my password?",
            answer: "Change that password immediately, plus any other accounts where you used the same password. Enable two-factor authentication. Contact the service (bank, email, etc.) to let them know. Monitor for suspicious activity."
        },
        {
            id: 3,
            question: "What if I sent money to a scammer?",
            answer: "Contact your bank or payment service (Venmo, CashApp, Zelle) immediately—they may be able to stop or reverse the transaction. File a report at reportfraud.ftc.gov. Unfortunately, money sent via wire transfer or gift cards is very hard to recover."
        },
        {
            id: 4,
            question: "What if someone is asking me to keep something secret from my family?",
            answer: "This is a major red flag. Scammers use secrecy to isolate you. Real emergencies don't require hiding from family. Always verify by calling the person directly on a number you already have—not one they give you."
        },
        {
            id: 5,
            question: "What if a 'friend' on social media is asking for money?",
            answer: "Their account may be hacked. Contact them through a different method (call or text their real number) to verify it's actually them before sending anything. Real friends will understand you being careful."
        },
        {
            id: 6,
            question: "What if I think my identity has been stolen?",
            answer: "Go to IdentityTheft.gov (the official FTC resource) to report it and get a personalized recovery plan. Contact your bank and credit card companies. Consider placing a fraud alert or credit freeze with the three credit bureaus."
        }
    ];

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            {/* Header */}
            <button
                onClick={onBack}
                className="btn btn-secondary"
                style={{ marginBottom: '20px' }}
            >
                ← Back to Home
            </button>

            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                <h1 style={{ fontSize: '2.8rem', marginBottom: '15px' }}>
                    🛡️ Safety Resources
                </h1>
                <p style={{ fontSize: '1.3rem', color: '#555', maxWidth: '600px', margin: '0 auto' }}>
                    Everything you need to know to protect yourself online. Knowledge is your best defense.
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
                        Common Scam Types
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
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>{scam.title}</h3>
                            <p style={{ fontSize: '0.95rem', color: '#333', lineHeight: '1.5' }}>
                                {scam.description}
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
                        🚩 Red Flags to Watch For
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
                                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>{flag.text}</div>
                                <div style={{ fontSize: '0.9rem', color: '#666', fontStyle: 'italic' }}>
                                    {flag.detail}
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
                        ✅ How to Protect Yourself
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
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>{tip.title}</h3>
                            <p style={{ fontSize: '0.95rem', color: '#555' }}>{tip.text}</p>
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
                            🆔 Identity Theft
                        </h3>
                        <p style={{ marginBottom: '15px' }}>
                            <strong>What it is:</strong> When someone uses your personal information (name, SSN, credit card) without permission.
                        </p>
                        <p style={{ marginBottom: '15px', fontWeight: 'bold' }}>How it happens:</p>
                        <ul style={{ marginLeft: '20px', marginBottom: '15px' }}>
                            <li>Phishing attacks</li>
                            <li>Card skimmers on ATMs</li>
                            <li>Data breaches</li>
                            <li>Stolen mail</li>
                            <li>Oversharing on social media</li>
                        </ul>
                        <p style={{ marginBottom: '10px', fontWeight: 'bold' }}>Warning signs:</p>
                        <ul style={{ marginLeft: '20px' }}>
                            <li>Unexplained charges</li>
                            <li>Bills for accounts you didn't open</li>
                            <li>Credit denials for no reason</li>
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
                            🔐 Passwords & Security
                        </h3>
                        <p style={{ marginBottom: '15px' }}>
                            <strong>Strong passwords:</strong> 12+ characters mixing letters, numbers, and symbols. Never reuse passwords.
                        </p>
                        <p style={{ marginBottom: '15px' }}>
                            <strong>Password managers:</strong> Apps that securely store and generate passwords so you don't have to remember them all.
                        </p>
                        <p style={{ marginBottom: '15px' }}>
                            <strong>Two-Factor Authentication (2FA):</strong> An extra verification step (like a text code) when logging in. Even if someone steals your password, they can't get in without the second factor.
                        </p>
                        <div style={{
                            backgroundColor: 'white',
                            padding: '12px',
                            borderRadius: '8px',
                            border: '2px solid #333',
                            marginTop: '10px'
                        }}>
                            💡 <strong>Tip:</strong> Enable 2FA on all important accounts—especially email, banking, and social media.
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
                            🦠 Malware Defense
                        </h3>
                        <p style={{ marginBottom: '15px' }}>
                            <strong>Malware</strong> is malicious software that can steal your data, spy on you, or damage your device.
                        </p>
                        <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>Stay safe:</p>
                        <ul style={{ marginLeft: '20px' }}>
                            <li>Only download from official app stores</li>
                            <li>Keep software updated</li>
                            <li>Don't open suspicious attachments</li>
                            <li>Back up your important files</li>
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
                            🔍 Spotting Misinformation
                        </h3>
                        <p style={{ marginBottom: '15px' }}>
                            False or misleading information spreads fast online. Before you believe or share:
                        </p>
                        <ul style={{ marginLeft: '20px' }}>
                            <li>Check the source—is it reputable?</li>
                            <li>Look for multiple credible reports</li>
                            <li>Check the date—old news reshared?</li>
                            <li>Read beyond the headline</li>
                            <li>Content making you angry? That's often the point.</li>
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
                        ❓ What If...? (FAQ)
                    </span>
                </h2>
                <p style={{ marginBottom: '20px', fontSize: '1.1rem' }}>
                    Click any question to see what you should do.
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
                            {faq.question}
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
                                {faq.answer}
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
                        🌐 Be a Good Digital Citizen
                    </h3>
                    <p style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 20px', lineHeight: '1.6' }}>
                        Online safety isn't just about protecting yourself. Think before you post, respect others' privacy,
                        stand up against bullying, and remember: there's a real person behind every screen.
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
                            <div style={{ fontSize: '0.9rem' }}>Think before posting</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '2rem' }}>🤝</div>
                            <div style={{ fontSize: '0.9rem' }}>Respect privacy</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '2rem' }}>💪</div>
                            <div style={{ fontSize: '0.9rem' }}>Stand up to bullying</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '2rem' }}>✅</div>
                            <div style={{ fontSize: '0.9rem' }}>Verify before sharing</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Helpful Links */}
            <section style={{ marginBottom: '40px' }}>
                <div className="card" style={{ textAlign: 'center' }}>
                    <h3 style={{ marginBottom: '15px' }}>📚 Official Resources</h3>
                    <p style={{ marginBottom: '20px' }}>
                        If you or someone you know has been scammed, these official resources can help:
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                        <div style={{
                            backgroundColor: '#e3f2fd',
                            padding: '15px 25px',
                            borderRadius: '8px',
                            border: '2px solid #333'
                        }}>
                            <strong>IdentityTheft.gov</strong><br />
                            <span style={{ fontSize: '0.9rem' }}>Report identity theft</span>
                        </div>
                        <div style={{
                            backgroundColor: '#e3f2fd',
                            padding: '15px 25px',
                            borderRadius: '8px',
                            border: '2px solid #333'
                        }}>
                            <strong>ReportFraud.ftc.gov</strong><br />
                            <span style={{ fontSize: '0.9rem' }}>Report scams & fraud</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Resources;

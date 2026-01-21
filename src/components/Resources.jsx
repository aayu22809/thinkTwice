import React from 'react';

const Resources = ({ onBack }) => {
    return (
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <button
                onClick={onBack}
                className="btn btn-secondary"
                style={{ marginBottom: '30px' }}
            >
                ← Back to Home
            </button>

            <h1 style={{ fontSize: '2.5rem', marginBottom: '30px', textAlign: 'center' }}>
                Online Safety & Scam Prevention Resources
            </h1>

            {/* Common Online Scams */}
            <section className="card" style={{ marginBottom: '30px' }}>
                <h2 style={{ borderBottom: '3px solid var(--color-yellow)', paddingBottom: '10px' }}>
                    Common Online Scams
                </h2>
                <p>
                    A scam is any dishonest scheme designed to trick you into giving away money, personal information, or access to your accounts. Scammers use psychology—like fear, excitement, or urgency—to catch you off guard. The good news is that once you know their tricks, you can spot them easily.
                </p>

                <h3>Types of Scams You Should Know</h3>
                <ul>
                    <li><strong>Phishing & Smishing:</strong> Fake emails or text messages pretending to be from your bank, employer, or a service you use. They try to get you to click a link or share login info.</li>
                    <li><strong>Tech Support Scams:</strong> Pop-ups or phone calls claiming your computer has a virus. They want you to pay for fake "repairs" or give them remote access.</li>
                    <li><strong>Prize & Lottery Scams:</strong> Messages saying you won money or a prize—but you have to pay a fee or share personal info to claim it.</li>
                    <li><strong>Fake Job Offers:</strong> "Jobs" that require no interview, offer unusually high pay, or ask you to deposit a check and send money back.</li>
                    <li><strong>Romance Scams:</strong> Fake online relationships where the scammer eventually asks for money due to an "emergency."</li>
                    <li><strong>Grandparent Scams:</strong> A caller pretends to be a grandchild in trouble and begs for money, asking you to keep it secret.</li>
                    <li><strong>Investment Scams:</strong> Promises of guaranteed high returns, often involving cryptocurrency. If it sounds too good to be true, it probably is.</li>
                    <li><strong>Debt Collection/Relief Scams:</strong> Fake debt collectors threatening legal action, or companies promising to erase your debt for an upfront fee.</li>
                </ul>
            </section>

            {/* Scam Red Flags */}
            <section className="card" style={{ marginBottom: '30px' }}>
                <h2 style={{ borderBottom: '3px solid var(--color-yellow)', paddingBottom: '10px' }}>
                    Scam Red Flags
                </h2>
                <p>
                    Scammers often follow the same patterns. Learning these warning signs can help you pause before you get tricked. If you notice one or more of these red flags, stop and verify before taking any action.
                </p>

                <ul>
                    <li><strong>Unfamiliar or mismatched contact info:</strong> The email address doesn't match the company name, or the phone number looks strange.</li>
                    <li><strong>Unexpected communication:</strong> You didn't enter a contest, apply for a job, or request help—but someone is contacting you about it anyway.</li>
                    <li><strong>Generic greetings:</strong> Messages that say "Dear Customer" or "Dear User" instead of your actual name.</li>
                    <li><strong>Urgency and fear tactics:</strong> Threats like "Your account will be closed in 24 hours!" or "Act NOW or face arrest!"</li>
                    <li><strong>Strong emotional triggers:</strong> Appeals to greed (you won!), fear (you're in trouble!), or sympathy (help a loved one!).</li>
                    <li><strong>Suspicious URLs:</strong> Links that look almost right but are slightly off, like "amaz0n.com" instead of "amazon.com."</li>
                    <li><strong>Requests for login info:</strong> Legitimate companies never ask you to "confirm" your password via email or text.</li>
                    <li><strong>Spelling/grammar errors:</strong> Professional companies proofread their messages. Lots of mistakes = a red flag.</li>
                    <li><strong>Suspicious attachments:</strong> Unexpected files, especially .exe, .zip, or documents asking you to "enable macros."</li>
                </ul>
            </section>

            {/* How to Avoid Getting Scammed */}
            <section className="card" style={{ marginBottom: '30px' }}>
                <h2 style={{ borderBottom: '3px solid var(--color-yellow)', paddingBottom: '10px' }}>
                    How to Avoid Getting Scammed
                </h2>
                <p>
                    Protecting yourself is easier than you think. These simple habits can stop most scams before they start. The key is to slow down, verify, and never let pressure push you into a quick decision.
                </p>

                <h3>Smart Habits</h3>
                <ul>
                    <li><strong>Think before you click:</strong> Hover over links to see where they really go. Look for "https://" and a lock icon, but remember that scam sites can have these too.</li>
                    <li><strong>Go directly to the source:</strong> Instead of clicking a link in an email, type the company's web address directly into your browser.</li>
                    <li><strong>Call official numbers:</strong> If you get a suspicious call or message, hang up and call the company using the number on their official website or your statement.</li>
                    <li><strong>Use spam filters:</strong> Turn on spam filtering for your email and enable call blocking on your phone.</li>
                    <li><strong>Enable multi-factor authentication (MFA):</strong> MFA adds an extra step (like a text code) when logging in, making it much harder for hackers to access your accounts even if they have your password.</li>
                    <li><strong>Adjust privacy settings:</strong> Limit who can see your posts and personal info on social media.</li>
                    <li><strong>Block and report:</strong> Don't engage with scammers. Block them and report the message to the platform, your email provider, or the FTC.</li>
                </ul>
            </section>

            {/* Protecting Your Identity */}
            <section className="card" style={{ marginBottom: '30px' }}>
                <h2 style={{ borderBottom: '3px solid var(--color-yellow)', paddingBottom: '10px' }}>
                    Protecting Your Identity
                </h2>
                <p>
                    <strong>Identity theft</strong> happens when someone uses your personal information—like your name, Social Security number, or credit card—without your permission. Thieves can use your identity to open accounts, make purchases, or commit crimes in your name.
                </p>

                <h3>How Identity Theft Happens</h3>
                <ul>
                    <li>Phishing emails or texts that trick you into sharing info.</li>
                    <li>Card skimming devices on ATMs or gas pumps.</li>
                    <li>Data breaches at companies that have your information.</li>
                    <li>Stolen mail containing bank statements or credit offers.</li>
                    <li>Oversharing on social media (birthdays, addresses, pet names used as passwords).</li>
                </ul>

                <h3>Warning Signs of Identity Theft</h3>
                <ul>
                    <li>Unexplained charges on your bank or credit card statements.</li>
                    <li>Bills or collection notices for accounts you didn't open.</li>
                    <li>Notifications that your data was part of a breach.</li>
                    <li>Being denied credit for no clear reason.</li>
                </ul>

                <h3>Protecting Yourself</h3>
                <ul>
                    <li>Be careful on public Wi-Fi—avoid logging into bank accounts or entering sensitive info.</li>
                    <li>Only enter personal info on secure websites (look for "https" and a lock icon).</li>
                    <li>Don't overshare on social media. Avoid posting your full birthdate, address, or daily location.</li>
                    <li>Shred documents with personal info before throwing them away.</li>
                    <li>Factory reset devices before selling or recycling them.</li>
                    <li>Monitor your bank and credit statements regularly for anything unusual.</li>
                    <li>If you suspect identity theft, report it at <strong>IdentityTheft.gov</strong>—the official FTC resource.</li>
                </ul>
            </section>

            {/* Data Privacy & Strong Passwords */}
            <section className="card" style={{ marginBottom: '30px' }}>
                <h2 style={{ borderBottom: '3px solid var(--color-yellow)', paddingBottom: '10px' }}>
                    Data Privacy & Strong Passwords
                </h2>
                <p>
                    Your data is valuable. Companies, advertisers, and hackers all want it. Taking control of your privacy means being intentional about what you share and how you secure your accounts.
                </p>

                <h3>Password Best Practices</h3>
                <ul>
                    <li>Use <strong>strong, unique passwords</strong> for every account. A strong password is long (12+ characters) and mixes letters, numbers, and symbols.</li>
                    <li>Never reuse passwords. If one account is breached, hackers will try that password everywhere else.</li>
                    <li>Use a <strong>password manager</strong>—an app that securely stores and generates strong passwords for you.</li>
                    <li>Enable <strong>two-factor authentication (2FA)</strong> wherever possible. 2FA requires a second verification step (like a code texted to your phone) in addition to your password.</li>
                </ul>

                <h3>Limiting Data Collection</h3>
                <ul>
                    <li>Review privacy settings on apps and social media to limit what data is collected.</li>
                    <li>Be cautious with apps that ask for unnecessary permissions (e.g., a flashlight app asking for your contacts).</li>
                    <li>Consider what you post—once something is online, it can be hard to remove.</li>
                </ul>
            </section>

            {/* Malware and Safe Downloads */}
            <section className="card" style={{ marginBottom: '30px' }}>
                <h2 style={{ borderBottom: '3px solid var(--color-yellow)', paddingBottom: '10px' }}>
                    Malware and Safe Downloads
                </h2>
                <p>
                    <strong>Malware</strong> is malicious software designed to damage your device, steal your data, or spy on your activity. It can come from downloads, email attachments, or infected websites.
                </p>

                <h3>How to Avoid Malware</h3>
                <ul>
                    <li><strong>Only download from trusted sources:</strong> Use official app stores and verified websites.</li>
                    <li><strong>Keep software updated:</strong> Updates often include security patches that fix vulnerabilities hackers exploit.</li>
                    <li><strong>Avoid suspicious links and attachments:</strong> Don't open files or click links from unknown senders.</li>
                    <li><strong>Back up important data:</strong> Regular backups mean you won't lose everything if your device is compromised.</li>
                    <li><strong>Use antivirus software:</strong> While not foolproof, it adds another layer of protection.</li>
                </ul>
            </section>

            {/* Spotting Misinformation */}
            <section className="card" style={{ marginBottom: '30px' }}>
                <h2 style={{ borderBottom: '3px solid var(--color-yellow)', paddingBottom: '10px' }}>
                    Spotting Misinformation
                </h2>
                <p>
                    <strong>Misinformation</strong> is false or misleading information that spreads online, sometimes by accident and sometimes on purpose. Learning to evaluate what you see helps you make informed decisions and avoid being manipulated.
                </p>

                <h3>How to Check If Something Is True</h3>
                <ul>
                    <li>Check the source: Is it a reputable news organization or an unknown blog?</li>
                    <li>Look for other reports: Are multiple credible sources reporting the same thing?</li>
                    <li>Check the date: Old stories are sometimes reshared as if they're new.</li>
                    <li>Read beyond the headline: Headlines can be misleading or exaggerated.</li>
                    <li>Be skeptical of strong emotions: Content designed to make you angry or scared often spreads faster, regardless of accuracy.</li>
                </ul>
            </section>

            {/* Being a Good Digital Citizen */}
            <section className="card" style={{ marginBottom: '30px' }}>
                <h2 style={{ borderBottom: '3px solid var(--color-yellow)', paddingBottom: '10px' }}>
                    Being a Good Digital Citizen
                </h2>
                <p>
                    Being safe online isn't just about protecting yourself—it's also about treating others with respect and contributing positively to online communities.
                </p>

                <h3>Tips for Positive Online Behavior</h3>
                <ul>
                    <li><strong>Think before you post:</strong> Would you say it to someone's face? Could it hurt someone?</li>
                    <li><strong>Respect others' privacy:</strong> Don't share photos or information about others without their permission.</li>
                    <li><strong>Stand up against cyberbullying:</strong> Support those being targeted and report harmful behavior.</li>
                    <li><strong>Don't spread unverified information:</strong> Check facts before sharing.</li>
                    <li><strong>Remember the human:</strong> Behind every screen is a real person with real feelings.</li>
                </ul>
                <p style={{ marginTop: '20px', fontStyle: 'italic' }}>
                    By staying informed and practicing good habits, you can enjoy the benefits of the internet while staying safe. Knowledge is your best defense!
                </p>
            </section>
        </div>
    );
};

export default Resources;

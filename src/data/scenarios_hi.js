export const scenarios = [
    {
        id: 'bank_scam',
        type: 'scam',
        isScam: true,
        title: 'बैंक ऑफ अमेरिका उच्च ब्याज प्रस्ताव',
        description: 'आपको एक उच्च-उपज बचत खाते के लिए एक विशेष प्रस्ताव प्राप्त होता है।',
        initialStep: 'start',
        steps: {
            start: {
                content: {
                    type: 'email',
                    sender: 'बैंक ऑफ अमेरिका <promo@bank-of-america-secure-offers.com>',
                    subject: 'विशेष: 10% APY बचत खाता प्रस्ताव',
                    body: 'प्रिय मूल्यवान ग्राहक, आपको 10% APY की गारंटी के साथ हमारे डायमंड टियर बचत खाते के लिए चुना गया है। यह प्रस्ताव 48 घंटों में समाप्त हो जाएगा। फंड ट्रांसफर करने और इस दर को लॉक करने के लिए अपने वर्तमान खाते को अभी लिंक करें।'
                },
                options: [
                    { label: 'प्रस्ताव का दावा करने के लिए लिंक पर क्लिक करें', next: 'fake_site', outcome: 'neutral' },
                    { label: 'प्रेषक का ईमेल पता जांचें', next: 'inspect_sender', outcome: 'neutral' },
                    { label: 'उत्तर दें और अधिक विवरण मांगें', next: 'reply_scammer', outcome: 'neutral' },
                    { label: 'जांच करने के लिए अपने वास्तविक बैंकिंग ऐप में लॉग इन करें', next: 'safe_check', outcome: 'safe' }
                ]
            },
            inspect_sender: {
                content: {
                    type: 'info',
                    text: 'आप प्रेषक के नाम पर होवर करते हैं। पता "promo@bank-of-america-secure-offers.com" है। असली बैंक ऑफ अमेरिका के ईमेल आमतौर पर "@bankofamerica.com" या "@emcom.bankofamerica.com" से आते हैं।'
                },
                options: [
                    { label: 'इसमें "बैंक ऑफ अमेरिका" लिखा है तो यह असली होगा। लिंक पर क्लिक करें।', next: 'fake_site', outcome: 'neutral' },
                    { label: 'डोमेन "bank-of-america-secure-offers.com" गूगल करें', next: 'google_domain', outcome: 'neutral' },
                    { label: 'स्पैम के रूप में चिह्नित करें और हटाएं', next: 'safe_end', outcome: 'safe' },
                    { label: 'पूछने के लिए किसी मित्र को फॉरवर्ड करें', next: 'friend_advice', outcome: 'neutral' }
                ]
            },
            friend_advice: {
                content: {
                    type: 'info',
                    text: 'आपका दोस्त कहता है: "वह बहुत नकली लग रहा है। 10% APY अभी असंभव है। और उस ईमेल पते को देखो!"'
                },
                options: [
                    { label: 'तुम सही हो। इसे हटा दो।', next: 'safe_end', outcome: 'safe' },
                    { label: 'मैं बस देखने के लिए क्लिक करूंगा।', next: 'fake_site', outcome: 'neutral' },
                    { label: 'यकीन करने के लिए उन्हें उत्तर दें।', next: 'reply_scammer', outcome: 'neutral' },
                    { label: 'दोस्त को अनदेखा करें, मुझे पैसे चाहिए।', next: 'fake_site', outcome: 'neutral' }
                ]
            },
            google_domain: {
                content: {
                    type: 'web',
                    url: 'www.google.com',
                    headline: 'खोज परिणाम',
                    body: '"bank-of-america-secure-offers.com" के लिए कोई आधिकारिक परिणाम नहीं मिले। कई फ़ोरम "फर्जी बैंक डोमेन घोटालों" पर चर्चा करते हैं।'
                },
                options: [
                    { label: 'परिणामों को अनदेखा करें, 10% याद करने के लिए बहुत अच्छा है।', next: 'fake_site', outcome: 'neutral' },
                    { label: 'ईमेल तुरंत बंद करें।', next: 'safe_end', outcome: 'safe' },
                    { label: 'यह पूछने के लिए ईमेल का उत्तर दें कि क्या वे वैध हैं।', next: 'reply_scammer', outcome: 'neutral' },
                    { label: 'यह देखने के लिए लिंक पर क्लिक करें कि यह कैसा दिखता है।', next: 'fake_site', outcome: 'neutral' }
                ]
            },
            reply_scammer: {
                content: {
                    type: 'email',
                    sender: 'बैंक ऑफ अमेरिका सहायता <support@bank-of-america-secure-offers.com>',
                    subject: 'Re: विशेष: 10% APY बचत खाता प्रस्ताव',
                    body: 'हां, यह हमारे सर्वश्रेष्ठ ग्राहकों के लिए एक वैध सीमित समय का प्रस्ताव है। हम इस स्थान को लंबे समय तक रोक नहीं सकते। कृपया पंजीकरण तुरंत पूरा करें अन्यथा हम यह स्थान किसी अन्य ग्राहक को दे देंगे।'
                },
                options: [
                    { label: 'ठीक है, मैं अभी साइन अप करूंगा।', next: 'fake_site', outcome: 'neutral' },
                    { label: 'इतना दबाव क्यों है?', next: 'pressure_response', outcome: 'neutral' },
                    { label: 'ईमेल हस्ताक्षर में दिए गए नंबर पर कॉल करें', next: 'fake_call', outcome: 'neutral' },
                    { label: 'प्रतिक्रिया देना बंद करें।', next: 'safe_end', outcome: 'safe' }
                ]
            },
            pressure_response: {
                content: {
                    type: 'email',
                    sender: 'बैंक ऑफ अमेरिका सहायता',
                    body: 'हमारे पास उच्च मांग है। यदि आप प्रस्ताव नहीं चाहते हैं, तो कृपया हमें बताएं ताकि हम इसे प्रतीक्षा सूची में अगले व्यक्ति को दे सकें। आपके पास 1 घंटा शेष है।'
                },
                options: [
                    { label: 'मैं चूकना नहीं चाहता। साइन अप करें।', next: 'fake_site', outcome: 'neutral' },
                    { label: 'यह गैर-पेशेवर है। ब्लॉक करें।', next: 'safe_end', outcome: 'safe' },
                    { label: 'उन्हें कॉल करें।', next: 'fake_call', outcome: 'neutral' },
                    { label: 'असली ऐप देखें।', next: 'safe_check', outcome: 'safe' }
                ]
            },
            fake_call: {
                content: {
                    type: 'phone',
                    caller: 'बैंक सहायता (फर्जी)',
                    audio_text: '"बैंक ऑफ अमेरिका सुरक्षित प्रस्ताव विभाग। पात्रता सत्यापित करने के लिए कृपया अपना खाता नंबर प्रदान करें।"'
                },
                options: [
                    { label: 'खाता संख्या दें', next: 'fail_login', outcome: 'fail' },
                    { label: 'फ़ोन काट दें।', next: 'safe_end', outcome: 'safe' },
                    { label: 'उनका नाम और आईडी पूछें', next: 'pressure_response', outcome: 'neutral' },
                    { label: 'कहो "मैं शाखा जाऊंगा"।', next: 'safe_check', outcome: 'safe' }
                ]
            },
            fake_site: {
                content: {
                    type: 'web',
                    url: 'www.bank-of-america-secure-offers.com/login',
                    headline: 'बैंक ऑफ अमेरिका - सुरक्षित लॉगिन',
                    body: '10% APY प्रस्ताव का दावा करने के लिए कृपया अपनी ऑनलाइन आईडी और पासकोड के साथ साइन इन करें।',
                    input: 'उपयोगकर्ता नाम/पासवर्ड फ़ील्ड दृश्यमान'
                },
                options: [
                    { label: 'अपना उपयोगकर्ता नाम और पासवर्ड दर्ज करें', next: 'fail_login', outcome: 'fail' },
                    { label: 'इसका परीक्षण करने के लिए "पासवर्ड भूल गए" पर क्लिक करें', next: 'broken_link', outcome: 'neutral' },
                    { label: 'यूआरएल बार को ध्यान से देखें', next: 'inspect_url', outcome: 'neutral' },
                    { label: 'टैब बंद करें', next: 'safe_end', outcome: 'safe' }
                ]
            },
            broken_link: {
                content: {
                    type: 'info',
                    text: 'आप "पासवर्ड भूल गए" पर क्लिक करते हैं लेकिन कुछ नहीं होता। या यह बस पेज को फिर से लोड करता है। असली साइटों में काम करने वाले लिंक होते हैं।'
                },
                options: [
                    { label: 'गड़बड़ होनी चाहिए। वैसे भी लॉगिन करें।', next: 'fail_login', outcome: 'fail' },
                    { label: 'फर्जी साइट! इसे बंद करें।', next: 'safe_end', outcome: 'safe' },
                    { label: 'दूसरा लिंक आज़माएं।', next: 'inspect_url', outcome: 'neutral' },
                    { label: 'फ़िशिंग की रिपोर्ट करें।', next: 'safe_report', outcome: 'safe' }
                ]
            },
            inspect_url: {
                content: {
                    type: 'info',
                    text: 'यूआरएल "bank-of-america-secure-offers.com" है। एक लॉक आइकन है, लेकिन इसका मतलब केवल यह है कि कनेक्शन एन्क्रिप्टेड है, यह नहीं कि साइट असली है।'
                },
                options: [
                    { label: 'इसमें लॉक है, तो यह सुरक्षित है। लॉगिन करें।', next: 'fail_login', outcome: 'fail' },
                    { label: 'यह असली साइट नहीं है। इसे बंद करें।', next: 'safe_end', outcome: 'safe' },
                    { label: 'उन्हें परेशान करने के लिए नकली विवरण दर्ज करें', next: 'troll_scammer', outcome: 'neutral' },
                    { label: 'स्क्रीनशॉट लें और रिपोर्ट करें', next: 'safe_report', outcome: 'safe' }
                ]
            },
            troll_scammer: {
                content: {
                    type: 'info',
                    text: 'आप "User: FakeUser" और "Pass: 12345" दर्ज करते हैं। साइट इसे स्वीकार करती है और आपके SSN के लिए पूछती है। यह स्पष्ट रूप से क्रेडेंशियल्स को मान्य नहीं करता है।'
                },
                options: [
                    { label: 'टैब तुरंत बंद करें।', next: 'safe_end', outcome: 'safe' },
                    { label: 'नकली SSN भी दर्ज करें।', next: 'safe_report', outcome: 'safe' },
                    { label: 'रुको, शायद मुझे असली जानकारी का उपयोग करना चाहिए?', next: 'fail_login', outcome: 'fail' },
                    { label: 'हंसें और चले जाएं।', next: 'safe_end', outcome: 'safe' }
                ]
            },
            safe_report: {
                isEnd: true,
                success: true,
                message: 'आपने घोटाले की रिपोर्ट की।',
                feedback: 'स्क्रीनशॉट लेना और असली बैंक को रिपोर्ट करना उन्हें नकली साइट को बंद करने में मदद करता है। बहुत बढ़िया काम!'
            },
            fail_login: {
                isEnd: true,
                success: false,
                message: 'आपने अपनी बैंकिंग क्रेडेंशियल्स दे दीं।',
                feedback: 'आपने एक नकली साइट में अपना असली उपयोगकर्ता नाम और पासवर्ड दर्ज किया। स्कैमर्स के पास अब आपके बैंक खाते तक पूरी पहुंच है।'
            },
            safe_end: {
                isEnd: true,
                success: true,
                message: 'आपने सुरक्षित रूप से घोटाले को नजरअंदाज कर दिया।',
                feedback: 'नकली डोमेन और "सच होने के लिए बहुत अच्छा" प्रस्ताव को पहचानने ने आपको बचा लिया। असली बैंक ईमेल के माध्यम से 48 घंटे की समय सीमा के साथ आप पर दबाव नहीं डालते हैं।'
            },
            safe_check: {
                isEnd: true,
                success: true,
                message: 'आपने विश्वसनीय चैनल के माध्यम से सत्यापित किया।',
                feedback: 'बहुत बढ़िया! हमेशा आधिकारिक ऐप या वेबसाइट पर खुद जाएं। आपने देखा होगा कि वहां ऐसा कोई प्रस्ताव मौजूद नहीं है।'
            }
        }
    },
    {
        id: 'social_security',
        type: 'scam',
        isScam: true,
        title: 'तत्काल: सामाजिक सुरक्षा निलंबन',
        description: 'आपको एक कॉल प्राप्त होती है जिसमें दावा किया जाता है कि आपके सामाजिक सुरक्षा नंबर को फ़्लैग किया गया है।',
        initialStep: 'start',
        steps: {
            start: {
                content: {
                    type: 'phone',
                    caller: 'सामाजिक सुरक्षा प्रशासन (1-800-772-1213)',
                    audio_text: '"यह सामाजिक सुरक्षा प्रशासन है। आपके सामाजिक सुरक्षा नंबर को संदिग्ध गतिविधि के लिए फ़्लैग किया गया है। खाता निलंबन से बचने के लिए तुरंत कॉल करें।"'
                },
                options: [
                    { label: 'कॉलर की कर्मचारी आईडी और कॉल बैक नंबर मांगें', next: 'ask_id', outcome: 'neutral' },
                    { label: 'पहचान की पुष्टि के लिए SSN प्रदान करें', next: 'fail_ssn', outcome: 'fail' },
                    { label: 'फ़ोन काटें और आधिकारिक SSA नंबर पर कॉल करें', next: 'safe_official', outcome: 'safe' },
                    { label: 'अनदेखा करें और नंबर ब्लॉक करें', next: 'safe_ignore', outcome: 'safe' }
                ]
            },
            ask_id: {
                content: {
                    type: 'phone',
                    caller: 'ऑफिसर रॉर्ट्स (फर्जी)',
                    audio_text: '"मेरा बैज नंबर SSA-8921 है। यह एक संघीय मामला है। यदि आप अभी सत्यापित नहीं करते हैं, तो हम आपकी गिरफ्तारी के लिए वारंट जारी करेंगे।"'
                },
                options: [
                    { label: 'मैं डर गया हूँ। मैं सत्यापित करूंगा।', next: 'fake_verification', outcome: 'neutral' },
                    { label: 'SSA गिरफ्तारी की धमकी नहीं देता। फ़ोन काट दें।', next: 'safe_hangup', outcome: 'safe' },
                    { label: 'पर्यवेक्षक से बात करने के लिए कहें', next: 'supervisor_fake', outcome: 'neutral' },
                    { label: 'उन्हें बताएं कि आप कॉल रिकॉर्ड कर रहे हैं', next: 'scammer_hangup', outcome: 'safe' }
                ]
            },
            supervisor_fake: {
                content: {
                    type: 'phone',
                    caller: 'पर्यवेक्षक (फर्जी)',
                    audio_text: '"यह पर्यवेक्षक स्मिथ है। ऑफिसर रॉबर्ट्स सही हैं। हमारे पास वारंट है। आपको हमारे सुरक्षित पोर्टल पर तुरंत सत्यापित करना होगा।"'
                },
                options: [
                    { label: 'ठीक है, मैं सत्यापित करूंगा।', next: 'fake_verification', outcome: 'neutral' },
                    { label: 'यह स्क्रिप्टेड लग रहा है। फ़ोन काट दें।', next: 'safe_hangup', outcome: 'safe' },
                    { label: 'वारंट नंबर मांगें।', next: 'fake_verification', outcome: 'neutral' },
                    { label: 'इनकार करें।', next: 'scammer_hangup', outcome: 'safe' }
                ]
            },
            scammer_hangup: {
                isEnd: true,
                success: true,
                message: 'स्कैमर ने फ़ोन काट दिया।',
                feedback: 'स्कैमर्स को रिकॉर्ड किए जाने या पूछताछ किए जाने से नफरत है। जैसे ही आपने पीछे धकेला, उन्हें पता चल गया कि आप एक आसान लक्ष्य नहीं थे।'
            },
            fake_verification: {
                content: {
                    type: 'web',
                    url: 'www.ssa-verify-secure-portal.com',
                    headline: 'सामाजिक सुरक्षा सत्यापन',
                    body: 'गिरफ्तारी वारंट को रद्द करने के लिए कृपया अपना पूरा सामाजिक सुरक्षा नंबर दर्ज करें।',
                    input: 'SSN फ़ील्ड'
                },
                options: [
                    { label: 'SSN दर्ज करें', next: 'fail_ssn', outcome: 'fail' },
                    { label: 'यह वेबसाइट नकली लग रही है। इसे बंद करें।', next: 'safe_close', outcome: 'safe' },
                    { label: 'नकली नंबर दर्ज करें', next: 'troll_scammer', outcome: 'neutral' },
                    { label: 'पुलिस को बुलाओ', next: 'safe_police', outcome: 'safe' }
                ]
            },
            troll_scammer: {
                content: {
                    type: 'info',
                    text: 'आपने 000-00-0000 दर्ज किया। साइट ने इसे स्वीकार कर लिया। एक असली सरकारी साइट इसे मान्य करेगी।'
                },
                options: [
                    { label: 'यह निश्चित रूप से एक घोटाला है। बंद करें।', next: 'safe_close', outcome: 'safe' },
                    { label: 'साइट की रिपोर्ट करें।', next: 'safe_police', outcome: 'safe' },
                    { label: 'नकली डेटा दर्ज करना जारी रखें।', next: 'safe_close', outcome: 'safe' },
                    { label: 'रुको, मुझे अपना असली डालने दो।', next: 'fail_ssn', outcome: 'fail' }
                ]
            },
            safe_police: {
                isEnd: true,
                success: true,
                message: 'आपने अधिकारियों से संपर्क किया।',
                feedback: 'स्थानीय पुलिस (गैर-आपातकालीन) को कॉल करना या FTC को रिपोर्ट करना सही कदम है। उन्होंने पुष्टि की कि कोई वारंट मौजूद नहीं है।'
            },
            fail_ssn: {
                isEnd: true,
                success: false,
                message: 'आपने अपना सामाजिक सुरक्षा नंबर दे दिया।',
                feedback: 'SSA कभी भी आपको गिरफ्तारी की धमकी देने या अपने खाते को "अनलॉक" करने के लिए आपके SSN की मांग करने के लिए कॉल नहीं करेगा। कॉलर आईडी स्पूफ की जा सकती है।'
            },
            safe_official: {
                isEnd: true,
                success: true,
                message: 'आपने असली SSA को कॉल किया।',
                feedback: 'सही। हमेशा फ़ोन काट दें और आधिकारिक नंबर (ssa.gov) स्वयं देखें। असली SSA ने पुष्टि की कि कोई समस्या नहीं थी।'
            },
            safe_hangup: {
                isEnd: true,
                success: true,
                message: 'आपने स्कैमर का फ़ोन काट दिया।',
                feedback: 'अच्छा काम। सरकारी एजेंसियां पत्र भेजती हैं; वे गिरफ्तारी की धमकी देने के लिए कॉल नहीं करते हैं। डर उनका मुख्य हथियार है।'
            },
            safe_close: {
                isEnd: true,
                success: true,
                message: 'आपने नकली साइट बंद कर दी।',
                feedback: 'साइट आपकी पहचान चुराने के लिए डिज़ाइन किया गया एक फ़िशिंग पेज था। इसे बंद करना सुरक्षित विकल्प था।'
            },
            safe_ignore: {
                isEnd: true,
                success: true,
                message: 'आपने कॉल को नजरअंदाज कर दिया।',
                feedback: 'यदि यह महत्वपूर्ण है, तो SSA एक पत्र भेजेगा। अनचाही कॉलों को अनदेखा करना एक सुरक्षित डिफ़ॉल्ट रणनीति है।'
            }
        }
    },
    {
        id: 'job_offer',
        type: 'scam',
        isScam: true,
        title: 'रिमोट डेटा एंट्री जॉब',
        description: 'आपने एक नौकरी के लिए आवेदन किया और तुरंत प्रतिक्रिया मिली।',
        initialStep: 'start',
        steps: {
            start: {
                content: {
                    type: 'email',
                    sender: 'हायरिंग मैनेजर <hr@global-logistics-inc.net>',
                    subject: 'जॉब ऑफर: रिमोट डेटा एंट्री स्पेशलिस्ट - $35/hr',
                    body: 'हम आपके रिज्यूमे से प्रभावित हैं। हम आपको तुरंत किराए पर लेना चाहते हैं। कोई साक्षात्कार की आवश्यकता नहीं है। आपको एक लैपटॉप और प्रिंटर की आवश्यकता होगी। हम आपको हमारे विक्रेता से उन्हें खरीदने के लिए एक चेक भेजेंगे।'
                },
                options: [
                    { label: 'नौकरी तुरंत स्वीकार करें', next: 'accept_job', outcome: 'neutral' },
                    { label: 'पहले वीडियो साक्षात्कार के लिए पूछें', next: 'ask_interview', outcome: 'neutral' },
                    { label: 'कंपनी की वेबसाइट देखें', next: 'check_company', outcome: 'neutral' },
                    { label: 'अस्वीकार करें, यह संदिग्ध लगता है', next: 'safe_decline', outcome: 'safe' }
                ]
            },
            check_company: {
                content: {
                    type: 'web',
                    url: 'www.global-logistics-inc.net',
                    headline: 'ग्लोबल लॉजिस्टिक्स इंक.',
                    body: 'वेबसाइट बहुत सामान्य दिखती है। "हमारे बारे में" पाठ में टाइपो हैं। सूचीबद्ध पता एक आवासीय घर है।'
                },
                options: [
                    { label: 'ठीक लगता है, स्टार्टअप इस तरह के होते हैं।', next: 'accept_job', outcome: 'neutral' },
                    { label: 'यह एक नकली कंपनी है। अस्वीकार करें।', next: 'safe_decline', outcome: 'safe' },
                    { label: 'पते के बारे में उनसे पूछें।', next: 'ask_interview', outcome: 'neutral' },
                    { label: 'रिपोर्ट करें।', next: 'safe_decline', outcome: 'safe' }
                ]
            },
            accept_job: {
                content: {
                    type: 'email',
                    sender: 'हायरिंग मैनेजर',
                    body: 'महान। हम आपको $2,500 का चेक ईमेल कर रहे हैं। इसे मोबाइल ऐप के माध्यम से जमा करें, अपने पहले सप्ताह के लिए $500 रखें, और बाकी को हमारे उपकरण विक्रेता को अपना लैपटॉप भेजने के लिए वायर करें।'
                },
                options: [
                    { label: 'चेक जमा करें और पैसे वायर करें', next: 'fail_check', outcome: 'fail' },
                    { label: 'चेक पूरी तरह से क्लियर होने की प्रतीक्षा करें', next: 'wait_clear', outcome: 'neutral' },
                    { label: 'पूछें कि मैं इसे खुद क्यों नहीं खरीद सकता', next: 'ask_why', outcome: 'neutral' },
                    { label: 'यह एक नकली चेक घोटाला है। रुको।', next: 'safe_decline', outcome: 'safe' }
                ]
            },
            wait_clear: {
                content: {
                    type: 'info',
                    text: 'आप प्रतीक्षा करते हैं। 3 दिन बाद, बैंक धन हटा देता है और आपसे शुल्क लेता है। चेक नकली था। अच्छी बात है कि आपने पैसे नहीं भेजे।'
                },
                options: [
                    { label: 'स्कैमर को ब्लॉक करें।', next: 'safe_decline', outcome: 'safe' },
                    { label: 'बैंक को रिपोर्ट करें।', next: 'safe_decline', outcome: 'safe' },
                    { label: 'उन्हें गुस्से में ईमेल करें।', next: 'safe_decline', outcome: 'safe' },
                    { label: 'इसे दोबारा जमा करने का प्रयास करें।', next: 'fail_check_bad', outcome: 'fail' }
                ]
            },
            ask_why: {
                content: {
                    type: 'email',
                    sender: 'हायरिंग मैनेजर',
                    body: 'हमारा विक्रेता मालिकाना सॉफ्टवेयर के साथ लैपटॉप को कॉन्फ़िगर करता है। आपको हमारे विक्रेता का उपयोग करना होगा। प्रक्रिया पर भरोसा करें।'
                },
                options: [
                    { label: 'ठीक है, मैं यह करूँगा।', next: 'fail_check', outcome: 'fail' },
                    { label: 'नहीं, मैं अपना खुद का खरीदूंगा।', next: 'safe_decline', outcome: 'safe' },
                    { label: 'इसका कोई मतलब नहीं है। छोड़ो।', next: 'safe_decline', outcome: 'safe' },
                    { label: 'विक्रेता का नाम पूछें।', next: 'check_company', outcome: 'neutral' }
                ]
            },
            ask_interview: {
                content: {
                    type: 'email',
                    sender: 'हायरिंग मैनेजर',
                    body: 'हम बहुत व्यस्त हैं और आपके रिज्यूमे पर भरोसा करते हैं। हम केवल टेलीग्राम टेक्स्ट के माध्यम से संवाद करते हैं। कृपया टेलीग्राम डाउनलोड करें और मुझे जोड़ें।'
                },
                options: [
                    { label: 'टेलीग्राम डाउनलोड करें और उन्हें जोड़ें', next: 'telegram_chat', outcome: 'neutral' },
                    { label: 'टेलीग्राम का उपयोग करने से इनकार करें, ज़ूम के लिए पूछें', next: 'refuse_telegram', outcome: 'neutral' },
                    { label: 'यह गैर-पेशेवर है। छोड़ो।', next: 'safe_decline', outcome: 'safe' },
                    { label: 'कंपनी का पता देखें', next: 'check_company', outcome: 'neutral' }
                ]
            },
            telegram_chat: {
                content: {
                    type: 'social',
                    platform: 'टेलीग्राम',
                    sender: 'हायरिंग मैनेजर',
                    message: 'स्वागत है। शुरू करने के लिए, मुझे सीधे जमा करने के लिए आपका पूरा नाम, पता और बैंक खाता विवरण चाहिए।'
                },
                options: [
                    { label: 'विवरण दें।', next: 'fail_identity', outcome: 'fail' },
                    { label: 'पहले अनुबंध के लिए पूछें।', next: 'refuse_telegram', outcome: 'neutral' },
                    { label: 'उपयोगकर्ता को ब्लॉक करें।', next: 'safe_decline', outcome: 'safe' },
                    { label: 'पूछें "क्या यह एक घोटाला है?"', next: 'refuse_telegram', outcome: 'neutral' }
                ]
            },
            refuse_telegram: {
                content: {
                    type: 'email',
                    sender: 'हायरिंग मैनेजर',
                    body: 'यदि आप सरल निर्देशों का पालन नहीं कर सकते हैं, तो आप इस भूमिका के लिए उपयुक्त नहीं हैं। प्रस्ताव रद्द कर दिया गया।'
                },
                options: [
                    { label: 'अच्छा हुआ छुटकारा मिला।', next: 'safe_decline', outcome: 'safe' },
                    { label: 'काम के लिए भीख मांगें।', next: 'telegram_chat', outcome: 'neutral' },
                    { label: 'ईमेल की रिपोर्ट करें।', next: 'safe_decline', outcome: 'safe' },
                    { label: 'उत्तर दें "आप एक स्कैमर हैं"।', next: 'safe_decline', outcome: 'safe' }
                ]
            },
            check_address: {
                content: {
                    type: 'web',
                    url: 'गूगल मैप्स',
                    headline: 'पता खोज',
                    body: 'प्रदान किया गया पता एक खाली लॉट या आवासीय घर से मैप करता है, न कि कॉर्पोरेट कार्यालय से।'
                },
                options: [
                    { label: 'यह संदिग्ध है। अस्वीकार करें।', next: 'safe_decline', outcome: 'safe' },
                    { label: 'शायद वे घर से काम करते हैं?', next: 'accept_job', outcome: 'neutral' },
                    { label: 'इसके बारे में उनसे पूछें।', next: 'ask_interview', outcome: 'neutral' },
                    { label: 'अनदेखा करें।', next: 'safe_decline', outcome: 'safe' }
                ]
            },
            fail_check: {
                isEnd: true,
                success: false,
                message: 'आप एक नकली चेक घोटाले के शिकार हो गए।',
                feedback: 'चेक कुछ दिनों में बाउंस हो जाएगा, लेकिन जो पैसे आपने वायर किए थे वे हमेशा के लिए चले गए। वैध कंपनियां आपको उपकरण खरीदने के लिए कभी चेक नहीं भेजती हैं।'
            },
            fail_check_bad: {
                isEnd: true,
                success: false,
                message: 'आपने दो बार खराब चेक जमा किया।',
                feedback: 'आपका बैंक अब धोखाधड़ी वाली गतिविधि के लिए आपका खाता बंद कर सकता है। कभी भी बाउंस हो चुके चेक को जबरदस्ती न डालें।'
            },
            fail_identity: {
                isEnd: true,
                success: false,
                message: 'आपने संवेदनशील व्यक्तिगत जानकारी दे दी।',
                feedback: 'टेलीग्राम पर किसी अजनबी को बैंक विवरण प्रदान करना खतरनाक है। वे इसका उपयोग पहचान की चोरी के लिए कर सकते हैं।'
            },
            safe_decline: {
                isEnd: true,
                success: true,
                message: 'आप एक नकली नौकरी से बच गए।',
                feedback: 'अच्छी प्रवृत्ति। "कोई साक्षात्कार नहीं", "केवल टेलीग्राम", और "हम आपको एक चेक भेजते हैं" रोजगार घोटाले के क्लासिक संकेत हैं।'
            }
        }
    },
    {
        id: 'tech_support',
        type: 'scam',
        isScam: true,
        title: 'वायरस अलर्ट पॉपअप',
        description: 'आपके कंप्यूटर पर एक तेज़ अलार्म बजना शुरू हो जाता है।',
        initialStep: 'start',
        steps: {
            start: {
                content: {
                    type: 'popup',
                    header: 'विंडोज डिफेंडर अलर्ट: ज्यूस वायरस का पता चला',
                    body: 'आपका कंप्यूटर संक्रमित हो गया है। डेटा चोरी हो रहा है। माइक्रोसॉफ्ट सपोर्ट को तुरंत कॉल करें: 1-888-555-0192. अपने कंप्यूटर को रीस्टार्ट न करें।',
                    audio: 'तेज़ बीपिंग शोर'
                },
                options: [
                    { label: 'तुरंत नंबर पर कॉल करें', next: 'call_scammer', outcome: 'neutral' },
                    { label: '"अभी स्कैन करें" बटन पर क्लिक करें', next: 'scan_fake', outcome: 'neutral' },
                    { label: 'ब्राउज़र बंद करने के लिए टास्क मैनेजर खोलें', next: 'safe_close', outcome: 'safe' },
                    { label: 'इंटरनेट राउटर को अनप्लग करें', next: 'safe_unplug', outcome: 'safe' }
                ]
            },
            scan_fake: {
                content: {
                    type: 'popup',
                    header: 'सिस्टम स्कैनिंग...',
                    body: 'फाइलों को स्कैन कर रहा है... 128 खतरे मिले! गंभीर त्रुटि! आपका आईपी पता समझौता किया गया है। ठीक करने के लिए "सभी निकालें" पर क्लिक करें।',
                    timer: 'स्कैन पूरा हुआ।'
                },
                options: [
                    { label: '"सभी निकालें" पर क्लिक करें', next: 'fail_malware', outcome: 'fail' },
                    { label: 'यह नकली लगता है। ब्राउज़र बंद करें।', next: 'safe_close', outcome: 'safe' },
                    { label: 'सपोर्ट नंबर पर कॉल करें', next: 'call_scammer', outcome: 'neutral' },
                    { label: 'नजरअंदाज करें और रीस्टार्ट करें', next: 'safe_close', outcome: 'safe' }
                ]
            },
            call_scammer: {
                content: {
                    type: 'phone',
                    caller: 'माइक्रोसॉफ्ट सपोर्ट (फर्जी)',
                    audio_text: '"नमस्ते, यह माइक्रोसॉफ्ट है। हम आपके नेटवर्क पर हैकर्स को देखते हैं। मुझे इसे ठीक करने के लिए दूरस्थ रूप से कनेक्ट करने की आवश्यकता है। कृपया एनीडेस्क डाउनलोड करें। (AnyDesk)"'
                },
                options: [
                    { label: 'AnyDesk डाउनलोड करें और एक्सेस दें', next: 'fail_remote', outcome: 'fail' },
                    { label: 'उनकी कर्मचारी आईडी मांगें', next: 'ask_id', outcome: 'neutral' },
                    { label: 'फ़ोन काट दें। माइक्रोसॉफ्ट आपको कॉल नहीं करता है।', next: 'safe_hangup', outcome: 'safe' },
                    { label: 'उन्हें बताएं कि आपके पास मैक है', next: 'troll_mac', outcome: 'neutral' }
                ]
            },
            ask_id: {
                content: {
                    type: 'phone',
                    caller: 'माइक्रोसॉफ्ट सपोर्ट (फर्जी)',
                    audio_text: '"मेरी आईडी MS-9921 है। देखो, आपका कंप्यूटर क्रैश होने वाला है। क्या आप अपनी सभी तस्वीरें खोना चाहते हैं? अभी कनेक्ट करें।"'
                },
                options: [
                    { label: 'मैं तस्वीरें नहीं खोना चाहता। कनेक्ट करें।', next: 'fail_remote', outcome: 'fail' },
                    { label: 'तुम झूठ बोल रहे हो। फ़ोन काट दें।', next: 'safe_hangup', outcome: 'safe' },
                    { label: 'पर्यवेक्षक के लिए पूछें।', next: 'call_scammer', outcome: 'neutral' },
                    { label: 'कहो "मैं माइक्रोसॉफ्ट आधिकारिक नंबर पर कॉल करूंगा"।', next: 'safe_hangup', outcome: 'safe' }
                ]
            },
            troll_mac: {
                content: {
                    type: 'phone',
                    caller: 'माइक्रोसॉफ्ट सपोर्ट (फर्जी)',
                    audio_text: '"(खामोशी)... उह, हम मैक का भी समर्थन करते हैं। ऐप स्टोर पर जाएं और AnyDesk डाउनलोड करें। (AnyDesk)"'
                },
                options: [
                    { label: 'आपने पहले विंडोज डिफेंडर कहा था।', next: 'safe_hangup', outcome: 'safe' },
                    { label: 'ठीक है, डाउनलोड कर रहा हूँ।', next: 'fail_remote', outcome: 'fail' },
                    { label: 'फ़ोन काट दें।', next: 'safe_hangup', outcome: 'safe' },
                    { label: 'उनके साथ और खिलवाड़ करें।', next: 'safe_hangup', outcome: 'safe' }
                ]
            },
            safe_unplug: {
                isEnd: true,
                success: true,
                message: 'आपने इंटरनेट डिस्कनेक्ट कर दिया।',
                feedback: 'अनप्लग करने से कोई भी डेटा ट्रांसफर रुक जाता है। फिर आप अपने कंप्यूटर को सुरक्षित रूप से पुनरारंभ कर सकते हैं। पॉपअप सिर्फ एक ब्राउज़र विंडो थी।'
            },
            fail_remote: {
                isEnd: true,
                success: false,
                message: 'आपने एक स्कैमर को रिमोट एक्सेस दिया।',
                feedback: 'वे अब आपकी फाइलें चुरा लेंगे, कीलॉगर्स इंस्टॉल करेंगे, या रैनसमवेयर के साथ आपके कंप्यूटर को लॉक कर देंगे। कोल्ड कॉलर्स को कभी भी रिमोट एक्सेस न दें।'
            },
            fail_malware: {
                isEnd: true,
                success: false,
                message: 'आपने एक दुर्भावनापूर्ण लिंक पर क्लिक किया।',
                feedback: 'नकली "वायरस निकालें" बटन अक्सर वास्तविक मैलवेयर डाउनलोड करते हैं। असली एंटीवायरस सॉफ़्टवेयर ब्राउज़र पॉपअप नहीं, अपनी विंडो में चलता है।'
            },
            safe_close: {
                isEnd: true,
                success: true,
                message: 'आपने पॉपअप को सुरक्षित रूप से बंद कर दिया।',
                feedback: 'सही। ये पॉपअप फुल स्क्रीन में अटके हुए वेब पेज हैं। ब्राउज़र (Alt+F4 या टास्क मैनेजर) को बंद करने से समस्या हल हो जाती है।'
            },
            safe_hangup: {
                isEnd: true,
                success: true,
                message: 'आपने स्कैमर का फ़ोन काट दिया।',
                feedback: 'अच्छा। माइक्रोसॉफ्ट आपके कंप्यूटर को ठीक करने के लिए कभी भी आपको अनचाही कॉल नहीं करेगा।'
            }
        }
    },
    {
        id: 'social_legit',
        type: 'legit',
        isScam: false,
        title: 'मुसीबत में दोस्त?',
        description: 'आपको अपनी दोस्त सारा से इंस्टाग्राम पर एक डीएम मिलता है।',
        initialStep: 'start',
        steps: {
            start: {
                content: {
                    type: 'social',
                    platform: 'इंस्टाग्राम',
                    sender: 'Sarah_Jenkins99',
                    message: 'अरे! क्या तुम अभी फ्री हो? मुझे एक बड़ा अहसान चाहिए।'
                },
                options: [
                    { label: 'ज़रूर, तुम्हें क्या चाहिए?', next: 'ask_favor', outcome: 'neutral' },
                    { label: 'क्या यह वास्तव में सारा है?', next: 'verify_identity', outcome: 'neutral' },
                    { label: 'इसे अनदेखा करें, शायद हैक हो गया।', next: 'ignore_friend', outcome: 'safe' },
                    { label: 'जांचने के लिए उसके असली नंबर पर टेक्स्ट करें', next: 'text_real', outcome: 'safe' }
                ]
            },
            ignore_friend: {
                isEnd: true,
                success: true,
                message: 'आपने संदेश को नजरअंदाज कर दिया।',
                feedback: 'अगर आपको किसी दोस्त के हैक होने का संदेह है, तो अनदेखा करना सुरक्षित है। पुष्टि करने के लिए उन्हें किसी अन्य प्लेटफॉर्म पर टेक्स्ट करना बेहतर है।'
            },
            ask_favor: {
                content: {
                    type: 'social',
                    platform: 'इंस्टाग्राम',
                    sender: 'Sarah_Jenkins99',
                    message: 'मैं अपने दूसरे खाते से बाहर हो गई हूँ और मुझे मेरे लिए कोड प्राप्त करने के लिए किसी की आवश्यकता है। क्या मैं इसे तुम्हारे फ़ोन पर भेज सकती हूँ?'
                },
                options: [
                    { label: 'मुझे कोड भेजें', next: 'fail_2fa', outcome: 'fail' },
                    { label: 'यह एक घोटाले जैसा लगता है। नहीं।', next: 'deny_request', outcome: 'safe' },
                    { label: 'समझाने के लिए उसे कॉल करें', next: 'call_sarah', outcome: 'safe' },
                    { label: 'पूछें "मेरे कुत्ते का नाम क्या है?"', next: 'security_question', outcome: 'neutral' }
                ]
            },
            deny_request: {
                isEnd: true,
                success: true,
                message: 'आपने कोड भेजने से इनकार कर दिया।',
                feedback: 'होशियार। अपने फ़ोन पर भेजे गए सत्यापन कोड कभी साझा न करें, भले ही कोई "दोस्त" पूछे।'
            },
            call_sarah: {
                isEnd: true,
                success: true,
                message: 'आपने सारा को फोन किया।',
                feedback: 'उसने उत्तर दिया और समझाया कि वह वास्तव में बंद थी, लेकिन आपकी सावधानी को समझ गई। कॉल करना सत्यापन का सबसे अच्छा तरीका है।'
            },
            security_question: {
                content: {
                    type: 'social',
                    platform: 'इंस्टाग्राम',
                    sender: 'Sarah_Jenkins99',
                    message: 'लोल यह बस्टर है! चलो, मुझे वास्तव में मदद की ज़रूरत है।'
                },
                options: [
                    { label: 'ठीक है, वह नाम जानती है। मदद करें।', next: 'safe_help', outcome: 'safe' },
                    { label: 'अभी भी संदिग्ध। उसे कॉल करें।', next: 'call_sarah', outcome: 'safe' },
                    { label: 'कोड भेजें।', next: 'fail_2fa', outcome: 'fail' },
                    { label: 'अनदेखा करें।', next: 'ignore_friend', outcome: 'safe' }
                ]
            },
            verify_identity: {
                content: {
                    type: 'social',
                    platform: 'इंस्टाग्राम',
                    sender: 'Sarah_Jenkins99',
                    message: 'ओह माय गॉड हाँ यह मैं हूँ! मैं बस घबरा रही हूँ क्योंकि मेरी कार खराब हो गई है और मेरा फोन मरने वाला है। मुझे AAA को कॉल करने की ज़रूरत है लेकिन मेरे पास कोई सेवा नहीं है, केवल वाईफाई है।'
                },
                options: [
                    { label: 'ठीक है, मैं कैसे मदद कर सकता हूँ?', next: 'help_car', outcome: 'neutral' },
                    { label: 'मुझे वॉयस नोट भेजें', next: 'voice_note', outcome: 'neutral' },
                    { label: 'तुम बिल्कुल कहाँ हो?', next: 'ask_location', outcome: 'neutral' },
                    { label: 'मैं तुम्हारी मदद करने के लिए तुम्हारी माँ को बुलाऊँगा', next: 'call_mom', outcome: 'safe' }
                ]
            },
            help_car: {
                content: {
                    type: 'social',
                    platform: 'इंस्टाग्राम',
                    sender: 'Sarah_Jenkins99',
                    message: 'क्या तुम प्लीज मुझे टो ट्रक के लिए $50 कैशएप कर सकते हो? मैं तुम्हें कल वापस भुगतान कर दूँगी। (CashApp)'
                },
                options: [
                    { label: '$50 भेजें।', next: 'fail_money', outcome: 'fail' },
                    { label: 'मैं तुम्हारे लिए टो ट्रक बुलाऊँगा।', next: 'safe_help', outcome: 'safe' },
                    { label: 'पहले वॉयस नोट।', next: 'voice_note', outcome: 'neutral' },
                    { label: 'नहीं।', next: 'deny_request', outcome: 'safe' }
                ]
            },
            ask_location: {
                content: {
                    type: 'social',
                    platform: 'इंस्टाग्राम',
                    sender: 'Sarah_Jenkins99',
                    message: 'मैं मेन स्ट्रीट पर शेल स्टेशन पर हूँ।'
                },
                options: [
                    { label: 'मैं वहां ड्राइव करूंगा।', next: 'safe_pickup', outcome: 'safe' },
                    { label: 'टो के लिए पैसे भेजें।', next: 'fail_money', outcome: 'fail' },
                    { label: 'जांच करने के लिए स्टेशन को कॉल करें।', next: 'safe_help', outcome: 'safe' },
                    { label: 'अनदेखा करें।', next: 'ignore_friend', outcome: 'safe' }
                ]
            },
            call_mom: {
                isEnd: true,
                success: true,
                message: 'आपने उसकी माँ को फोन किया।',
                feedback: 'उसकी माँ ने पुष्टि की कि सारा को वास्तव में कार की परेशानी थी। आपने अपनी सुरक्षा को जोखिम में डाले बिना मदद की।'
            },
            voice_note: {
                content: {
                    type: 'social',
                    platform: 'इंस्टाग्राम',
                    sender: 'Sarah_Jenkins99',
                    message: '(वॉयस नोट): "हे, सच में, मैं 5वीं पर गैस स्टेशन पर फंसी हुई हूँ। कृपया मेरे लिए बस एक टो ट्रक बुला दो।"'
                },
                options: [
                    { label: 'वह निश्चित रूप से उसकी आवाज़ है। उसकी मदद करो।', next: 'safe_help', outcome: 'safe' },
                    { label: 'एआई आवाज़ हो सकती है। अभी भी संदिग्ध।', next: 'call_mom', outcome: 'safe' },
                    { label: 'पहले पैसे मांगें', next: 'fail_rude', outcome: 'neutral' },
                    { label: 'जाओ उसे खुद ले लो', next: 'safe_pickup', outcome: 'safe' }
                ]
            },
            fail_rude: {
                isEnd: true,
                success: true,
                message: 'आप कठोर थे, लेकिन सुरक्षित।',
                feedback: 'आपने मुसीबत में एक दोस्त से पैसे मांगे। अच्छा नहीं है, लेकिन आपको घोटाला नहीं हुआ।'
            },
            safe_pickup: {
                isEnd: true,
                success: true,
                message: 'आप व्यक्तिगत रूप से मदद करने गए।',
                feedback: 'व्यक्तिगत रूप से जाना (यदि सुरक्षित है) सत्यापित करने का एक शानदार तरीका है। आपने सारा को पाया और उसकी मदद की।'
            },
            fail_money: {
                isEnd: true,
                success: false,
                message: 'आपने एक संभावित स्कैमर को पैसे भेजे।',
                feedback: 'भले ही यह असली लगे, CashApp/Zelle के माध्यम से पैसे भेजना जोखिम भरा है। एक बार भेजने के बाद, यह चला गया। पहले आवाज या फोन कॉल से सत्यापित करें।'
            },
            fail_2fa: {
                isEnd: true,
                success: false,
                message: 'आपने अपना 2FA कोड दे दिया।',
                feedback: 'यह "इंस्टाग्राम टेकओवर" घोटाला है। कोड वास्तव में आपके खाते के लिए था। अब उन्होंने आपका खाता चुरा लिया है।'
            },
            safe_help: {
                isEnd: true,
                success: true,
                message: 'आपने अपने दोस्त की सुरक्षित रूप से मदद की।',
                feedback: 'यह वास्तव में सारा थी! उसकी आवाज़ और विशिष्ट स्थिति को सत्यापित करके, आपने पुष्टि की कि यह बॉट नहीं था। अच्छे दोस्त!'
            },
            text_real: {
                isEnd: true,
                success: true,
                message: 'आपने दूसरे चैनल के माध्यम से सत्यापित किया।',
                feedback: 'सारा ने आपके टेक्स्ट का जवाब दिया कि वह वास्तव में फंसी हुई थी। मल्टी-फैक्टर ऑथेंटिकेशन (एक अलग चैनल का उपयोग करना) सत्यापित करने का सबसे अच्छा तरीका है।'
            }
        }
    },
    {
        id: 'service_legit',
        type: 'legit',
        isScam: false,
        title: 'बैंक धोखाधड़ी चेतावनी',
        description: 'आपको एक संदिग्ध शुल्क के बारे में एक टेक्स्ट संदेश प्राप्त होता है।',
        initialStep: 'start',
        steps: {
            start: {
                content: {
                    type: 'phone',
                    caller: 'चेस फ्रॉड अलर्ट (72001)',
                    audio_text: 'चेस फ्रॉड अलर्ट: क्या आपने वॉलमार्ट पर $450.00 के शुल्क का प्रयास किया? YES या NO उत्तर दें।'
                },
                options: [
                    { label: 'NO उत्तर दें', next: 'reply_no', outcome: 'neutral' },
                    { label: 'YES उत्तर दें', next: 'reply_yes', outcome: 'neutral' },
                    { label: 'लिंक पर क्लिक करें (यदि कोई था)', next: 'no_link', outcome: 'neutral' },
                    { label: 'इसे अनदेखा करें', next: 'ignore_alert', outcome: 'neutral' }
                ]
            },
            reply_yes: {
                content: {
                    type: 'phone',
                    caller: 'चेस फ्रॉड अलर्ट',
                    audio_text: 'धन्यवाद। लेनदेन को मंजूरी दे दी गई है। यदि आपने यह खरीदारी नहीं की है, तो हमें तुरंत 1-800-935-9935 पर कॉल करें।'
                },
                options: [
                    { label: 'मैंने इसे नहीं बनाया! उन्हें कॉल करें।', next: 'safe_verify', outcome: 'safe' },
                    { label: 'रुको, मैंने गलत पढ़ा। NO उत्तर दें।', next: 'reply_no', outcome: 'neutral' },
                    { label: 'अनदेखा करें।', next: 'ignore_alert', outcome: 'neutral' },
                    { label: 'नंबर ब्लॉक करें।', next: 'block_legit', outcome: 'neutral' }
                ]
            },
            ignore_alert: {
                isEnd: true,
                success: false,
                message: 'आपने एक वास्तविक धोखाधड़ी चेतावनी को नजरअंदाज कर दिया।',
                feedback: 'यदि आप एक वास्तविक चेतावनी को अनदेखा करते हैं, तो धोखाधड़ी वाला शुल्क लग सकता है। हमेशा अपने बैंक ऐप से सत्यापित करें।'
            },
            reply_no: {
                content: {
                    type: 'phone',
                    caller: 'चेस फ्रॉड अलर्ट',
                    audio_text: 'धन्यवाद। हमने लेनदेन को अस्वीकार कर दिया है। आपका कार्ड लॉक कर दिया गया है। हम 3-5 व्यावसायिक दिनों के भीतर एक नया कार्ड भेजेंगे। आगे किसी कार्रवाई की आवश्यकता नहीं है।'
                },
                options: [
                    { label: 'महान, धन्यवाद।', next: 'safe_end', outcome: 'safe' },
                    { label: 'पुष्टि के लिए मेरे कार्ड के पीछे के नंबर पर कॉल करें', next: 'safe_verify', outcome: 'safe' },
                    { label: 'उत्तर दें "क्या मैं इसे अभी अनलॉक कर सकता हूँ?"', next: 'ask_unlock', outcome: 'neutral' },
                    { label: 'घबराहट', next: 'panic', outcome: 'neutral' }
                ]
            },
            ask_unlock: {
                content: {
                    type: 'phone',
                    caller: 'चेस फ्रॉड अलर्ट',
                    audio_text: 'अपना कार्ड अनलॉक करने के लिए, कृपया हमारी सहायता लाइन पर कॉल करें। सुरक्षा के लिए हम टेक्स्ट के माध्यम से अनलॉक नहीं कर सकते।'
                },
                options: [
                    { label: 'सपोर्ट को कॉल करें।', next: 'safe_verify', outcome: 'safe' },
                    { label: 'उत्तर दें "कृपया अनलॉक करें"।', next: 'safe_end', outcome: 'safe' },
                    { label: 'बैंक शाखा पर जाएं।', next: 'safe_verify', outcome: 'safe' },
                    { label: 'अनदेखा करें।', next: 'safe_end', outcome: 'safe' }
                ]
            },
            panic: {
                content: {
                    type: 'info',
                    text: 'आप घबराने लगते हैं। आप अपने बैंक ऐप की जांच करते हैं और देखते हैं कि लेनदेन वास्तव में लंबित/अस्वीकृत है।'
                },
                options: [
                    { label: 'बैंक को कॉल करें।', next: 'safe_verify', outcome: 'safe' },
                    { label: 'टेक्स्ट पर भरोसा करें, कुछ न करें।', next: 'safe_end', outcome: 'safe' },
                    { label: 'STOP उत्तर दें।', next: 'reply_stop', outcome: 'neutral' },
                    { label: 'फेसबुक पर पोस्ट करें।', next: 'safe_end', outcome: 'safe' }
                ]
            },
            reply_stop: {
                isEnd: true,
                success: false,
                message: 'आपने धोखाधड़ी अलर्ट से ऑप्ट आउट किया।',
                feedback: 'असली बैंक नंबर पर STOP का उत्तर देने से भविष्य के अलर्ट अक्षम हो जाते हैं। यह आपको कमजोर छोड़ देता है।'
            },
            no_link: {
                content: {
                    type: 'info',
                    text: 'आप बारीकी से देखते हैं। संदेश में कोई लिंक नहीं है। यह केवल YES/NO उत्तर मांगता है। यह एक वैध चेतावनी का एक अच्छा संकेत है।'
                },
                options: [
                    { label: 'NO उत्तर दें', next: 'reply_no', outcome: 'neutral' },
                    { label: 'अभी भी संदिग्ध। बैंक को सीधे कॉल करें।', next: 'safe_verify', outcome: 'safe' },
                    { label: 'नंबर ब्लॉक करें', next: 'block_legit', outcome: 'neutral' },
                    { label: 'STOP उत्तर दें', next: 'reply_stop', outcome: 'neutral' }
                ]
            },
            safe_verify: {
                isEnd: true,
                success: true,
                message: 'आपने बैंक के साथ सत्यापित किया।',
                feedback: 'एजेंट ने पुष्टि की कि पाठ वास्तविक था और शुल्क अवरुद्ध कर दिया गया था। आधिकारिक नंबर पर कॉल करना हमेशा सबसे सुरक्षित दांव होता है।'
            },
            safe_end: {
                isEnd: true,
                success: true,
                message: 'आपने धोखाधड़ी चेतावनी को सही ढंग से संभाला।',
                feedback: 'असली धोखाधड़ी अलर्ट अक्सर बस हां/नहीं पूछते हैं और आपसे लिंक क्लिक करने या लॉग इन करने की मांग नहीं करते हैं। आप सुरक्षित रहे।'
            },
            block_legit: {
                isEnd: true,
                success: false,
                message: 'आपने वास्तविक धोखाधड़ी अलर्ट को ब्लॉक कर दिया।',
                feedback: 'वह वास्तव में चेस था। उन्हें ब्लॉक करके, आप भविष्य के अलर्ट याद कर सकते हैं। सतर्क रहना अच्छा है, लेकिन आँख बंद करके ब्लॉक करने से पुष्टि करना बेहतर है।'
            }
        }
    }
];

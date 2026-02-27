const fs = require('fs');
const path = require('path');

const locales = ['zh', 'hi', 'ja', 'ko'];

const extraSimTranslations = {
    zh: {
        "redFlags": "发现的危险信号",
        "clickRedFlags": "点击消息中的危险信号",
        "submit": "提交答案",
        "giveUp": "放弃",
        "resetSession": "重置进度"
    },
    hi: {
        "redFlags": "खतरे के संकेत मिले",
        "clickRedFlags": "संदेश में खतरे के संकेतों पर क्लिक करें",
        "submit": "उत्तर सबमिट करें",
        "giveUp": "छोड़ दें",
        "resetSession": "सत्र रीसेट करें"
    },
    ja: {
        "redFlags": "発見された危険信号",
        "clickRedFlags": "メッセージ内の危険信号をクリック",
        "submit": "回答を送信する",
        "giveUp": "諦める",
        "resetSession": "セッションをリセット"
    },
    ko: {
        "redFlags": "발견된 위험 신호",
        "clickRedFlags": "메시지에서 위험 신호를 클릭하세요",
        "submit": "답변 제출",
        "giveUp": "포기하기",
        "resetSession": "세션 초기화"
    }
};

const extraSumTranslations = {
    zh: {
        "youFound": "您找出了",
        "of": "/",
        "redFlags": "个危险信号"
    },
    hi: {
        "youFound": "आपने खोजा",
        "of": "में से",
        "redFlags": "खतरे के संकेत"
    },
    ja: {
        "youFound": "発見:",
        "of": "/",
        "redFlags": "の危険信号"
    },
    ko: {
        "youFound": "찾은 수:",
        "of": "/",
        "redFlags": "개의 위험 신호"
    }
};

locales.forEach(lang => {
    const filePath = path.join(__dirname, 'src', 'locales', lang, 'translation.json');
    if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(raw);

        // Apply simulation extras
        if (extraSimTranslations[lang]) {
            for (const [k, v] of Object.entries(extraSimTranslations[lang])) {
                data.simulation[k] = v;
            }
        }

        // Apply summary extras
        if (extraSumTranslations[lang]) {
            for (const [k, v] of Object.entries(extraSumTranslations[lang])) {
                data.summary[k] = v;
            }
        }

        fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
        console.log(`Extra updates applied for ${lang}`);
    }
});

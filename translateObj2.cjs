const fs = require('fs');
const path = require('path');

const locales = ['ja', 'ko'];

const translationData = {
    ja: {
        "title": "🛡️ 安全リソース",
        "subtitle": "オンラインで身を守るための知識。",
        "scamTypes": {
            "title": "詐欺の種類",
            "phishing": { "title": "フィッシング", "description": "偽のメールやテキスト。" },
            "techSupport": { "title": "サポート詐欺", "description": "ウイルス感染を装うポップアップ。" },
            "prize": { "title": "宝くじ詐欺", "description": "偽の当選通知。" },
            "fakeJob": { "title": "偽の求人", "description": "簡単すぎる仕事。" },
            "romance": { "title": "ロマンス詐欺", "description": "偽の恋愛関係。" },
            "grandparent": { "title": "オレオレ詐欺", "description": "家族を装う電話。" },
            "investment": { "title": "投資詐欺", "description": "高利回りの約束。" },
            "debt": { "title": "借金詐欺", "description": "偽の取り立て。" }
        },
        "redFlags": {
            "title": "🚩 危険信号",
            "urgency": { "text": "緊急性と圧力", "detail": "今すぐ行動して！" },
            "generic": { "text": "一般的な挨拶", "detail": "お客様へ" },
            "sender": { "text": "不審な送信元", "detail": "奇妙なドメイン" },
            "urls": { "text": "不審なURL", "detail": "確認前にクリックしない" },
            "passwords": { "text": "パスワード要求", "detail": "絶対に教えない" },
            "spelling": { "text": "スペルミス", "detail": "文法的な誤り" },
            "attachments": { "text": "不審な添付", "detail": "特に.exe" },
            "emotional": { "text": "感情を煽る", "detail": "恐怖や興奮" }
        },
        "protection": {
            "title": "✅ 守る方法",
            "pause": { "title": "立ち止まる", "text": "深呼吸する。" },
            "hover": { "title": "ホバー", "text": "リンクを確認。" },
            "direct": { "title": "直接アクセス", "text": "URLを入力。" },
            "verify": { "title": "電話で確認", "text": "公式サイトへ。" },
            "block": { "title": "ブロック", "text": "報告する。" },
            "twoFactor": { "title": "二段階認証", "text": "2FAを有効に。" }
        },
        "identityTheft": {
            "title": "🆔 個人情報盗難",
            "what": "概要:",
            "whatText": "個人情報の無断使用。",
            "how": "発生原因:",
            "howItems": ["フィッシング"],
            "warning": "警告サイン:",
            "warningItems": ["身に覚えのない請求"]
        },
        "passwords": {
            "title": "🔐 パスワード",
            "strong": "強力なパスワード:",
            "strongText": "長く複雑に。",
            "manager": "マネージャー:",
            "managerText": "安全に保存。",
            "twoFactor": "二段階認証:",
            "twoFactorText": "追加の保護。",
            "tip": "💡 ヒント:",
            "tipText": "必ず有効に。"
        },
        "malware": {
            "title": "🦠 マルウェア",
            "description": "悪意あるソフトウェア。",
            "staySafe": "安全対策:",
            "items": ["最新に保つ"]
        },
        "misinformation": {
            "title": "🔍 誤情報",
            "description": "フェイクニュース。",
            "items": ["情報源を確認"]
        },
        "faq": {
            "title": "❓ Q&A",
            "subtitle": "質問をクリック。",
            "q1": { "question": "リンクを押した？", "answer": "パスワード変更。" },
            "q2": { "question": "パスワード教えた？", "answer": "すぐ変更。" },
            "q3": { "question": "お金を送った？", "answer": "銀行へ連絡。" },
            "q4": { "question": "内緒にして？", "answer": "詐欺です。" },
            "q5": { "question": "友人がお金を？", "answer": "直接電話。" },
            "q6": { "question": "情報が盗まれた？", "answer": "通報する。" }
        },
        "citizenship": {
            "title": "🌐 デジタル市民",
            "description": "マナー。",
            "think": "考える",
            "respect": "尊重",
            "standUp": "反対する",
            "verify": "確認"
        },
        "officialResources": {
            "title": "📚 公式リソース",
            "description": "リンク:",
            "identityTheft": "IdentityTheft.gov",
            "identityTheftDesc": "盗難報告",
            "reportFraud": "ReportFraud.ftc.gov",
            "reportFraudDesc": "詐欺報告"
        }
    },
    ko: {
        "title": "🛡️ 안전 리소스",
        "subtitle": "온라인 안전을 위한 모든 것.",
        "scamTypes": {
            "title": "사기 유형",
            "phishing": { "title": "피싱", "description": "가짜 이메일." },
            "techSupport": { "title": "기술 지원", "description": "가짜 수리." },
            "prize": { "title": "복권", "description": "가짜 당첨." },
            "fakeJob": { "title": "가짜 구직", "description": "너무 좋은 조건." },
            "romance": { "title": "로맨스 사기", "description": "가짜 연인." },
            "grandparent": { "title": "가족 사칭", "description": "가족 사칭 전화." },
            "investment": { "title": "투자 사기", "description": "가짜 고수익." },
            "debt": { "title": "채무 사기", "description": "가짜 채권자." }
        },
        "redFlags": {
            "title": "🚩 위험 신호",
            "urgency": { "text": "긴박감", "detail": "당장 행동하세요!" },
            "generic": { "text": "일반적 인사", "detail": "고객님께" },
            "sender": { "text": "의심스러운 주소", "detail": "오타" },
            "urls": { "text": "수상한 링크", "detail": "확인 전 클릭 금지" },
            "passwords": { "text": "비밀번호 요구", "detail": "절대 주지 마세요" },
            "spelling": { "text": "맞춤법 오류", "detail": "문법 오류" },
            "attachments": { "text": "수상한 첨부", "detail": ".exe 파일" },
            "emotional": { "text": "감정 자극", "detail": "분노 유발" }
        },
        "protection": {
            "title": "✅ 보호 방법",
            "pause": { "title": "멈추기", "text": "심호흡 하세요." },
            "hover": { "title": "마우스 올리기", "text": "링크 확인." },
            "direct": { "title": "직접 접속", "text": "URL 입력." },
            "verify": { "title": "확인하기", "text": "전화하세요." },
            "block": { "title": "차단", "text": "신고하세요." },
            "twoFactor": { "title": "2단계 인증 (2FA)", "text": "보안 강화." }
        },
        "identityTheft": {
            "title": "🆔 명의 도용",
            "what": "무엇인가요:",
            "whatText": "개인 정보 무단 사용.",
            "how": "어떻게:",
            "howItems": ["피싱"],
            "warning": "경고:",
            "warningItems": ["알 수 없는 청구"]
        },
        "passwords": {
            "title": "🔐 비밀번호",
            "strong": "강력한 비밀번호:",
            "strongText": "길고 복잡하게.",
            "manager": "비밀번호 관리자:",
            "managerText": "안전하게 보관.",
            "twoFactor": "2단계 인증:",
            "twoFactorText": "추가 보안.",
            "tip": "💡 팁:",
            "tipText": "항상 켜세요."
        },
        "malware": {
            "title": "🦠 악성코드",
            "description": "악의적인 소프트웨어.",
            "staySafe": "안전 수칙:",
            "items": ["최신 유지"]
        },
        "misinformation": {
            "title": "🔍 가짜 뉴스",
            "description": "허위 정보.",
            "items": ["출처 확인"]
        },
        "faq": {
            "title": "❓ FAQ",
            "subtitle": "질문 클릭.",
            "q1": { "question": "링크 클릭?", "answer": "비밀번호 변경." },
            "q2": { "question": "비밀번호 유출?", "answer": "즉시 변경." },
            "q3": { "question": "돈을 보냈나요?", "answer": "은행 연락." },
            "q4": { "question": "비밀로 하라고?", "answer": "사기입니다." },
            "q5": { "question": "친구가 돈 요구?", "answer": "전화 확인." },
            "q6": { "question": "명의 도용?", "answer": "신고하세요." }
        },
        "citizenship": {
            "title": "🌐 디지털 시민",
            "description": "온라인 예절.",
            "think": "생각하기",
            "respect": "존중",
            "standUp": "대항하기",
            "verify": "확인"
        },
        "officialResources": {
            "title": "📚 공식 리소스",
            "description": "링크:",
            "identityTheft": "IdentityTheft.gov",
            "identityTheftDesc": "도용 신고",
            "reportFraud": "ReportFraud.ftc.gov",
            "reportFraudDesc": "사기 신고"
        }
    }
};

locales.forEach(lang => {
    const filePath = path.join(__dirname, 'src', 'locales', lang, 'translation.json');
    if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(raw);
        data.resources = translationData[lang];
        fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
        console.log(`Updated ${lang}`);
    }
});

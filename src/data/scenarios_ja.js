export const scenarios = [
    {
        id: 'bank_scam',
        type: 'scam',
        isScam: true,
        title: 'バンク・オブ・アメリカ 高金利オファー',
        description: '高利回りの普通預金口座に関する特別なオファーが届きました。',
        initialStep: 'start',
        steps: {
            start: {
                content: {
                    type: 'email',
                    sender: 'バンク・オブ・アメリカ <promo@bank-of-america-secure-offers.com>',
                    subject: '【限定】年利10% 普通預金口座オファー',
                    body: '大切なお客様へ。あなたは年利10%保証のダイヤモンドティア普通預金口座に選ばれました。このオファーは48時間で期限切れになります。現在の口座をリンクして資金を移動し、この金利を確定させてください。'
                },
                options: [
                    { label: 'リンクをクリックしてオファーを受け取る', next: 'fake_site', outcome: 'neutral' },
                    { label: '差出人のメールアドレスを確認する', next: 'inspect_sender', outcome: 'neutral' },
                    { label: '返信して詳細を尋ねる', next: 'reply_scammer', outcome: 'neutral' },
                    { label: '実際のバンキングアプリにログインして確認する', next: 'safe_check', outcome: 'safe' }
                ]
            },
            inspect_sender: {
                content: {
                    type: 'info',
                    text: '差出人名にカーソルを合わせました。アドレスは "promo@bank-of-america-secure-offers.com" です。本物のバンク・オブ・アメリカのメールは通常 "@bankofamerica.com" または "@emcom.bankofamerica.com" から届きます。'
                },
                options: [
                    { label: '「バンク・オブ・アメリカ」と書いてあるので本物に違いない。リンクをクリック。', next: 'fake_site', outcome: 'neutral' },
                    { label: 'ドメイン "bank-of-america-secure-offers.com" を検索する', next: 'google_domain', outcome: 'neutral' },
                    { label: '迷惑メールとして報告して削除', next: 'safe_end', outcome: 'safe' },
                    { label: '友達に転送して聞いてみる', next: 'friend_advice', outcome: 'neutral' }
                ]
            },
            friend_advice: {
                content: {
                    type: 'info',
                    text: '友達はこう言っています。「それ、めっちゃ怪しいよ。今どき年利10%なんてありえないって。それにそのメールアドレス見てみなよ！」'
                },
                options: [
                    { label: '確かにそうだね。削除するよ。', next: 'safe_end', outcome: 'safe' },
                    { label: 'ちょっとクリックして見てみるよ。', next: 'fake_site', outcome: 'neutral' },
                    { label: '念のため返信してみる。', next: 'reply_scammer', outcome: 'neutral' },
                    { label: '友達を無視する。お金が欲しいんだ。', next: 'fake_site', outcome: 'neutral' }
                ]
            },
            google_domain: {
                content: {
                    type: 'web',
                    url: 'www.google.com',
                    headline: '検索結果',
                    body: '"bank-of-america-secure-offers.com" の公式な結果は見つかりませんでした。いくつかの掲示板で「偽の銀行ドメイン詐欺」について議論されています。'
                },
                options: [
                    { label: '結果を無視する。10%は魅力的すぎる。', next: 'fake_site', outcome: 'neutral' },
                    { label: 'すぐにメールを閉じる。', next: 'safe_end', outcome: 'safe' },
                    { label: 'メールに返信して本物か尋ねる。', next: 'reply_scammer', outcome: 'neutral' },
                    { label: 'どんなサイトか見るためにリンクをクリックしてみる。', next: 'fake_site', outcome: 'neutral' }
                ]
            },
            reply_scammer: {
                content: {
                    type: 'email',
                    sender: 'バンク・オブ・アメリカ サポート <support@bank-of-america-secure-offers.com>',
                    subject: 'Re: 【限定】年利10% 普通預金口座オファー',
                    body: 'はい、これは最優良顧客向けの正当な期間限定オファーです。この枠を長く確保することはできません。すぐに登録を完了してください。さもないと、他の顧客に枠を譲ることになります。'
                },
                options: [
                    { label: 'わかりました、今すぐ登録します。', next: 'fake_site', outcome: 'neutral' },
                    { label: 'どうしてそんなに急かすんですか？', next: 'pressure_response', outcome: 'neutral' },
                    { label: 'メール署名の番号に電話する', next: 'fake_call', outcome: 'neutral' },
                    { label: '返信をやめる。', next: 'safe_end', outcome: 'safe' }
                ]
            },
            pressure_response: {
                content: {
                    type: 'email',
                    sender: 'バンク・オブ・アメリカ サポート',
                    body: '需要が高いのです。もしこのオファーが不要なら、お知らせください。キャンセル待ちの次の人に回します。残り時間は1時間です。'
                },
                options: [
                    { label: '逃したくない。登録する。', next: 'fake_site', outcome: 'neutral' },
                    { label: 'プロらしくない対応だ。ブロックする。', next: 'safe_end', outcome: 'safe' },
                    { label: '彼らに電話する。', next: 'fake_call', outcome: 'neutral' },
                    { label: '本物のアプリを確認する。', next: 'safe_check', outcome: 'safe' }
                ]
            },
            fake_call: {
                content: {
                    type: 'phone',
                    caller: '銀行サポート (偽)',
                    audio_text: '「バンク・オブ・アメリカ、セキュア・オファー部門です。資格を確認するために口座番号を教えてください。」'
                },
                options: [
                    { label: '口座番号を教える', next: 'fail_login', outcome: 'fail' },
                    { label: '電話を切る。', next: 'safe_end', outcome: 'safe' },
                    { label: '名前とIDを尋ねる', next: 'pressure_response', outcome: 'neutral' },
                    { label: '「支店に行きます」と言う。', next: 'safe_check', outcome: 'safe' }
                ]
            },
            fake_site: {
                content: {
                    type: 'web',
                    url: 'www.bank-of-america-secure-offers.com/login',
                    headline: 'バンク・オブ・アメリカ - セキュアログイン',
                    body: 'オンラインIDとパスコードでサインインして、年利10%のオファーを受け取ってください。',
                    input: 'ユーザー名/パスワード入力欄'
                },
                options: [
                    { label: 'ユーザー名とパスワードを入力する', next: 'fail_login', outcome: 'fail' },
                    { label: '「パスワードを忘れた」をクリックしてテストする', next: 'broken_link', outcome: 'neutral' },
                    { label: 'URLバーを注意深く確認する', next: 'inspect_url', outcome: 'neutral' },
                    { label: 'タブを閉じる', next: 'safe_end', outcome: 'safe' }
                ]
            },
            broken_link: {
                content: {
                    type: 'info',
                    text: '「パスワードを忘れた」をクリックしましたが、何も起こりません。または、ページが再読み込みされるだけです。本物のサイトならリンクは機能します。'
                },
                options: [
                    { label: '不具合に違いない。とにかくログインする。', next: 'fail_login', outcome: 'fail' },
                    { label: '偽サイトだ！閉じる。', next: 'safe_end', outcome: 'safe' },
                    { label: '別のリンクを試す。', next: 'inspect_url', outcome: 'neutral' },
                    { label: 'フィッシング詐欺として報告する。', next: 'safe_report', outcome: 'safe' }
                ]
            },
            inspect_url: {
                content: {
                    type: 'info',
                    text: 'URLは "bank-of-america-secure-offers.com" です。鍵のアイコンがありますが、それは通信が暗号化されているという意味だけで、サイトが本物だという意味ではありません。'
                },
                options: [
                    { label: '鍵があるから安全だ。ログインする。', next: 'fail_login', outcome: 'fail' },
                    { label: 'これは本物のサイトではない。閉じる。', next: 'safe_end', outcome: 'safe' },
                    { label: '偽の情報を入力して困らせる', next: 'troll_scammer', outcome: 'neutral' },
                    { label: 'スクリーンショットを撮って報告する', next: 'safe_report', outcome: 'safe' }
                ]
            },
            troll_scammer: {
                content: {
                    type: 'info',
                    text: 'あなたは "User: FakeUser" と "Pass: 12345" を入力しました。サイトはそれを受け入れ、SSN（社会保障番号）を求めてきました。明らかに認証情報を検証していません。'
                },
                options: [
                    { label: 'すぐにタブを閉じる。', next: 'safe_end', outcome: 'safe' },
                    { label: '偽のSSNも入力する。', next: 'safe_report', outcome: 'safe' },
                    { label: '待てよ、本物の情報を入れるべきか？', next: 'fail_login', outcome: 'fail' },
                    { label: '笑って立ち去る。', next: 'safe_end', outcome: 'safe' }
                ]
            },
            safe_report: {
                isEnd: true,
                success: true,
                message: 'あなたは詐欺を報告しました。',
                feedback: 'スクリーンショットを撮り、本物の銀行に報告することで、彼らが偽サイトを閉鎖するのを助けられます。素晴らしい対応です！'
            },
            fail_login: {
                isEnd: true,
                success: false,
                message: 'あなたは銀行の認証情報を渡してしまいました。',
                feedback: 'あなたは偽サイトに本物のユーザー名とパスワードを入力しました。詐欺師は今、あなたの銀行口座への完全なアクセス権を持っています。'
            },
            safe_end: {
                isEnd: true,
                success: true,
                message: 'あなたは安全に詐欺を無視しました。',
                feedback: '偽のドメインと「うますぎる話」を見抜いたおかげで助かりました。本物の銀行がメールで48時間の期限を突きつけて圧力をかけることはありません。'
            },
            safe_check: {
                isEnd: true,
                success: true,
                message: 'あなたは信頼できるチャネルを通じて確認しました。',
                feedback: '素晴らしい！常に公式アプリやウェブサイトに自分でアクセスしてください。そこにはそのようなオファーが存在しないことがわかったはずです。'
            }
        }
    },
    {
        id: 'social_security',
        type: 'scam',
        isScam: true,
        title: '緊急：社会保障番号の停止',
        description: 'あなたの社会保障番号（SSN）がフラグ付けされたという電話がかかってきました。',
        initialStep: 'start',
        steps: {
            start: {
                content: {
                    type: 'phone',
                    caller: '社会保障局 (1-800-772-1213)',
                    audio_text: '「こちらは社会保障局です。あなたの社会保障番号に不審な活動のフラグが付けられました。口座の停止を避けるために今すぐお電話ください。」'
                },
                options: [
                    { label: '発信者の職員IDと折り返し番号を尋ねる', next: 'ask_id', outcome: 'neutral' },
                    { label: '身元確認のためにSSNを提供する', next: 'fail_ssn', outcome: 'fail' },
                    { label: '電話を切り、SSAの公式番号にかける', next: 'safe_official', outcome: 'safe' },
                    { label: '無視して番号をブロックする', next: 'safe_ignore', outcome: 'safe' }
                ]
            },
            ask_id: {
                content: {
                    type: 'phone',
                    caller: 'ロバーツ捜査官 (偽)',
                    audio_text: '「私のバッジ番号はSSA-8921だ。これは連邦の問題だ。今すぐ確認しないなら、逮捕状を発行するぞ。」'
                },
                options: [
                    { label: '怖い。確認します。', next: 'fake_verification', outcome: 'neutral' },
                    { label: 'SSAは逮捕を脅したりしない。切る。', next: 'safe_hangup', outcome: 'safe' },
                    { label: '上司と話させてくれと頼む', next: 'supervisor_fake', outcome: 'neutral' },
                    { label: '通話録音していると伝える', next: 'scammer_hangup', outcome: 'safe' }
                ]
            },
            supervisor_fake: {
                content: {
                    type: 'phone',
                    caller: '上司 (偽)',
                    audio_text: '「上司のスミスだ。ロバーツ捜査官の言う通りだ。我々は逮捕状を持っている。今すぐ我々のセキュアポータルで確認を行わなければならない。」'
                },
                options: [
                    { label: 'わかりました、確認します。', next: 'fake_verification', outcome: 'neutral' },
                    { label: '台本を読んでいるみたいだ。切る。', next: 'safe_hangup', outcome: 'safe' },
                    { label: '逮捕状の番号を聞く。', next: 'fake_verification', outcome: 'neutral' },
                    { label: '拒否する。', next: 'scammer_hangup', outcome: 'safe' }
                ]
            },
            scammer_hangup: {
                isEnd: true,
                success: true,
                message: '詐欺師は電話を切りました。',
                feedback: '詐欺師は録音されたり質問されたりするのを嫌がります。あなたが抵抗した途端、彼らはあなたが簡単なカモではないと悟りました。'
            },
            fake_verification: {
                content: {
                    type: 'web',
                    url: 'www.ssa-verify-secure-portal.com',
                    headline: '社会保障番号確認',
                    body: '逮捕状を取り消すために、完全な社会保障番号を入力してください。',
                    input: 'SSN入力欄'
                },
                options: [
                    { label: 'SSNを入力する', next: 'fail_ssn', outcome: 'fail' },
                    { label: 'このサイトは偽物っぽい。閉じる。', next: 'safe_close', outcome: 'safe' },
                    { label: '偽の番号を入力する', next: 'troll_scammer', outcome: 'neutral' },
                    { label: '警察に通報する', next: 'safe_police', outcome: 'safe' }
                ]
            },
            troll_scammer: {
                content: {
                    type: 'info',
                    text: 'あなたは 000-00-0000 を入力しました。サイトはそれを受け入れました。本物の政府のサイトなら検証するはずです。'
                },
                options: [
                    { label: 'これは間違いなく詐欺だ。閉じる。', next: 'safe_close', outcome: 'safe' },
                    { label: 'サイトを通報する。', next: 'safe_police', outcome: 'safe' },
                    { label: '偽データを入力し続ける。', next: 'safe_close', outcome: 'safe' },
                    { label: '待って、本物を入力させて。', next: 'fail_ssn', outcome: 'fail' }
                ]
            },
            safe_police: {
                isEnd: true,
                success: true,
                message: 'あなたは当局に連絡しました。',
                feedback: '地元の警察（緊急ではない番号）に電話するか、FTCに報告するのは正しい行動です。彼らは逮捕状が存在しないことを確認しました。'
            },
            fail_ssn: {
                isEnd: true,
                success: false,
                message: 'あなたは社会保障番号を渡してしまいました。',
                feedback: 'SSAが逮捕をチラつかせて脅したり、口座を「ロック解除」するためにSSNを要求したりする電話をかけることは絶対にありません。発信者番号通知は偽装可能です。'
            },
            safe_official: {
                isEnd: true,
                success: true,
                message: 'あなたは本物のSSAに電話しました。',
                feedback: '正解です。常に電話を切って、自分で公式番号（ssa.gov）を調べてください。本物のSSAは問題がないことを確認しました。'
            },
            safe_hangup: {
                isEnd: true,
                success: true,
                message: 'あなたは詐欺師の電話を切りました。',
                feedback: 'よくやりました。政府機関は手紙を送ります。逮捕を脅すために電話をかけることはありません。恐怖が彼らの主な武器です。'
            },
            safe_close: {
                isEnd: true,
                success: true,
                message: 'あなたは偽サイトを閉じました。',
                feedback: 'そのサイトはIDを盗むために設計されたフィッシングページでした。閉じるのが安全な選択でした。'
            },
            safe_ignore: {
                isEnd: true,
                success: true,
                message: 'あなたは電話を無視しました。',
                feedback: '重要であれば、SSAは手紙を送ります。一方的な電話を無視することは安全なデフォルト戦略です。'
            }
        }
    },
    {
        id: 'job_offer',
        type: 'scam',
        isScam: true,
        title: 'リモートデータ入力の仕事',
        description: '仕事に応募したところ、すぐに返信が来ました。',
        initialStep: 'start',
        steps: {
            start: {
                content: {
                    type: 'email',
                    sender: '採用担当マネージャー <hr@global-logistics-inc.net>',
                    subject: '【採用通知】リモートデータ入力スペシャリスト - 時給$35',
                    body: 'あなたの履歴書に感銘を受けました。すぐに採用したいと考えています。面接は不要です。ノートパソコンとプリンターが必要です。それらを業者から購入するための小切手をお送りします。'
                },
                options: [
                    { label: 'すぐに仕事を受ける', next: 'accept_job', outcome: 'neutral' },
                    { label: 'まずはビデオ面接を依頼する', next: 'ask_interview', outcome: 'neutral' },
                    { label: '会社のウェブサイトを確認する', next: 'check_company', outcome: 'neutral' },
                    { label: '辞退する、怪しい', next: 'safe_decline', outcome: 'safe' }
                ]
            },
            check_company: {
                content: {
                    type: 'web',
                    url: 'www.global-logistics-inc.net',
                    headline: 'グローバル・ロジスティクス社',
                    body: 'ウェブサイトは非常にありきたりに見えます。「企業概要」の文章に誤字があります。記載されている住所は住宅です。'
                },
                options: [
                    { label: 'まあ大丈夫だろう、スタートアップはこんなものだ。', next: 'accept_job', outcome: 'neutral' },
                    { label: 'これは偽の会社だ。辞退する。', next: 'safe_decline', outcome: 'safe' },
                    { label: '住所について問い合わせる。', next: 'ask_interview', outcome: 'neutral' },
                    { label: '通報する。', next: 'safe_decline', outcome: 'safe' }
                ]
            },
            accept_job: {
                content: {
                    type: 'email',
                    sender: '採用担当マネージャー',
                    body: '素晴らしい。$2,500の小切手をメールでお送りします。モバイルアプリで入金し、最初の週の給料として$500を確保し、残りをノートパソコン発送のために機器業者に送金してください。'
                },
                options: [
                    { label: '小切手を入金して送金する', next: 'fail_check', outcome: 'fail' },
                    { label: '小切手が完全に決済されるのを待つ', next: 'wait_clear', outcome: 'neutral' },
                    { label: 'なぜ自分で買えないのか聞く', next: 'ask_why', outcome: 'neutral' },
                    { label: 'これは偽造小切手詐欺だ。やめる。', next: 'safe_decline', outcome: 'safe' }
                ]
            },
            wait_clear: {
                content: {
                    type: 'info',
                    text: 'あなたは待ちました。3日後、銀行は資金を取り消し、手数料を請求しました。小切手は偽物でした。送金しなくてよかったですね。'
                },
                options: [
                    { label: '詐欺師をブロックする。', next: 'safe_decline', outcome: 'safe' },
                    { label: '銀行に報告する。', next: 'safe_decline', outcome: 'safe' },
                    { label: '怒りのメールを送る。', next: 'safe_decline', outcome: 'safe' },
                    { label: 'もう一度入金してみる。', next: 'fail_check_bad', outcome: 'fail' }
                ]
            },
            ask_why: {
                content: {
                    type: 'email',
                    sender: '採用担当マネージャー',
                    body: '当社の業者は独自のソフトウェアでノートパソコンを設定しています。当社の業者を使用する必要があります。プロセスを信頼してください。'
                },
                options: [
                    { label: 'わかりました、そうします。', next: 'fail_check', outcome: 'fail' },
                    { label: 'いいえ、自分で買います。', next: 'safe_decline', outcome: 'safe' },
                    { label: '意味がわからない。辞める。', next: 'safe_decline', outcome: 'safe' },
                    { label: '業者名を聞く。', next: 'check_company', outcome: 'neutral' }
                ]
            },
            ask_interview: {
                content: {
                    type: 'email',
                    sender: '採用担当マネージャー',
                    body: '私たちは非常に忙しく、あなたの履歴書を信頼しています。コミュニケーションはTelegramのテキストのみで行います。Telegramをダウンロードして私を追加してください。'
                },
                options: [
                    { label: 'Telegramをダウンロードして追加する', next: 'telegram_chat', outcome: 'neutral' },
                    { label: 'Telegramの使用を拒否し、Zoomを求める', next: 'refuse_telegram', outcome: 'neutral' },
                    { label: 'プロらしくない。辞める。', next: 'safe_decline', outcome: 'safe' },
                    { label: '会社の住所を調べる', next: 'check_company', outcome: 'neutral' }
                ]
            },
            telegram_chat: {
                content: {
                    type: 'social',
                    platform: 'Telegram',
                    sender: '採用担当マネージャー',
                    message: 'ようこそ。始めるにあたり、直接振り込みのためにあなたのフルネーム、住所、銀行口座の詳細が必要です。'
                },
                options: [
                    { label: '詳細を教える。', next: 'fail_identity', outcome: 'fail' },
                    { label: 'まずは契約書を求める。', next: 'refuse_telegram', outcome: 'neutral' },
                    { label: 'ユーザーをブロックする。', next: 'safe_decline', outcome: 'safe' },
                    { label: '「これは詐欺ですか？」と聞く', next: 'refuse_telegram', outcome: 'neutral' }
                ]
            },
            refuse_telegram: {
                content: {
                    type: 'email',
                    sender: '採用担当マネージャー',
                    body: '簡単な指示に従えないなら、あなたはこの役割に適していません。オファーは取り消されました。'
                },
                options: [
                    { label: 'せいせいした。', next: 'safe_decline', outcome: 'safe' },
                    { label: '仕事を懇願する。', next: 'telegram_chat', outcome: 'neutral' },
                    { label: 'メールを通報する。', next: 'safe_decline', outcome: 'safe' },
                    { label: '「お前は詐欺師だ」と返信する。', next: 'safe_decline', outcome: 'safe' }
                ]
            },
            check_address: {
                content: {
                    type: 'web',
                    url: 'Googleマップ',
                    headline: '住所検索',
                    body: '提供された住所は空き地か住宅であり、企業のオフィスではありません。'
                },
                options: [
                    { label: '怪しい。辞退する。', next: 'safe_decline', outcome: 'safe' },
                    { label: '在宅勤務かもしれない？', next: 'accept_job', outcome: 'neutral' },
                    { label: 'それについて彼らに聞く。', next: 'ask_interview', outcome: 'neutral' },
                    { label: '無視する。', next: 'safe_decline', outcome: 'safe' }
                ]
            },
            fail_check: {
                isEnd: true,
                success: false,
                message: 'あなたは偽造小切手詐欺に引っかかりました。',
                feedback: '小切手は数日後に不渡りになりますが、あなたが送金したお金は永遠に戻ってきません。合法的な会社が機器購入のために小切手を送ることは決してありません。'
            },
            fail_check_bad: {
                isEnd: true,
                success: false,
                message: 'あなたは不渡り小切手を2回入金しました。',
                feedback: '銀行は詐欺行為としてあなたの口座を閉鎖する可能性があります。不渡りになった小切手を無理に入金しないでください。'
            },
            fail_identity: {
                isEnd: true,
                success: false,
                message: 'あなたは機密の個人情報を渡してしまいました。',
                feedback: 'Telegramで見知らぬ人に銀行の詳細を提供するのは危険です。彼らはこれを個人情報の盗難に利用できます。'
            },
            safe_decline: {
                isEnd: true,
                success: true,
                message: 'あなたは偽の仕事を回避しました。',
                feedback: '良い直感です。「面接なし」、「Telegramのみ」、「小切手を送る」は雇用詐欺の典型的な兆候です。'
            }
        }
    },
    {
        id: 'tech_support',
        type: 'scam',
        isScam: true,
        title: 'ウイルス警告ポップアップ',
        description: 'あなたのコンピュータで大きな警報音が鳴り始めました。',
        initialStep: 'start',
        steps: {
            start: {
                content: {
                    type: 'popup',
                    header: 'WINDOWS DEFENDER 警告: ZEUSウイルスを検出',
                    body: 'あなたのコンピュータは感染しています。データが盗まれています。今すぐMicrosoftサポートに電話してください: 1-888-555-0192。コンピュータを再起動しないでください。',
                    audio: '大きなビープ音'
                },
                options: [
                    { label: 'すぐに番号に電話する', next: 'call_scammer', outcome: 'neutral' },
                    { label: '「今すぐスキャン」ボタンをクリックする', next: 'scan_fake', outcome: 'neutral' },
                    { label: 'タスクマネージャーを開いてブラウザを閉じる', next: 'safe_close', outcome: 'safe' },
                    { label: 'インターネットルーターを抜く', next: 'safe_unplug', outcome: 'safe' }
                ]
            },
            scan_fake: {
                content: {
                    type: 'popup',
                    header: 'システムスキャン中...',
                    body: 'ファイルをスキャン中... 128個の脅威が見つかりました！重大なエラー！IPアドレスが侵害されています。「すべて削除」をクリックして修正してください。',
                    timer: 'スキャン完了。'
                },
                options: [
                    { label: '「すべて削除」をクリック', next: 'fail_malware', outcome: 'fail' },
                    { label: 'これは偽物っぽい。ブラウザを閉じる。', next: 'safe_close', outcome: 'safe' },
                    { label: 'サポート番号に電話する', next: 'call_scammer', outcome: 'neutral' },
                    { label: '無視して再起動する', next: 'safe_close', outcome: 'safe' }
                ]
            },
            call_scammer: {
                content: {
                    type: 'phone',
                    caller: 'Microsoftサポート (偽)',
                    audio_text: '「もしもし、Microsoftです。あなたのネットワーク上にハッカーを確認しました。修正するにはリモートで接続する必要があります。AnyDeskをダウンロードしてください。」'
                },
                options: [
                    { label: 'AnyDeskをダウンロードしてアクセス権を与える', next: 'fail_remote', outcome: 'fail' },
                    { label: '従業員IDを尋ねる', next: 'ask_id', outcome: 'neutral' },
                    { label: '切る。Microsoftから電話が来ることはない。', next: 'safe_hangup', outcome: 'safe' },
                    { label: 'Macを使っていると伝える', next: 'troll_mac', outcome: 'neutral' }
                ]
            },
            ask_id: {
                content: {
                    type: 'phone',
                    caller: 'Microsoftサポート (偽)',
                    audio_text: '「私のIDはMS-9921です。いいですか、あなたのコンピュータはクラッシュ寸前です。すべての写真を失いたいですか？今すぐ接続してください。」'
                },
                options: [
                    { label: '写真を失いたくない。接続する。', next: 'fail_remote', outcome: 'fail' },
                    { label: '嘘つき。切る。', next: 'safe_hangup', outcome: 'safe' },
                    { label: '上司を呼べと言う。', next: 'call_scammer', outcome: 'neutral' },
                    { label: '「Microsoftの公式番号に電話する」と言う。', next: 'safe_hangup', outcome: 'safe' }
                ]
            },
            troll_mac: {
                content: {
                    type: 'phone',
                    caller: 'Microsoftサポート (偽)',
                    audio_text: '「(沈黙)... あー、Macもサポートしています。App Storeに行ってAnyDeskをダウンロードしてください。」'
                },
                options: [
                    { label: 'さっきWindows Defenderって言ったよね。', next: 'safe_hangup', outcome: 'safe' },
                    { label: 'わかった、ダウンロードする。', next: 'fail_remote', outcome: 'fail' },
                    { label: '切る。', next: 'safe_hangup', outcome: 'safe' },
                    { label: 'もう少しからかう。', next: 'safe_hangup', outcome: 'safe' }
                ]
            },
            safe_unplug: {
                isEnd: true,
                success: true,
                message: 'インターネットを切断しました。',
                feedback: 'プラグを抜くとデータ転送が停止します。その後、安全にコンピュータを再起動できます。ポップアップはただのブラウザウィンドウでした。'
            },
            fail_remote: {
                isEnd: true,
                success: false,
                message: '詐欺師にリモートアクセス権を与えてしまいました。',
                feedback: '彼らは今、あなたのファイルを盗んだり、キーロガーをインストールしたり、ランサムウェアでコンピュータをロックしたりします。勧誘電話にリモートアクセス権を与えてはいけません。'
            },
            fail_malware: {
                isEnd: true,
                success: false,
                message: '悪意のあるリンクをクリックしました。',
                feedback: '偽の「ウイルス除去」ボタンは、多くの場合、本物のマルウェアをダウンロードさせます。本物のアンチウイルスソフトはブラウザのポップアップではなく、独自のウィンドウで実行されます。'
            },
            safe_close: {
                isEnd: true,
                success: true,
                message: 'ポップアップを安全に閉じました。',
                feedback: '正解です。これらのポップアップはフルスクリーンモードで固まったウェブページに過ぎません。ブラウザを閉じる（Alt+F4 または タスクマネージャー）と問題は解決します。'
            },
            safe_hangup: {
                isEnd: true,
                success: true,
                message: '詐欺師の電話を切りました。',
                feedback: '良いです。Microsoftがコンピュータを修理するために一方的に電話をかけてくることはありません。'
            }
        }
    },
    {
        id: 'social_legit',
        type: 'legit',
        isScam: false,
        title: '友達の危機？',
        description: 'Instagramで友達のサラからDMが届きました。',
        initialStep: 'start',
        steps: {
            start: {
                content: {
                    type: 'social',
                    platform: 'Instagram',
                    sender: 'Sarah_Jenkins99',
                    message: 'ねえ！今暇？すっごいお願いがあるんだけど。'
                },
                options: [
                    { label: 'いいよ、何が必要？', next: 'ask_favor', outcome: 'neutral' },
                    { label: '本当にサラ？', next: 'verify_identity', outcome: 'neutral' },
                    { label: '無視する。たぶん乗っ取られてる。', next: 'ignore_friend', outcome: 'safe' },
                    { label: '本物の番号にメールして確認する', next: 'text_real', outcome: 'safe' }
                ]
            },
            ignore_friend: {
                isEnd: true,
                success: true,
                message: 'メッセージを無視しました。',
                feedback: '友達が乗っ取られた疑いがある場合、無視するのが安全です。確認のために別のプラットフォームでテキストを送るのが最善です。'
            },
            ask_favor: {
                content: {
                    type: 'social',
                    platform: 'Instagram',
                    sender: 'Sarah_Jenkins99',
                    message: '別のアカウントからロックアウトされちゃって、代わりにコードを受け取ってくれる人が必要なの。あなたの電話に送ってもいい？'
                },
                options: [
                    { label: 'コードを送って', next: 'fail_2fa', outcome: 'fail' },
                    { label: '詐欺っぽい響きだね。だめ。', next: 'deny_request', outcome: 'safe' },
                    { label: '電話して説明してもらう', next: 'call_sarah', outcome: 'safe' },
                    { label: '「私の犬の名前は？」と聞く', next: 'security_question', outcome: 'neutral' }
                ]
            },
            deny_request: {
                isEnd: true,
                success: true,
                message: 'コードの送信を拒否しました。',
                feedback: '賢明です。「友達」から頼まれたとしても、あなたの電話に送られた認証コードは決して共有しないでください。'
            },
            call_sarah: {
                isEnd: true,
                success: true,
                message: 'サラに電話しました。',
                feedback: '彼女は電話に出て、本当にロックアウトされたと説明しましたが、あなたの慎重さを理解してくれました。電話は最良の確認方法です。'
            },
            security_question: {
                content: {
                    type: 'social',
                    platform: 'Instagram',
                    sender: 'Sarah_Jenkins99',
                    message: '（笑）バスターでしょ！お願い、本当に助けが必要なの。'
                },
                options: [
                    { label: 'わかった、名前を知ってるね。助けるよ。', next: 'safe_help', outcome: 'safe' },
                    { label: 'まだ怪しい。電話する。', next: 'call_sarah', outcome: 'safe' },
                    { label: 'コードを送る。', next: 'fail_2fa', outcome: 'fail' },
                    { label: '無視する。', next: 'ignore_friend', outcome: 'safe' }
                ]
            },
            verify_identity: {
                content: {
                    type: 'social',
                    platform: 'Instagram',
                    sender: 'Sarah_Jenkins99',
                    message: 'もう、私だよ！車が故障してスマホの充電もなくなりそうでパニックなの。AAAに電話したいんだけど電波がなくて、Wi-Fiしかないの。'
                },
                options: [
                    { label: 'わかった、どうすればいい？', next: 'help_car', outcome: 'neutral' },
                    { label: 'ボイスメッセージを送って', next: 'voice_note', outcome: 'neutral' },
                    { label: '具体的にどこにいるの？', next: 'ask_location', outcome: 'neutral' },
                    { label: '君のお母さんに電話して助けてもらうよ', next: 'call_mom', outcome: 'safe' }
                ]
            },
            help_car: {
                content: {
                    type: 'social',
                    platform: 'Instagram',
                    sender: 'Sarah_Jenkins99',
                    message: 'レッカー車のためにCashAppで$50送ってくれない？明日返すから。'
                },
                options: [
                    { label: '$50送る。', next: 'fail_money', outcome: 'fail' },
                    { label: '代わりにレッカー車を呼んであげる。', next: 'safe_help', outcome: 'safe' },
                    { label: 'まずはボイスメッセージ。', next: 'voice_note', outcome: 'neutral' },
                    { label: '無理。', next: 'deny_request', outcome: 'safe' }
                ]
            },
            ask_location: {
                content: {
                    type: 'social',
                    platform: 'Instagram',
                    sender: 'Sarah_Jenkins99',
                    message: 'メインストリートのシェル（ガソリンスタンド）にいる。'
                },
                options: [
                    { label: '車でそこに行くよ。', next: 'safe_pickup', outcome: 'safe' },
                    { label: 'レッカー代を送る。', next: 'fail_money', outcome: 'fail' },
                    { label: '確認のためスタンドに電話する。', next: 'safe_help', outcome: 'safe' },
                    { label: '無視する。', next: 'ignore_friend', outcome: 'safe' }
                ]
            },
            call_mom: {
                isEnd: true,
                success: true,
                message: '彼女のお母さんに電話しました。',
                feedback: 'お母さんはサラが本当に車のトラブルに遭っていることを確認しました。あなたは自身の安全を危険にさらすことなく助けました。'
            },
            voice_note: {
                content: {
                    type: 'social',
                    platform: 'Instagram',
                    sender: 'Sarah_Jenkins99',
                    message: '(ボイスメッセージ): "ねえ、マジで5番街のガソリンスタンドで足止め食らってるの。お願いだからレッカー車呼んで。"'
                },
                options: [
                    { label: '間違いなく彼女の声だ。助ける。', next: 'safe_help', outcome: 'safe' },
                    { label: 'AI音声かも。まだ怪しい。', next: 'call_mom', outcome: 'safe' },
                    { label: '先にお金を要求する', next: 'fail_rude', outcome: 'neutral' },
                    { label: '自分で迎えに行く', next: 'safe_pickup', outcome: 'safe' }
                ]
            },
            fail_rude: {
                isEnd: true,
                success: true,
                message: 'あなたは無礼でしたが、安全でした。',
                feedback: '困っている友達にお金を要求しましたね。良くないことですが、詐欺には遭いませんでした。'
            },
            safe_pickup: {
                isEnd: true,
                success: true,
                message: '直接助けに行きました。',
                feedback: '（安全なら）直接行くことは確認するための素晴らしい方法です。あなたはサラを見つけて助けました。'
            },
            fail_money: {
                isEnd: true,
                success: false,
                message: 'あなたは潜在的な詐欺師にお金を送りました。',
                feedback: 'たとえ本物に見えても、CashApp/Zelle経由での送金はリスクが高いです。一度送ると戻ってきません。まずは声や電話で確認してください。'
            },
            fail_2fa: {
                isEnd: true,
                success: false,
                message: 'あなたは2FAコードを渡してしまいました。',
                feedback: 'これは「Instagram乗っ取り」詐欺です。コードは実際にはあなたのアカウントのためのものでした。今、彼らはあなたのアカウントを盗みました。'
            },
            safe_help: {
                isEnd: true,
                success: true,
                message: '友達を安全に助けました。',
                feedback: '本当にサラでした！声と具体的な状況を確認することで、ボットではないことを確認しました。良い友達ですね！'
            },
            text_real: {
                isEnd: true,
                success: true,
                message: '別のチャネルを通じて確認しました。',
                feedback: 'サラはあなたのテキストに返信し、本当に立ち往生していることを確認しました。多要素認証（別のチャネルを使用）は、確認するための最良の方法です。'
            }
        }
    },
    {
        id: 'service_legit',
        type: 'legit',
        isScam: false,
        title: '銀行詐欺アラート',
        description: '不審な請求に関するテキストメッセージが届きました。',
        initialStep: 'start',
        steps: {
            start: {
                content: {
                    type: 'phone',
                    caller: 'Chase詐欺アラート (72001)',
                    audio_text: 'Chase詐欺アラート: ウォルマートで$450.00の請求を試みましたか？YES または NO で返信してください。'
                },
                options: [
                    { label: 'NO と返信する', next: 'reply_no', outcome: 'neutral' },
                    { label: 'YES と返信する', next: 'reply_yes', outcome: 'neutral' },
                    { label: 'リンクをクリックする（もしあれば）', next: 'no_link', outcome: 'neutral' },
                    { label: '無視する', next: 'ignore_alert', outcome: 'neutral' }
                ]
            },
            reply_yes: {
                content: {
                    type: 'phone',
                    caller: 'Chase詐欺アラート',
                    audio_text: 'ありがとうございます。取引は承認されました。この購入を行っていない場合は、すぐに 1-800-935-9935 までお電話ください。'
                },
                options: [
                    { label: '私はやってない！電話する。', next: 'safe_verify', outcome: 'safe' },
                    { label: '待って、読み間違えた。NO と返信。', next: 'reply_no', outcome: 'neutral' },
                    { label: '無視する。', next: 'ignore_alert', outcome: 'neutral' },
                    { label: '番号をブロックする。', next: 'block_legit', outcome: 'neutral' }
                ]
            },
            ignore_alert: {
                isEnd: true,
                success: false,
                message: 'あなたは本物の詐欺アラートを無視しました。',
                feedback: '本物のアラートを無視すると、不正な請求が通る可能性があります。常に銀行アプリで確認してください。'
            },
            reply_no: {
                content: {
                    type: 'phone',
                    caller: 'Chase詐欺アラート',
                    audio_text: 'ありがとうございます。取引を拒否しました。カードはロックされました。3〜5営業日以内に新しいカードをお送りします。これ以上の操作は不要です。'
                },
                options: [
                    { label: 'よかった、ありがとう。', next: 'safe_end', outcome: 'safe' },
                    { label: '確認のためカード裏面の番号に電話する', next: 'safe_verify', outcome: 'safe' },
                    { label: '「今すぐロック解除できますか？」と返信する', next: 'ask_unlock', outcome: 'neutral' },
                    { label: 'パニックになる', next: 'panic', outcome: 'neutral' }
                ]
            },
            ask_unlock: {
                content: {
                    type: 'phone',
                    caller: 'Chase詐欺アラート',
                    audio_text: 'カードのロックを解除するには、サポートラインにお電話ください。セキュリティのため、テキスト経由でのロック解除はできません。'
                },
                options: [
                    { label: 'サポートに電話する。', next: 'safe_verify', outcome: 'safe' },
                    { label: '「ロック解除してください」と返信する。', next: 'safe_end', outcome: 'safe' },
                    { label: '銀行の支店に行く。', next: 'safe_verify', outcome: 'safe' },
                    { label: '無視する。', next: 'safe_end', outcome: 'safe' }
                ]
            },
            panic: {
                content: {
                    type: 'info',
                    text: 'あなたはパニックになり始めました。銀行アプリを確認すると、取引は確かに保留中/拒否済みになっています。'
                },
                options: [
                    { label: '銀行に電話する。', next: 'safe_verify', outcome: 'safe' },
                    { label: 'テキストを信じて、何もしない。', next: 'safe_end', outcome: 'safe' },
                    { label: 'STOP と返信する。', next: 'reply_stop', outcome: 'neutral' },
                    { label: 'Facebookに投稿する。', next: 'safe_end', outcome: 'safe' }
                ]
            },
            reply_stop: {
                isEnd: true,
                success: false,
                message: '詐欺アラートを拒否しました。',
                feedback: '本物の銀行番号に STOP と返信すると、今後のアラートが無効になります。これにより、脆弱な状態になります。'
            },
            no_link: {
                content: {
                    type: 'info',
                    text: 'よく見てください。メッセージにはリンクがありません。YES/NO の返信を求めているだけです。これは正当なアラートの良い兆候です。'
                },
                options: [
                    { label: 'NO と返信する', next: 'reply_no', outcome: 'neutral' },
                    { label: 'まだ怪しい。銀行に直接電話する。', next: 'safe_verify', outcome: 'safe' },
                    { label: '番号をブロックする', next: 'block_legit', outcome: 'neutral' },
                    { label: 'STOP と返信する', next: 'reply_stop', outcome: 'neutral' }
                ]
            },
            safe_verify: {
                isEnd: true,
                success: true,
                message: '銀行に確認しました。',
                feedback: '担当者はテキストが本物であり、請求がブロックされたことを確認しました。公式番号に電話するのが常に最も安全な方法です。'
            },
            safe_end: {
                isEnd: true,
                success: true,
                message: '詐欺アラートを正しく処理しました。',
                feedback: '本物の詐欺アラートは、リンクのクリックやログインを要求せず、単に「はい/いいえ」を尋ねることがよくあります。あなたは安全を保ちました。'
            },
            block_legit: {
                isEnd: true,
                success: false,
                message: '本物の詐欺アラートをブロックしました。',
                feedback: 'それは実際にChaseでした。ブロックすることで、将来のアラートを見逃す可能性があります。慎重になるのは良いことですが、盲目的にブロックするより確認する方が良いです。'
            }
        }
    }
];

export const scenarios = [
    {
        id: 'bank_scam',
        type: 'scam',
        isScam: true,
        title: '美国银行高息优惠',
        description: '您收到了一份高收益储蓄账户的独家优惠。',
        initialStep: 'start',
        steps: {
            start: {
                content: {
                    type: 'email',
                    sender: '美国银行 <promo@bank-of-america-secure-offers.com>',
                    subject: '独家优惠：10% 年收益率储蓄账户',
                    body: '尊敬的客户，您已被选中参加我们的钻石级储蓄账户计划，保证 10% 的年收益率。此优惠将在 48 小时内过期。立即关联您的当前账户以转移资金并锁定此利率。'
                },
                options: [
                    { label: '点击链接领取优惠', next: 'fake_site', outcome: 'neutral' },
                    { label: '检查发件人的电子邮件地址', next: 'inspect_sender', outcome: 'neutral' },
                    { label: '回复并询问更多详情', next: 'reply_scammer', outcome: 'neutral' },
                    { label: '登录您的真实银行 App 进行检查', next: 'safe_check', outcome: 'safe' }
                ]
            },
            inspect_sender: {
                content: {
                    type: 'info',
                    text: '您将鼠标悬停在发件人姓名上。地址是 "promo@bank-of-america-secure-offers.com"。真正的美国银行邮件通常来自 "@bankofamerica.com" 或 "@emcom.bankofamerica.com"。'
                },
                options: [
                    { label: '上面写着“美国银行”，所以肯定是生成的。点击链接。', next: 'fake_site', outcome: 'neutral' },
                    { label: '搜索域名 "bank-of-america-secure-offers.com"', next: 'google_domain', outcome: 'neutral' },
                    { label: '标记为垃圾邮件并删除', next: 'safe_end', outcome: 'safe' },
                    { label: '转发给朋友询问', next: 'friend_advice', outcome: 'neutral' }
                ]
            },
            friend_advice: {
                content: {
                    type: 'info',
                    text: '您的朋友说：“那看起来太假了。现在 10% 的年收益率是不可能的。而且看看那个电子邮件地址！”'
                },
                options: [
                    { label: '你是对的。删除它。', next: 'safe_end', outcome: 'safe' },
                    { label: '我会点击看看。', next: 'fake_site', outcome: 'neutral' },
                    { label: '回复他们以确认。', next: 'reply_scammer', outcome: 'neutral' },
                    { label: '不理朋友，我想要钱。', next: 'fake_site', outcome: 'neutral' }
                ]
            },
            google_domain: {
                content: {
                    type: 'web',
                    url: 'www.google.com',
                    headline: '搜索结果',
                    body: '未找到 "bank-of-america-secure-offers.com" 的官方结果。一些论坛讨论了“假银行域名诈骗”。'
                },
                options: [
                    { label: '忽略结果，10% 太好了不能错过。', next: 'fake_site', outcome: 'neutral' },
                    { label: '立即关闭电子邮件。', next: 'safe_end', outcome: 'safe' },
                    { label: '回复邮件询问他们是否合法。', next: 'reply_scammer', outcome: 'neutral' },
                    { label: '点击链接看看它是什么样子的。', next: 'fake_site', outcome: 'neutral' }
                ]
            },
            reply_scammer: {
                content: {
                    type: 'email',
                    sender: '美国银行支持 <support@bank-of-america-secure-offers.com>',
                    subject: '回复：独家优惠：10% 年收益率储蓄账户',
                    body: '是的，这是针对我们最佳客户的合法限时优惠。我们要把这个名额保留太久。请立即完成注册，否则我们将把名额给其他客户。'
                },
                options: [
                    { label: '好的，我现在注册。', next: 'fake_site', outcome: 'neutral' },
                    { label: '为什么有这么大的压力？', next: 'pressure_response', outcome: 'neutral' },
                    { label: '拨打电子邮件签名中的号码', next: 'fake_call', outcome: 'neutral' },
                    { label: '停止回应。', next: 'safe_end', outcome: 'safe' }
                ]
            },
            pressure_response: {
                content: {
                    type: 'email',
                    sender: '美国银行支持',
                    body: '我们需求量很大。如果您不想要这个优惠，请告诉我们，以便我们给候补名单上的下一个人。您还剩 1 小时。'
                },
                options: [
                    { label: '我不想错过。注册。', next: 'fake_site', outcome: 'neutral' },
                    { label: '这不专业。拉黑。', next: 'safe_end', outcome: 'safe' },
                    { label: '打电话给他们。', next: 'fake_call', outcome: 'neutral' },
                    { label: '检查真实的 App。', next: 'safe_check', outcome: 'safe' }
                ]
            },
            fake_call: {
                content: {
                    type: 'phone',
                    caller: '银行支持 (假)',
                    audio_text: '“美国银行安全优惠部。请提供您的账号以核实资格。”'
                },
                options: [
                    { label: '提供账号', next: 'fail_login', outcome: 'fail' },
                    { label: '挂断。', next: 'safe_end', outcome: 'safe' },
                    { label: '询问他们的姓名和 ID', next: 'pressure_response', outcome: 'neutral' },
                    { label: '说“我会去分行”。', next: 'safe_check', outcome: 'safe' }
                ]
            },
            fake_site: {
                content: {
                    type: 'web',
                    url: 'www.bank-of-america-secure-offers.com/login',
                    headline: '美国银行 - 安全登录',
                    body: '请使用您的在线 ID 和密码登录以领取 10% APY 优惠。',
                    input: '用户名/密码字段可见'
                },
                options: [
                    { label: '输入您的用户名和密码', next: 'fail_login', outcome: 'fail' },
                    { label: '点击“忘记密码”进行测试', next: 'broken_link', outcome: 'neutral' },
                    { label: '仔细检查 URL 栏', next: 'inspect_url', outcome: 'neutral' },
                    { label: '关闭标签页', next: 'safe_end', outcome: 'safe' }
                ]
            },
            broken_link: {
                content: {
                    type: 'info',
                    text: '您点击“忘记密码”但没有任何反应。或者只是重新加载页面。真正的网站有可用的链接。'
                },
                options: [
                    { label: '一定是故障。无论如何登录。', next: 'fail_login', outcome: 'fail' },
                    { label: '假网站！关闭它。', next: 'safe_end', outcome: 'safe' },
                    { label: '尝试另一个链接。', next: 'inspect_url', outcome: 'neutral' },
                    { label: '报告钓鱼网站。', next: 'safe_report', outcome: 'safe' }
                ]
            },
            inspect_url: {
                content: {
                    type: 'info',
                    text: '网址是 "bank-of-america-secure-offers.com"。有一个锁图标，但这只意味着连接是加密的，并不意味着网站是真实的。'
                },
                options: [
                    { label: '它有一把锁，所以是安全的。登录。', next: 'fail_login', outcome: 'fail' },
                    { label: '这不是真正的网站。关闭它。', next: 'safe_end', outcome: 'safe' },
                    { label: '输入假详细信息来捣乱', next: 'troll_scammer', outcome: 'neutral' },
                    { label: '截图并举报', next: 'safe_report', outcome: 'safe' }
                ]
            },
            troll_scammer: {
                content: {
                    type: 'info',
                    text: '您输入 "User: FakeUser" 和 "Pass: 12345"。网站接受了它并要求您的 SSN。很明显它没有验证凭据。'
                },
                options: [
                    { label: '立即关闭标签页。', next: 'safe_end', outcome: 'safe' },
                    { label: '输入假 SSN。', next: 'safe_report', outcome: 'safe' },
                    { label: '等等，也许我应该用真实信息？', next: 'fail_login', outcome: 'fail' },
                    { label: '大笑并离开。', next: 'safe_end', outcome: 'safe' }
                ]
            },
            safe_report: {
                isEnd: true,
                success: true,
                message: '您举报了该骗局。',
                feedback: '截图并向真正的银行举报有助于他们关闭假网站。干得好！'
            },
            fail_login: {
                isEnd: true,
                success: false,
                message: '您泄露了您的银行凭据。',
                feedback: '您在假网站上输入了真实的用户名和密码。骗子现在可以完全访问您的银行账户。'
            },
            safe_end: {
                isEnd: true,
                success: true,
                message: '您安全地忽略了这个骗局。',
                feedback: '认出假域名和“好得令人难以置信”的优惠救了您。真正的银行不会通过电子邮件给你施加 48 小时的最后期限压力。'
            },
            safe_check: {
                isEnd: true,
                success: true,
                message: '您通过可信渠道进行了验证。',
                feedback: '太棒了！一定要亲自去官方 App 或网站。您会发现那里根本没有这样的优惠。'
            }
        }
    },
    {
        id: 'social_security',
        type: 'scam',
        isScam: true,
        title: '紧急：社会安全号码暂停',
        description: '您接到了一个电话，声称您的社会安全号码已被标记。',
        initialStep: 'start',
        steps: {
            start: {
                content: {
                    type: 'phone',
                    caller: '社会安全局 (1-800-772-1213)',
                    audio_text: '“这里是社会安全局。您的社会安全号码因可疑活动而被标记。请立即致电以避免账户被暂停。”'
                },
                options: [
                    { label: '询问来电者的员工 ID 和回拨号码', next: 'ask_id', outcome: 'neutral' },
                    { label: '提供 SSN 以确认身份', next: 'fail_ssn', outcome: 'fail' },
                    { label: '挂断并拨打官方 SSA 号码', next: 'safe_official', outcome: 'safe' },
                    { label: '忽略并拉黑该号码', next: 'safe_ignore', outcome: 'safe' }
                ]
            },
            ask_id: {
                content: {
                    type: 'phone',
                    caller: '罗伯茨警官 (假)',
                    audio_text: '“我的徽章号码是 SSA-8921。这是联邦事务。如果您现在不验证，我们将对您发出逮捕令。”'
                },
                options: [
                    { label: '我很害怕。我会验证。', next: 'fake_verification', outcome: 'neutral' },
                    { label: 'SSA 不会威胁逮捕。挂断。', next: 'safe_hangup', outcome: 'safe' },
                    { label: '要求与其主管交谈', next: 'supervisor_fake', outcome: 'neutral' },
                    { label: '告诉他们您正在录音', next: 'scammer_hangup', outcome: 'safe' }
                ]
            },
            supervisor_fake: {
                content: {
                    type: 'phone',
                    caller: '主管 (假)',
                    audio_text: '“我是主管史密斯。罗伯茨警官是对的。我们有逮捕令。您必需立即在我们的安全门户网站上进行验证。”'
                },
                options: [
                    { label: '好的，我会验证。', next: 'fake_verification', outcome: 'neutral' },
                    { label: '这听起来像是照本宣科。挂断。', next: 'safe_hangup', outcome: 'safe' },
                    { label: '询问逮捕令编号。', next: 'fake_verification', outcome: 'neutral' },
                    { label: '拒绝。', next: 'scammer_hangup', outcome: 'safe' }
                ]
            },
            scammer_hangup: {
                isEnd: true,
                success: true,
                message: '骗子挂断了电话。',
                feedback: '骗子讨厌被录音或质疑。一旦您反击，他们就知道您不是轻易上钩的目标。'
            },
            fake_verification: {
                content: {
                    type: 'web',
                    url: 'www.ssa-verify-secure-portal.com',
                    headline: '社会安全验证',
                    body: '请出入您的完整社会安全号码以撤销逮捕令。',
                    input: 'SSN 字段'
                },
                options: [
                    { label: '输入 SSN', next: 'fail_ssn', outcome: 'fail' },
                    { label: '这个网站看起来是假的。关闭它。', next: 'safe_close', outcome: 'safe' },
                    { label: '输入假号码', next: 'troll_scammer', outcome: 'neutral' },
                    { label: '报警', next: 'safe_police', outcome: 'safe' }
                ]
            },
            troll_scammer: {
                content: {
                    type: 'info',
                    text: '您输入了 000-00-0000。网站接受了它。真正的政府网站会验证这一点。'
                },
                options: [
                    { label: '这绝对是一个骗局。关闭。', next: 'safe_close', outcome: 'safe' },
                    { label: '举报该网站。', next: 'safe_police', outcome: 'safe' },
                    { label: '继续输入假数据。', next: 'safe_close', outcome: 'safe' },
                    { label: '等等，让我填真的。', next: 'fail_ssn', outcome: 'fail' }
                ]
            },
            safe_police: {
                isEnd: true,
                success: true,
                message: '您联系了当局。',
                feedback: '拨打当地警察局电话（非紧急）或向 FTC 举报是正确的举动。他们确认不存在逮捕令。'
            },
            fail_ssn: {
                isEnd: true,
                success: false,
                message: '您泄露了您的社会安全号码。',
                feedback: 'SSA 永远不会打电话威胁逮捕您或要求您提供 SSN 来“解锁”您的账户。来电显示可能是伪造的。'
            },
            safe_official: {
                isEnd: true,
                success: true,
                message: '您拨打了真正的 SSA 电话。',
                feedback: '正确。一定要挂断并自己查找官方号码 (ssa.gov)。真正的 SSA 确认没有任何问题。'
            },
            safe_hangup: {
                isEnd: true,
                success: true,
                message: '您挂断了骗子的电话。',
                feedback: '干得好。政府机构会寄信；他们不会打电话威胁逮捕。恐惧是他们的主要武器。'
            },
            safe_close: {
                isEnd: true,
                success: true,
                message: '您关闭了假网站。',
                feedback: '该网站是一个旨在窃取您身份的钓鱼页面。关闭它是安全的选择。'
            },
            safe_ignore: {
                isEnd: true,
                success: true,
                message: '您忽略了电话。',
                feedback: '如果真的很重要，SSA 会寄信。忽略未经请求的电话是一种安全的默认策略。'
            }
        }
    },
    {
        id: 'job_offer',
        type: 'scam',
        isScam: true,
        title: '远程数据录入工作',
        description: '您申请了一份工作并立即得到了回复。',
        initialStep: 'start',
        steps: {
            start: {
                content: {
                    type: 'email',
                    sender: '招聘经理 <hr@global-logistics-inc.net>',
                    subject: '工作机会：远程数据录入专员 - $35/小时',
                    body: '我们对您的简历印象深刻。我们想立即录用您。无需面试。您将需要一台笔记本电脑和打印机。我们将寄给您一张支票，用于从我们的供应商处购买这些设备。'
                },
                options: [
                    { label: '立即接受工作', next: 'accept_job', outcome: 'neutral' },
                    { label: '要求先进行视频面试', next: 'ask_interview', outcome: 'neutral' },
                    { label: '查看公司网站', next: 'check_company', outcome: 'neutral' },
                    { label: '拒绝，听起来很可疑', next: 'safe_decline', outcome: 'safe' }
                ]
            },
            check_company: {
                content: {
                    type: 'web',
                    url: 'www.global-logistics-inc.net',
                    headline: '全球物流公司',
                    body: '网站看起来很普通。“关于我们”的文本有拼写错误。列出的地址是一个住宅。'
                },
                options: [
                    { label: '看起来还行，初创公司就是这样。', next: 'accept_job', outcome: 'neutral' },
                    { label: '这是一家假公司。拒绝。', next: 'safe_decline', outcome: 'safe' },
                    { label: '询问他们关于地址的问题。', next: 'ask_interview', outcome: 'neutral' },
                    { label: '举报他们。', next: 'safe_decline', outcome: 'safe' }
                ]
            },
            accept_job: {
                content: {
                    type: 'email',
                    sender: '招聘经理',
                    body: '太好了。我们要寄给您一张 2,500 美元的支票。通过移动 App 存入，保留 500 美元作为您第一周的工资，剩下的汇给我们的设备供应商以运送您的笔记本电脑。'
                },
                options: [
                    { label: '存入支票并汇款', next: 'fail_check', outcome: 'fail' },
                    { label: '等待支票完全结清', next: 'wait_clear', outcome: 'neutral' },
                    { label: '问为什么我不能自己买', next: 'ask_why', outcome: 'neutral' },
                    { label: '这是假支票骗局。停止。', next: 'safe_decline', outcome: 'safe' }
                ]
            },
            wait_clear: {
                content: {
                    type: 'info',
                    text: '您等待着。3天后，银行删除了资金并向您收取费用。支票是假的。幸好您没有汇款。'
                },
                options: [
                    { label: '拉黑骗子。', next: 'safe_decline', outcome: 'safe' },
                    { label: '向银行举报。', next: 'safe_decline', outcome: 'safe' },
                    { label: '愤怒地给他们发电子邮件。', next: 'safe_decline', outcome: 'safe' },
                    { label: '尝试再次存入。', next: 'fail_check_bad', outcome: 'fail' }
                ]
            },
            ask_why: {
                content: {
                    type: 'email',
                    sender: '招聘经理',
                    body: '我们的供应商为笔记本电脑配置了专有软件。您必需使用我们的供应商。相信这个过程。'
                },
                options: [
                    { label: '好的，我会照做。', next: 'fail_check', outcome: 'fail' },
                    { label: '不，我会自己买。', next: 'safe_decline', outcome: 'safe' },
                    { label: '这毫无意义。退出。', next: 'safe_decline', outcome: 'safe' },
                    { label: '询问供应商名称。', next: 'check_company', outcome: 'neutral' }
                ]
            },
            ask_interview: {
                content: {
                    type: 'email',
                    sender: '招聘经理',
                    body: '我们要非常忙，并相信您的简历。我们只通过 Telegram 文本交流。请下载 Telegram 并添加我。'
                },
                options: [
                    { label: '下载 Telegram 并添加他们', next: 'telegram_chat', outcome: 'neutral' },
                    { label: '拒绝使用 Telegram，要求 Zoom', next: 'refuse_telegram', outcome: 'neutral' },
                    { label: '这不专业。退出。', next: 'safe_decline', outcome: 'safe' },
                    { label: '查找公司地址', next: 'check_company', outcome: 'neutral' }
                ]
            },
            telegram_chat: {
                content: {
                    type: 'social',
                    platform: 'Telegram',
                    sender: '招聘经理',
                    message: '欢迎。开始之前，我需要您的全名、地址和银行账户详情以便直接存款。'
                },
                options: [
                    { label: '提供详细信息。', next: 'fail_identity', outcome: 'fail' },
                    { label: '首先要求合同。', next: 'refuse_telegram', outcome: 'neutral' },
                    { label: '拉黑用户。', next: 'safe_decline', outcome: 'safe' },
                    { label: '问“这是骗局吗？”', next: 'refuse_telegram', outcome: 'neutral' }
                ]
            },
            refuse_telegram: {
                content: {
                    type: 'email',
                    sender: '招聘经理',
                    body: '如果您不能遵循简单的指示，您就不适合这个职位。录用通知已撤回。'
                },
                options: [
                    { label: '好走不送。', next: 'safe_decline', outcome: 'safe' },
                    { label: '乞求工作。', next: 'telegram_chat', outcome: 'neutral' },
                    { label: '举报电子邮件。', next: 'safe_decline', outcome: 'safe' },
                    { label: '回复“你是个骗子”。', next: 'safe_decline', outcome: 'safe' }
                ]
            },
            check_address: {
                content: {
                    type: 'web',
                    url: '谷歌地图',
                    headline: '地址搜索',
                    body: '提供的地址对应的是一块空地或住宅，而不是企业办公室。'
                },
                options: [
                    { label: '这很可疑。拒绝。', next: 'safe_decline', outcome: 'safe' },
                    { label: '也许他们在家工作？', next: 'accept_job', outcome: 'neutral' },
                    { label: '向他们询问此事。', next: 'ask_interview', outcome: 'neutral' },
                    { label: '忽略。', next: 'safe_decline', outcome: 'safe' }
                ]
            },
            fail_check: {
                isEnd: true,
                success: false,
                message: '您陷入了假支票骗局。',
                feedback: '支票会在几天后被退票，但您汇出的钱永远消失了。合法公司永远不会寄支票给您购买设备。'
            },
            fail_check_bad: {
                isEnd: true,
                success: false,
                message: '您存入了一张空头支票两次。',
                feedback: '您的银行现在可能会因为欺诈活动而关闭您的账户。永远不要强行兑现已被退票的支票。'
            },
            fail_identity: {
                isEnd: true,
                success: false,
                message: '您泄露了敏感的个人信息。',
                feedback: '在 Telegram 上向陌生人提供银行详细信息是危险的。他们可以利用这些信息进行身份盗窃。'
            },
            safe_decline: {
                isEnd: true,
                success: true,
                message: '您避开了一个虚假工作。',
                feedback: '直觉很准。“无需面试”、“仅限 Telegram”和“我们给您寄支票”是典型的就业诈骗迹象。'
            }
        }
    },
    {
        id: 'tech_support',
        type: 'scam',
        isScam: true,
        title: '病毒警报弹窗',
        description: '您的计算机开始播放响亮的警报。',
        initialStep: 'start',
        steps: {
            start: {
                content: {
                    type: 'popup',
                    header: 'WINDOWS DEFENDER 警报：检测到 ZEUS 病毒',
                    body: '您的计算机已被感染。数据正在被窃取。立即致电 Microsoft 支持：1-888-555-0192。请勿重启您的计算机。',
                    audio: '响亮的哔哔声'
                },
                options: [
                    { label: '立即拨打电话', next: 'call_scammer', outcome: 'neutral' },
                    { label: '点击“立即扫描”按钮', next: 'scan_fake', outcome: 'neutral' },
                    { label: '打开任务管理器关闭浏览器', next: 'safe_close', outcome: 'safe' },
                    { label: '拔掉互联网路由器', next: 'safe_unplug', outcome: 'safe' }
                ]
            },
            scan_fake: {
                content: {
                    type: 'popup',
                    header: '系统正在扫描...',
                    body: '正在扫描文件... 发现 128 个威胁！严重错误！您的 IP 地址已遭到入侵。点击“全部移除”进行修复。',
                    timer: '扫描完成。'
                },
                options: [
                    { label: '点击“全部移除”', next: 'fail_malware', outcome: 'fail' },
                    { label: '这看起来是假的。关闭浏览器。', next: 'safe_close', outcome: 'safe' },
                    { label: '拨打支持电话', next: 'call_scammer', outcome: 'neutral' },
                    { label: '忽略并重启', next: 'safe_close', outcome: 'safe' }
                ]
            },
            call_scammer: {
                content: {
                    type: 'phone',
                    caller: 'Microsoft 支持 (假)',
                    audio_text: '“您好，这里是 Microsoft。我们看到黑客在您的网络上。我需要远程连接来修复它。请下载 AnyDesk。”'
                },
                options: [
                    { label: '下载 AnyDesk 并提供访问权限', next: 'fail_remote', outcome: 'fail' },
                    { label: '询问他们的员工 ID', next: 'ask_id', outcome: 'neutral' },
                    { label: '挂断。Microsoft 不会打电话给您。', next: 'safe_hangup', outcome: 'safe' },
                    { label: '告诉他们您用的是 Mac', next: 'troll_mac', outcome: 'neutral' }
                ]
            },
            ask_id: {
                content: {
                    type: 'phone',
                    caller: 'Microsoft 支持 (假)',
                    audio_text: '“我的 ID 是 MS-9921。听着，您的计算机快要崩溃了。您想丢失所有照片吗？现在连接。”'
                },
                options: [
                    { label: '我不想丢失照片。连接。', next: 'fail_remote', outcome: 'fail' },
                    { label: '你在撒谎。挂断。', next: 'safe_hangup', outcome: 'safe' },
                    { label: '要求找主管。', next: 'call_scammer', outcome: 'neutral' },
                    { label: '说“我会拨打 Microsoft 官方号码”。', next: 'safe_hangup', outcome: 'safe' }
                ]
            },
            troll_mac: {
                content: {
                    type: 'phone',
                    caller: 'Microsoft 支持 (假)',
                    audio_text: '“(沉默)... 呃，我们也支持 Mac。去 App Store 下载 AnyDesk。”'
                },
                options: [
                    { label: '你刚才说是 Windows Defender。', next: 'safe_hangup', outcome: 'safe' },
                    { label: '好的，正在下载。', next: 'fail_remote', outcome: 'fail' },
                    { label: '挂断。', next: 'safe_hangup', outcome: 'safe' },
                    { label: '再逗逗他们。', next: 'safe_hangup', outcome: 'safe' }
                ]
            },
            safe_unplug: {
                isEnd: true,
                success: true,
                message: '您断开了互联网连接。',
                feedback: '拔掉插头会停止任何数据传输。然后您可以安全地重启计算机。弹窗只是一个浏览器窗口。'
            },
            fail_remote: {
                isEnd: true,
                success: false,
                message: '您给了骗子远程访问权限。',
                feedback: '他们现在会窃取您的文件，安装键盘记录器，或用勒索软件锁定您的计算机。永远不要给推销电话远程访问权限。'
            },
            fail_malware: {
                isEnd: true,
                success: false,
                message: '您点击了恶意链接。',
                feedback: '假的“清除病毒”按钮通常会下载真正的恶意软件。真正的杀毒软件会在自己的窗口中运行，而不是浏览器弹窗。'
            },
            safe_close: {
                isEnd: true,
                success: true,
                message: '您安全地关闭了弹窗。',
                feedback: '正确。这些弹窗只是卡在全屏模式下的网页。关闭浏览器（Alt+F4 或任务管理器）可以解决问题。'
            },
            safe_hangup: {
                isEnd: true,
                success: true,
                message: '您挂断了骗子的电话。',
                feedback: '很好。Microsoft 永远不会主动打电话给您修复计算机。'
            }
        }
    },
    {
        id: 'social_legit',
        type: 'legit',
        isScam: false,
        title: '朋友有难？',
        description: '您在 Instagram 上收到了朋友莎拉的私信。',
        initialStep: 'start',
        steps: {
            start: {
                content: {
                    type: 'social',
                    platform: 'Instagram',
                    sender: 'Sarah_Jenkins99',
                    message: '嘿！你现在有空吗？我需要帮个大忙。'
                },
                options: [
                    { label: '当然，你需要什么？', next: 'ask_favor', outcome: 'neutral' },
                    { label: '这真的是莎拉吗？', next: 'verify_identity', outcome: 'neutral' },
                    { label: '忽略它，可能被黑了。', next: 'ignore_friend', outcome: 'safe' },
                    { label: '发短信给她的真实号码进行确认', next: 'text_real', outcome: 'safe' }
                ]
            },
            ignore_friend: {
                isEnd: true,
                success: true,
                message: '您忽略了该消息。',
                feedback: '如果您怀疑朋友被黑了，忽略是安全的。最好在另一个平台上发短信给他们确认。'
            },
            ask_favor: {
                content: {
                    type: 'social',
                    platform: 'Instagram',
                    sender: 'Sarah_Jenkins99',
                    message: '我的另一个账户被锁了，需要有人帮我接收验证码。我可以发到你手机上吗？'
                },
                options: [
                    { label: '把代码发给我', next: 'fail_2fa', outcome: 'fail' },
                    { label: '那听起来像是个骗局。不。', next: 'deny_request', outcome: 'safe' },
                    { label: '打电话给她解释', next: 'call_sarah', outcome: 'safe' },
                    { label: '问“我的狗叫什么名字？”', next: 'security_question', outcome: 'neutral' }
                ]
            },
            deny_request: {
                isEnd: true,
                success: true,
                message: '您拒绝发送代码。',
                feedback: '聪明。永远不要分享发送到您手机的验证码，即使是“朋友”要求的。'
            },
            call_sarah: {
                isEnd: true,
                success: true,
                message: '您给莎拉打了电话。',
                feedback: '她接了电话并解释说她确实被锁了，但也理解您的谨慎。打电话是最好的验证方式。'
            },
            security_question: {
                content: {
                    type: 'social',
                    platform: 'Instagram',
                    sender: 'Sarah_Jenkins99',
                    message: '哈哈，是巴斯特！拜托，我真的需要帮助。'
                },
                options: [
                    { label: '好的，她知道名字。帮忙。', next: 'safe_help', outcome: 'safe' },
                    { label: '仍然可疑。打电话给她。', next: 'call_sarah', outcome: 'safe' },
                    { label: '发送代码。', next: 'fail_2fa', outcome: 'fail' },
                    { label: '忽略。', next: 'ignore_friend', outcome: 'safe' }
                ]
            },
            verify_identity: {
                content: {
                    type: 'social',
                    platform: 'Instagram',
                    sender: 'Sarah_Jenkins99',
                    message: '天哪，是我！我只是快疯了，因为我的车坏了，手机也快没电了。我需要打电话给 AAA，但我没有信号，只有 wifi。'
                },
                options: [
                    { label: '好的，我能帮什么忙？', next: 'help_car', outcome: 'neutral' },
                    { label: '给我发语音', next: 'voice_note', outcome: 'neutral' },
                    { label: '你具体在哪里？', next: 'ask_location', outcome: 'neutral' },
                    { label: '我会给你妈妈打电话帮你', next: 'call_mom', outcome: 'safe' }
                ]
            },
            help_car: {
                content: {
                    type: 'social',
                    platform: 'Instagram',
                    sender: 'Sarah_Jenkins99',
                    message: '你能用 CashApp 给我转 50 美元叫拖车吗？我明天还你。'
                },
                options: [
                    { label: '发送 50 美元。', next: 'fail_money', outcome: 'fail' },
                    { label: '我会帮你叫拖车。', next: 'safe_help', outcome: 'safe' },
                    { label: '先发语音。', next: 'voice_note', outcome: 'neutral' },
                    { label: '不。', next: 'deny_request', outcome: 'safe' }
                ]
            },
            ask_location: {
                content: {
                    type: 'social',
                    platform: 'Instagram',
                    sender: 'Sarah_Jenkins99',
                    message: '我在主街的壳牌加油站。'
                },
                options: [
                    { label: '我会开车去那里。', next: 'safe_pickup', outcome: 'safe' },
                    { label: '汇款叫拖车。', next: 'fail_money', outcome: 'fail' },
                    { label: '致电加油站核实。', next: 'safe_help', outcome: 'safe' },
                    { label: '忽略。', next: 'ignore_friend', outcome: 'safe' }
                ]
            },
            call_mom: {
                isEnd: true,
                success: true,
                message: '您给她妈妈打了电话。',
                feedback: '她妈妈确认莎拉确实遇到了汽车故障。您在没有危及自身安全的情况下提供了帮助。'
            },
            voice_note: {
                content: {
                    type: 'social',
                    platform: 'Instagram',
                    sender: 'Sarah_Jenkins99',
                    message: '（语音）："嘿，说真的，我被困在第五街的加油站。请帮我叫辆拖车。"'
                },
                options: [
                    { label: '那绝对是她的声音。帮她。', next: 'safe_help', outcome: 'safe' },
                    { label: '可能是 AI 语音。仍然可疑。', next: 'call_mom', outcome: 'safe' },
                    { label: '先要钱', next: 'fail_rude', outcome: 'neutral' },
                    { label: '自己去接她', next: 'safe_pickup', outcome: 'safe' }
                ]
            },
            fail_rude: {
                isEnd: true,
                success: true,
                message: '您很粗鲁，虽然是安全的。',
                feedback: '您向处于困境的朋友要钱。这不好，但您没有被骗。'
            },
            safe_pickup: {
                isEnd: true,
                success: true,
                message: '您亲自去帮忙了。',
                feedback: '亲自去（如果安全）是验证的好方法。您找到了莎拉并帮助了她。'
            },
            fail_money: {
                isEnd: true,
                success: false,
                message: '您给潜在的骗子汇了钱。',
                feedback: '即使看起来是真的，通过 CashApp/Zelle 汇款也是有风险的。一旦发送，就无法追回。先通过语音或电话验证。'
            },
            fail_2fa: {
                isEnd: true,
                success: false,
                message: '您泄露了您的 2FA 代码。',
                feedback: '这是“Instagram 接管”骗局。该代码实际上是用于您的账户的。现在他们偷走了您的账户。'
            },
            safe_help: {
                isEnd: true,
                success: true,
                message: '您安全地帮助了您的朋友。',
                feedback: '真的是莎拉！通过验证她的声音和具体情况，您确认了那不是机器人。好朋友！'
            },
            text_real: {
                isEnd: true,
                success: true,
                message: '您通过第二个渠道进行了验证。',
                feedback: '莎拉回复了您的短信，确认她确实被困住了。多因素验证（使用不同的渠道）是最好的验证方式。'
            }
        }
    },
    {
        id: 'service_legit',
        type: 'legit',
        isScam: false,
        title: '银行欺诈警报',
        description: '您收到一条关于可疑收费的短信。',
        initialStep: 'start',
        steps: {
            start: {
                content: {
                    type: 'phone',
                    caller: '大通银行欺诈警报 (72001)',
                    audio_text: '大通欺诈警报：您是否在沃尔玛尝试消费 450.00 美元？回复 YES 或 NO。'
                },
                options: [
                    { label: '回复 NO', next: 'reply_no', outcome: 'neutral' },
                    { label: '回复 YES', next: 'reply_yes', outcome: 'neutral' },
                    { label: '点击链接（如果有的话）', next: 'no_link', outcome: 'neutral' },
                    { label: '忽略它', next: 'ignore_alert', outcome: 'neutral' }
                ]
            },
            reply_yes: {
                content: {
                    type: 'phone',
                    caller: '大通欺诈警报',
                    audio_text: '谢谢。交易已获得批准。如果您没有进行此购买，请立即致电 1-800-935-9935 联系我们。'
                },
                options: [
                    { label: '我没买！打电话给他们。', next: 'safe_verify', outcome: 'safe' },
                    { label: '等等，我看错了。回复 NO。', next: 'reply_no', outcome: 'neutral' },
                    { label: '忽略。', next: 'ignore_alert', outcome: 'neutral' },
                    { label: '拉黑号码。', next: 'block_legit', outcome: 'neutral' }
                ]
            },
            ignore_alert: {
                isEnd: true,
                success: false,
                message: '您忽略了真实的欺诈警报。',
                feedback: '如果您忽略真实的警报，欺诈性收费可能会通过。请务必使用您的银行 App 进行验证。'
            },
            reply_no: {
                content: {
                    type: 'phone',
                    caller: '大通欺诈警报',
                    audio_text: '谢谢。我们已拒绝该交易。您的卡已被锁定。我们将在 3-5 个工作日内发送一张新卡。无需采取进一步行动。'
                },
                options: [
                    { label: '太好了，谢谢。', next: 'safe_end', outcome: 'safe' },
                    { label: '拨打我卡背面的号码进行确认', next: 'safe_verify', outcome: 'safe' },
                    { label: '回复“我可以现在解锁吗？”', next: 'ask_unlock', outcome: 'neutral' },
                    { label: '恐慌', next: 'panic', outcome: 'neutral' }
                ]
            },
            ask_unlock: {
                content: {
                    type: 'phone',
                    caller: '大通欺诈警报',
                    audio_text: '要解锁您的卡，请拨打我们的支持热线。为了安全起见，我们无法通过短信解锁。'
                },
                options: [
                    { label: '致电支持。', next: 'safe_verify', outcome: 'safe' },
                    { label: '回复“请解锁”。', next: 'safe_end', outcome: 'safe' },
                    { label: '去银行分行。', next: 'safe_verify', outcome: 'safe' },
                    { label: '忽略。', next: 'safe_end', outcome: 'safe' }
                ]
            },
            panic: {
                content: {
                    type: 'info',
                    text: '您开始恐慌。您查看您的银行 App，看到交易确实是待处理/已拒绝。'
                },
                options: [
                    { label: '致电银行。', next: 'safe_verify', outcome: 'safe' },
                    { label: '相信短信，什么也不做。', next: 'safe_end', outcome: 'safe' },
                    { label: '回复 STOP。', next: 'reply_stop', outcome: 'neutral' },
                    { label: '在 Facebook 上发布。', next: 'safe_end', outcome: 'safe' }
                ]
            },
            reply_stop: {
                isEnd: true,
                success: false,
                message: '您退出了欺诈警报。',
                feedback: '回复 STOP 给真正的银行号码会禁用未来的警报。这会让您处于弱势。'
            },
            no_link: {
                content: {
                    type: 'info',
                    text: '您仔细看了一下。消息中没有链接。它只要求回复 YES/NO。这是一个合法警报的好兆头。'
                },
                options: [
                    { label: '回复 NO', next: 'reply_no', outcome: 'neutral' },
                    { label: '仍然可疑。直接致电银行。', next: 'safe_verify', outcome: 'safe' },
                    { label: '拉黑号码', next: 'block_legit', outcome: 'neutral' },
                    { label: '回复 STOP', next: 'reply_stop', outcome: 'neutral' }
                ]
            },
            safe_verify: {
                isEnd: true,
                success: true,
                message: '您向银行进行了验证。',
                feedback: '代理确认短信是真实的，收费已被阻止。拨打官方号码总是最安全的选择。'
            },
            safe_end: {
                isEnd: true,
                success: true,
                message: '您正确处理了欺诈警报。',
                feedback: '真正的欺诈警报通常只要求是/否，而不要求您点击链接或登录。您保持了安全。'
            },
            block_legit: {
                isEnd: true,
                success: false,
                message: '您屏蔽了真实的欺诈警报。',
                feedback: '那实际上是大通银行。通过屏蔽他们，您可能会错过未来的警报。谨慎是好事，但验证总比盲目屏蔽好。'
            }
        }
    }
];

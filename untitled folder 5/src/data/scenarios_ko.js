export const scenarios = [
    {
        id: 'bank_scam',
        type: 'scam',
        isScam: true,
        title: 'Bank of America 고금리 제안',
        description: '고수익 저축 계좌에 대한 독점 제안을 받았습니다.',
        initialStep: 'start',
        steps: {
            start: {
                content: {
                    type: 'email',
                    sender: 'Bank of America <promo@bank-of-america-secure-offers.com>',
                    subject: '독점: 10% APY 저축 계좌 제안',
                    body: '소중한 고객님께, 귀하는 10% APY가 보장되는 다이아몬드 등급 저축 계좌에 선정되었습니다. 이 제안은 48시간 후에 만료됩니다. 지금 현재 계좌를 연결하여 자금을 이체하고 이 금리를 고정하십시오.'
                },
                options: [
                    { label: '링크를 클릭하여 제안 받기', next: 'fake_site', outcome: 'neutral' },
                    { label: '보낸 사람의 이메일 주소 확인', next: 'inspect_sender', outcome: 'neutral' },
                    { label: '답장하여 자세한 내용 문의', next: 'reply_scammer', outcome: 'neutral' },
                    { label: '확인을 위해 실제 뱅킹 앱에 로그인', next: 'safe_check', outcome: 'safe' }
                ]
            },
            inspect_sender: {
                content: {
                    type: 'info',
                    text: '보낸 사람 이름 위로 마우스를 가져갑니다. 주소는 "promo@bank-of-america-secure-offers.com"입니다. 실제 Bank of America 이메일은 일반적으로 "@bankofamerica.com" 또는 "@emcom.bankofamerica.com"에서 옵니다.'
                },
                options: [
                    { label: '"Bank of America"라고 되어 있으니 진짜일 것입니다. 링크 클릭.', next: 'fake_site', outcome: 'neutral' },
                    { label: '도메인 "bank-of-america-secure-offers.com" 검색', next: 'google_domain', outcome: 'neutral' },
                    { label: '스팸으로 표시하고 삭제', next: 'safe_end', outcome: 'safe' },
                    { label: '친구에게 전달하여 문의', next: 'friend_advice', outcome: 'neutral' }
                ]
            },
            friend_advice: {
                content: {
                    type: 'info',
                    text: '친구가 말합니다: "그거 진짜 가짜 같아. 지금 10% APY는 불가능해. 그리고 저 이메일 주소 좀 봐!"'
                },
                options: [
                    { label: '네 말이 맞아. 삭제할게.', next: 'safe_end', outcome: 'safe' },
                    { label: '그냥 확인만 해볼게.', next: 'fake_site', outcome: 'neutral' },
                    { label: '확실히 하기 위해 답장해 보자.', next: 'reply_scammer', outcome: 'neutral' },
                    { label: '친구 무시, 나는 돈을 원해.', next: 'fake_site', outcome: 'neutral' }
                ]
            },
            google_domain: {
                content: {
                    type: 'web',
                    url: 'www.google.com',
                    headline: '검색 결과',
                    body: '"bank-of-america-secure-offers.com"에 대한 공식 결과가 없습니다. 여러 포럼에서 "가짜 은행 도메인 사기"에 대해 논의하고 있습니다.'
                },
                options: [
                    { label: '결과 무시, 10%는 놓치기 너무 아까워.', next: 'fake_site', outcome: 'neutral' },
                    { label: '즉시 이메일 닫기.', next: 'safe_end', outcome: 'safe' },
                    { label: '이메일에 답장하여 합법적인지 문의.', next: 'reply_scammer', outcome: 'neutral' },
                    { label: '어떤지 보기 위해 링크 클릭.', next: 'fake_site', outcome: 'neutral' }
                ]
            },
            reply_scammer: {
                content: {
                    type: 'email',
                    sender: 'Bank of America 지원팀 <support@bank-of-america-secure-offers.com>',
                    subject: 'Re: 독점: 10% APY 저축 계좌 제안',
                    body: '네, 이것은 최우수 고객을 위한 합법적인 기간 한정 제안입니다. 이 자리를 오래 유지할 수 없습니다. 즉시 등록을 완료하지 않으면 다른 고객에게 기회가 넘어갑니다.'
                },
                options: [
                    { label: '알겠습니다, 지금 가입하겠습니다.', next: 'fake_site', outcome: 'neutral' },
                    { label: '왜 그렇게 압박을 주나요?', next: 'pressure_response', outcome: 'neutral' },
                    { label: '이메일 서명의 번호로 전화 걸기', next: 'fake_call', outcome: 'neutral' },
                    { label: '응답 중지.', next: 'safe_end', outcome: 'safe' }
                ]
            },
            pressure_response: {
                content: {
                    type: 'email',
                    sender: 'Bank of America 지원팀',
                    body: '수요가 많습니다. 제안을 원하지 않으시면 대기자 명단에 있는 다음 사람에게 기회를 줄 수 있도록 알려주십시오. 1시간 남았습니다.'
                },
                options: [
                    { label: '놓치고 싶지 않아. 가입하기.', next: 'fake_site', outcome: 'neutral' },
                    { label: '전문적이지 않아. 차단.', next: 'safe_end', outcome: 'safe' },
                    { label: '그들에게 전화하기.', next: 'fake_call', outcome: 'neutral' },
                    { label: '실제 앱 확인.', next: 'safe_check', outcome: 'safe' }
                ]
            },
            fake_call: {
                content: {
                    type: 'phone',
                    caller: '은행 지원팀 (가짜)',
                    audio_text: '"Bank of America 보안 제안 부서입니다. 자격 확인을 위해 계좌 번호를 알려주십시오."'
                },
                options: [
                    { label: '계좌 번호 제공', next: 'fail_login', outcome: 'fail' },
                    { label: '전화 끊기.', next: 'safe_end', outcome: 'safe' },
                    { label: '이름과 ID 묻기', next: 'pressure_response', outcome: 'neutral' },
                    { label: '"지점에 가보겠습니다"라고 말하기.', next: 'safe_check', outcome: 'safe' }
                ]
            },
            fake_site: {
                content: {
                    type: 'web',
                    url: 'www.bank-of-america-secure-offers.com/login',
                    headline: 'Bank of America - 보안 로그인',
                    body: '10% APY 제안을 받으려면 온라인 ID와 비밀번호로 로그인하십시오.',
                    input: '사용자 이름/비밀번호 필드 표시됨'
                },
                options: [
                    { label: '사용자 이름과 비밀번호 입력', next: 'fail_login', outcome: 'fail' },
                    { label: '"비밀번호 찾기"를 클릭하여 테스트', next: 'broken_link', outcome: 'neutral' },
                    { label: 'URL 표시줄 주의 깊게 확인', next: 'inspect_url', outcome: 'neutral' },
                    { label: '탭 닫기', next: 'safe_end', outcome: 'safe' }
                ]
            },
            broken_link: {
                content: {
                    type: 'info',
                    text: '"비밀번호 찾기"를 클릭했지만 아무 일도 일어나지 않습니다. 또는 페이지가 새로 고침될 뿐입니다. 실제 사이트에는 작동하는 링크가 있습니다.'
                },
                options: [
                    { label: '오류일 거야. 어쨌든 로그인.', next: 'fail_login', outcome: 'fail' },
                    { label: '가짜 사이트야! 닫아.', next: 'safe_end', outcome: 'safe' },
                    { label: '다른 링크 시도.', next: 'inspect_url', outcome: 'neutral' },
                    { label: '피싱 신고.', next: 'safe_report', outcome: 'safe' }
                ]
            },
            inspect_url: {
                content: {
                    type: 'info',
                    text: 'URL은 "bank-of-america-secure-offers.com"입니다. 자물쇠 아이콘이 있지만, 이는 연결이 암호화되었다는 의미일 뿐 사이트가 진짜라는 의미는 아닙니다.'
                },
                options: [
                    { label: '자물쇠가 있으니 안전해. 로그인.', next: 'fail_login', outcome: 'fail' },
                    { label: '진짜 사이트가 아니야. 닫아.', next: 'safe_end', outcome: 'safe' },
                    { label: '가짜 정보를 입력해서 혼란주기', next: 'troll_scammer', outcome: 'neutral' },
                    { label: '스크린샷 찍고 신고하기', next: 'safe_report', outcome: 'safe' }
                ]
            },
            troll_scammer: {
                content: {
                    type: 'info',
                    text: '"User: FakeUser", "Pass: 12345"를 입력했습니다. 사이트가 이를 수락하고 SSN을 요구합니다. 분명히 자격 증명을 검증하지 않습니다.'
                },
                options: [
                    { label: '즉시 탭 닫기.', next: 'safe_end', outcome: 'safe' },
                    { label: '가짜 SSN도 입력.', next: 'safe_report', outcome: 'safe' },
                    { label: '잠깐, 진짜 정보를 사용해야 하나?', next: 'fail_login', outcome: 'fail' },
                    { label: '웃고 떠나기.', next: 'safe_end', outcome: 'safe' }
                ]
            },
            safe_report: {
                isEnd: true,
                success: true,
                message: '사기를 신고했습니다.',
                feedback: '스크린샷을 찍어 실제 은행에 신고하면 가짜 사이트를 폐쇄하는 데 도움이 됩니다. 잘하셨습니다!'
            },
            fail_login: {
                isEnd: true,
                success: false,
                message: '은행 자격 증명을 넘겼습니다.',
                feedback: '가짜 사이트에 실제 사용자 이름과 비밀번호를 입력했습니다. 사기꾼들은 이제 귀하의 은행 계좌에 완전히 접근할 수 있습니다.'
            },
            safe_end: {
                isEnd: true,
                success: true,
                message: '사기를 안전하게 무시했습니다.',
                feedback: '가짜 도메인과 "믿기 힘든" 제안을 인식하여 자신을 구했습니다. 실제 은행은 이메일을 통해 48시간 마감으로 압박하지 않습니다.'
            },
            safe_check: {
                isEnd: true,
                success: true,
                message: '신뢰할 수 있는 채널을 통해 확인했습니다.',
                feedback: '훌륭합니다! 항상 공식 앱이나 웹사이트로 직접 이동하십시오. 거기에는 그런 제안이 없다는 것을 알 수 있었을 것입니다.'
            }
        }
    },
    {
        id: 'social_security',
        type: 'scam',
        isScam: true,
        title: '긴급: 사회보장번호 정지',
        description: '사회보장번호가 신고되었다는 전화를 받습니다.',
        initialStep: 'start',
        steps: {
            start: {
                content: {
                    type: 'phone',
                    caller: '사회보장국 (1-800-772-1213)',
                    audio_text: '"사회보장국입니다. 귀하의 사회보장번호가 의심스러운 활동으로 신고되었습니다. 계좌 정지를 피하려면 즉시 전화하십시오."'
                },
                options: [
                    { label: '전화 건 사람의 직원 ID와 콜백 번호 요청', next: 'ask_id', outcome: 'neutral' },
                    { label: '신원 확인을 위해 SSN 제공', next: 'fail_ssn', outcome: 'fail' },
                    { label: '전화를 끊고 공식 SSA 번호로 전화', next: 'safe_official', outcome: 'safe' },
                    { label: '무시하고 번호 차단', next: 'safe_ignore', outcome: 'safe' }
                ]
            },
            ask_id: {
                content: {
                    type: 'phone',
                    caller: '로버츠 경관 (가짜)',
                    audio_text: '"내 배지 번호는 SSA-8921입니다. 이건 연방 문제입니다. 지금 확인하지 않으면 체포 영장을 발부하겠습니다."'
                },
                options: [
                    { label: '무서워요. 확인하겠습니다.', next: 'fake_verification', outcome: 'neutral' },
                    { label: 'SSA는 체포하겠다고 위협하지 않습니다. 끊기.', next: 'safe_hangup', outcome: 'safe' },
                    { label: '상급자와 통화 요청', next: 'supervisor_fake', outcome: 'neutral' },
                    { label: '통화 내용을 녹음 중이라고 말하기', next: 'scammer_hangup', outcome: 'safe' }
                ]
            },
            supervisor_fake: {
                content: {
                    type: 'phone',
                    caller: '상급자 (가짜)',
                    audio_text: '"상급자 스미스입니다. 로버츠 경관 말이 맞습니다. 영장이 있습니다. 보안 포털에서 즉시 확인해야 합니다."'
                },
                options: [
                    { label: '알겠습니다, 확인하겠습니다.', next: 'fake_verification', outcome: 'neutral' },
                    { label: '대본 읽는 것 같네요. 끊기.', next: 'safe_hangup', outcome: 'safe' },
                    { label: '영장 번호 요청.', next: 'fake_verification', outcome: 'neutral' },
                    { label: '거부.', next: 'scammer_hangup', outcome: 'safe' }
                ]
            },
            scammer_hangup: {
                isEnd: true,
                success: true,
                message: '사기꾼이 전화를 끊었습니다.',
                feedback: '사기꾼들은 녹음되거나 질문받는 것을 싫어합니다. 당신이 반발하자마자 그들은 당신이 쉬운 상대가 아니라는 것을 알았습니다.'
            },
            fake_verification: {
                content: {
                    type: 'web',
                    url: 'www.ssa-verify-secure-portal.com',
                    headline: '사회보장 확인',
                    body: '체포 영장을 취소하려면 전체 사회보장번호를 입력하십시오.',
                    input: 'SSN 필드'
                },
                options: [
                    { label: 'SSN 입력', next: 'fail_ssn', outcome: 'fail' },
                    { label: '이 웹사이트는 가짜 같습니다. 닫기.', next: 'safe_close', outcome: 'safe' },
                    { label: '가짜 번호 입력', next: 'troll_scammer', outcome: 'neutral' },
                    { label: '경찰에 신고', next: 'safe_police', outcome: 'safe' }
                ]
            },
            troll_scammer: {
                content: {
                    type: 'info',
                    text: '000-00-0000을 입력했습니다. 사이트가 이를 수락했습니다. 실제 정부 사이트라면 이를 검증했을 것입니다.'
                },
                options: [
                    { label: '이건 확실히 사기입니다. 닫기.', next: 'safe_close', outcome: 'safe' },
                    { label: '사이트 신고.', next: 'safe_police', outcome: 'safe' },
                    { label: '가짜 데이터 계속 입력.', next: 'safe_close', outcome: 'safe' },
                    { label: '잠깐, 진짜 정보를 넣어야 하나?', next: 'fail_ssn', outcome: 'fail' }
                ]
            },
            safe_police: {
                isEnd: true,
                success: true,
                message: '당국에 연락했습니다.',
                feedback: '현지 경찰(비긴급)에 전화하거나 FTC에 신고하는 것이 올바른 조치입니다. 그들은 영장이 존재하지 않음을 확인했습니다.'
            },
            fail_ssn: {
                isEnd: true,
                success: false,
                message: '사회보장번호를 유출했습니다.',
                feedback: 'SSA는 체포하겠다고 위협하거나 계좌를 "잠금 해제"하기 위해 SSN을 요구하는 전화를 절대 걸지 않습니다. 발신자 ID는 조작될 수 있습니다.'
            },
            safe_official: {
                isEnd: true,
                success: true,
                message: '진짜 SSA에 전화했습니다.',
                feedback: '맞습니다. 항상 전화를 끊고 공식 번호(ssa.gov)를 직접 찾아보십시오. 진짜 SSA는 아무 문제가 없음을 확인했습니다.'
            },
            safe_hangup: {
                isEnd: true,
                success: true,
                message: '사기꾼의 전화를 끊었습니다.',
                feedback: '잘하셨습니다. 정부 기관은 편지를 보냅니다. 체포하겠다고 위협하는 전화는 걸지 않습니다. 공포가 그들의 주 무기입니다.'
            },
            safe_close: {
                isEnd: true,
                success: true,
                message: '가짜 사이트를 닫았습니다.',
                feedback: '해당 사이트는 신원 정보를 훔치기 위해 설계된 피싱 페이지였습니다. 닫는 것이 안전한 선택이었습니다.'
            },
            safe_ignore: {
                isEnd: true,
                success: true,
                message: '전화를 무시했습니다.',
                feedback: '중요한 일이라면 SSA에서 편지를 보낼 것입니다. 원치 않는 전화를 무시하는 것은 안전한 기본 전략입니다.'
            }
        }
    },
    {
        id: 'job_offer',
        type: 'scam',
        isScam: true,
        title: '원격 데이터 입력 업무',
        description: '일자리에 지원했는데 즉시 답장을 받았습니다.',
        initialStep: 'start',
        steps: {
            start: {
                content: {
                    type: 'email',
                    sender: '채용 관리자 <hr@global-logistics-inc.net>',
                    subject: '채용 제안: 원격 데이터 입력 전문가 - 시급 $35',
                    body: '귀하의 이력서에 깊은 인상을 받았습니다. 즉시 채용하고 싶습니다. 면접은 필요 없습니다. 노트북과 프린터가 필요합니다. 장비 업체에서 구입하실 수 있도록 수표를 보내드리겠습니다.'
                },
                options: [
                    { label: '즉시 수락', next: 'accept_job', outcome: 'neutral' },
                    { label: '먼저 화상 면접 요청', next: 'ask_interview', outcome: 'neutral' },
                    { label: '회사 웹사이트 확인', next: 'check_company', outcome: 'neutral' },
                    { label: '거절, 수상해 보임', next: 'safe_decline', outcome: 'safe' }
                ]
            },
            check_company: {
                content: {
                    type: 'web',
                    url: 'www.global-logistics-inc.net',
                    headline: 'Global Logistics Inc.',
                    body: '웹사이트가 매우 평범해 보입니다. "회사 소개" 텍스트에 오타가 있습니다. 나열된 주소는 가정집입니다.'
                },
                options: [
                    { label: '괜찮아 보여, 스타트업은 다 이래.', next: 'accept_job', outcome: 'neutral' },
                    { label: '이건 가짜 회사야. 거절.', next: 'safe_decline', outcome: 'safe' },
                    { label: '주소에 대해 물어보기.', next: 'ask_interview', outcome: 'neutral' },
                    { label: '신고하기.', next: 'safe_decline', outcome: 'safe' }
                ]
            },
            accept_job: {
                content: {
                    type: 'email',
                    sender: '채용 관리자',
                    body: '좋습니다. $2,500 수표를 이메일로 보내드립니다. 모바일 앱을 통해 입금하고, 첫 주 급여로 $500를 보관한 후, 나머지를 장비 업체에 송금하여 노트북을 배송받으십시오.'
                },
                options: [
                    { label: '수표 입금 및 송금', next: 'fail_check', outcome: 'fail' },
                    { label: '수표가 완전히 결제될 때까지 대기', next: 'wait_clear', outcome: 'neutral' },
                    { label: '왜 직접 살 수 없는지 묻기', next: 'ask_why', outcome: 'neutral' },
                    { label: '이건 가짜 수표 사기야. 중지.', next: 'safe_decline', outcome: 'safe' }
                ]
            },
            wait_clear: {
                content: {
                    type: 'info',
                    text: '기다립니다. 3일 후 은행에서 자금을 회수하고 수수료를 부과합니다. 수표는 가짜였습니다. 돈을 보내지 않아서 다행입니다.'
                },
                options: [
                    { label: '사기꾼 차단.', next: 'safe_decline', outcome: 'safe' },
                    { label: '은행에 신고.', next: 'safe_decline', outcome: 'safe' },
                    { label: '화가 나서 이메일 보내기.', next: 'safe_decline', outcome: 'safe' },
                    { label: '다시 입금 시도.', next: 'fail_check_bad', outcome: 'fail' }
                ]
            },
            ask_why: {
                content: {
                    type: 'email',
                    sender: '채용 관리자',
                    body: '저희 업체는 노트북에 독점 소프트웨어를 구성합니다. 저희 업체를 이용하셔야 합니다. 절차를 신뢰하십시오.'
                },
                options: [
                    { label: '알겠습니다, 그렇게 하겠습니다.', next: 'fail_check', outcome: 'fail' },
                    { label: '아니요, 제가 직접 사겠습니다.', next: 'safe_decline', outcome: 'safe' },
                    { label: '말이 안 돼. 그만두기.', next: 'safe_decline', outcome: 'safe' },
                    { label: '업체 이름 묻기.', next: 'check_company', outcome: 'neutral' }
                ]
            },
            ask_interview: {
                content: {
                    type: 'email',
                    sender: '채용 관리자',
                    body: '저희는 매우 바빠서 귀하의 이력서를 신뢰합니다. 텔레그램 문자로만 소통합니다. 텔레그램을 다운로드하고 저를 추가해 주세요.'
                },
                options: [
                    { label: '텔레그램 다운로드 및 추가', next: 'telegram_chat', outcome: 'neutral' },
                    { label: '텔레그램 사용 거부, Zoom 요청', next: 'refuse_telegram', outcome: 'neutral' },
                    { label: '전문적이지 않아. 그만두기.', next: 'safe_decline', outcome: 'safe' },
                    { label: '회사 주소 검색', next: 'check_company', outcome: 'neutral' }
                ]
            },
            telegram_chat: {
                content: {
                    type: 'social',
                    platform: 'Telegram',
                    sender: '채용 관리자',
                    message: '환영합니다. 시작하려면 직접 입금을 위한 성명, 주소, 은행 계좌 정보가 필요합니다.'
                },
                options: [
                    { label: '세부 정보 제공.', next: 'fail_identity', outcome: 'fail' },
                    { label: '먼저 계약서 요청.', next: 'refuse_telegram', outcome: 'neutral' },
                    { label: '사용자 차단.', next: 'safe_decline', outcome: 'safe' },
                    { label: '"이거 사기인가요?"라고 묻기', next: 'refuse_telegram', outcome: 'neutral' }
                ]
            },
            refuse_telegram: {
                content: {
                    type: 'email',
                    sender: '채용 관리자',
                    body: '간단한 지시를 따를 수 없다면 이 역할에 적합하지 않습니다. 제안이 철회되었습니다.'
                },
                options: [
                    { label: '속이 다 후련하네.', next: 'safe_decline', outcome: 'safe' },
                    { label: '일자리를 구걸하기.', next: 'telegram_chat', outcome: 'neutral' },
                    { label: '이메일 신고.', next: 'safe_decline', outcome: 'safe' },
                    { label: '"당신은 사기꾼이야"라고 답장.', next: 'safe_decline', outcome: 'safe' }
                ]
            },
            check_address: {
                content: {
                    type: 'web',
                    url: 'Google 지도',
                    headline: '주소 검색',
                    body: '제공된 주소는 기업 사무실이 아니라 빈 공터나 가정집으로 나옵니다.'
                },
                options: [
                    { label: '수상해. 거절.', next: 'safe_decline', outcome: 'safe' },
                    { label: '재택근무일 수도 있지 않을까?', next: 'accept_job', outcome: 'neutral' },
                    { label: '그것에 대해 물어보기.', next: 'ask_interview', outcome: 'neutral' },
                    { label: '무시.', next: 'safe_decline', outcome: 'safe' }
                ]
            },
            fail_check: {
                isEnd: true,
                success: false,
                message: '가짜 수표 사기에 넘어갔습니다.',
                feedback: '수표는 며칠 후에 부도 처리되지만, 송금한 돈은 영원히 사라집니다. 합법적인 회사는 장비를 구입하라고 수표를 보내지 않습니다.'
            },
            fail_check_bad: {
                isEnd: true,
                success: false,
                message: '부도 수표를 두 번 입금했습니다.',
                feedback: '은행에서 사기 활동으로 귀하의 계좌를 폐쇄할 수 있습니다. 이미 부도난 수표를 억지로 입금하지 마십시오.'
            },
            fail_identity: {
                isEnd: true,
                success: false,
                message: '민감한 개인 정보를 유출했습니다.',
                feedback: '텔레그램으로 낯선 사람에게 은행 정보를 제공하는 것은 위험합니다. 그들은 이 정보를 신원 도용에 사용할 수 있습니다.'
            },
            safe_decline: {
                isEnd: true,
                success: true,
                message: '가짜 일자리를 피했습니다.',
                feedback: '좋은 직감입니다. "면접 없음", "텔레그램 전용", "수표 발송"은 전형적인 취업 사기 징후입니다.'
            }
        }
    },
    {
        id: 'tech_support',
        type: 'scam',
        isScam: true,
        title: '바이러스 경고 팝업',
        description: '컴퓨터에서 큰 경보음이 울리기 시작합니다.',
        initialStep: 'start',
        steps: {
            start: {
                content: {
                    type: 'popup',
                    header: 'WINDOWS DEFENDER 경고: ZEUS 바이러스 감지됨',
                    body: '컴퓨터가 감염되었습니다. 데이터가 도난당하고 있습니다. Microsoft 지원팀에 즉시 전화하십시오: 1-888-555-0192. 컴퓨터를 재부팅하지 마십시오.',
                    audio: '큰 비프음'
                },
                options: [
                    { label: '즉시 번호로 전화', next: 'call_scammer', outcome: 'neutral' },
                    { label: '"지금 검사" 버튼 클릭', next: 'scan_fake', outcome: 'neutral' },
                    { label: '작업 관리자를 열어 브라우저 닫기', next: 'safe_close', outcome: 'safe' },
                    { label: '인터넷 라우터 뽑기', next: 'safe_unplug', outcome: 'safe' }
                ]
            },
            scan_fake: {
                content: {
                    type: 'popup',
                    header: '시스템 검사 중...',
                    body: '파일 검사 중... 128개의 위협 발견! 심각한 오류! IP 주소가 손상되었습니다. 수정하려면 "모두 제거"를 클릭하십시오.',
                    timer: '검사 완료.'
                },
                options: [
                    { label: '"모두 제거" 클릭', next: 'fail_malware', outcome: 'fail' },
                    { label: '이건 가짜 같아. 브라우저 닫기.', next: 'safe_close', outcome: 'safe' },
                    { label: '지원 번호로 전화', next: 'call_scammer', outcome: 'neutral' },
                    { label: '무시하고 재부팅', next: 'safe_close', outcome: 'safe' }
                ]
            },
            call_scammer: {
                content: {
                    type: 'phone',
                    caller: 'Microsoft 지원팀 (가짜)',
                    audio_text: '"여보세요, Microsoft입니다. 귀하의 네트워크에 해커가 보입니다. 해결하려면 원격으로 연결해야 합니다. AnyDesk를 다운로드하십시오."'
                },
                options: [
                    { label: 'AnyDesk 다운로드 및 액세스 허용', next: 'fail_remote', outcome: 'fail' },
                    { label: '직원 ID 묻기', next: 'ask_id', outcome: 'neutral' },
                    { label: '끊기. Microsoft는 전화를 걸지 않습니다.', next: 'safe_hangup', outcome: 'safe' },
                    { label: 'Mac을 쓴다고 말하기', next: 'troll_mac', outcome: 'neutral' }
                ]
            },
            ask_id: {
                content: {
                    type: 'phone',
                    caller: 'Microsoft 지원팀 (가짜)',
                    audio_text: '"내 ID는 MS-9921입니다. 보세요, 컴퓨터가 곧 다운됩니다. 사진을 다 잃고 싶으세요? 지금 연결하세요."'
                },
                options: [
                    { label: '사진을 잃고 싶지 않아. 연결.', next: 'fail_remote', outcome: 'fail' },
                    { label: '거짓말이네요. 끊기.', next: 'safe_hangup', outcome: 'safe' },
                    { label: '상급자 요청.', next: 'call_scammer', outcome: 'neutral' },
                    { label: '"Microsoft 공식 번호로 전화하겠습니다"라고 말하기.', next: 'safe_hangup', outcome: 'safe' }
                ]
            },
            troll_mac: {
                content: {
                    type: 'phone',
                    caller: 'Microsoft 지원팀 (가짜)',
                    audio_text: '"(침묵)... 어, 저희는 Mac도 지원합니다. App Store로 가서 AnyDesk를 다운로드하세요."'
                },
                options: [
                    { label: '아까 Windows Defender라고 했잖아.', next: 'safe_hangup', outcome: 'safe' },
                    { label: '알았어, 다운로드 중.', next: 'fail_remote', outcome: 'fail' },
                    { label: '끊기.', next: 'safe_hangup', outcome: 'safe' },
                    { label: '좀 더 골탕 먹이기.', next: 'safe_hangup', outcome: 'safe' }
                ]
            },
            safe_unplug: {
                isEnd: true,
                success: true,
                message: '인터넷 연결을 끊었습니다.',
                feedback: '플러그를 뽑으면 데이터 전송이 중지됩니다. 그런 다음 컴퓨터를 안전하게 재부팅할 수 있습니다. 팝업은 브라우저 창일 뿐이었습니다.'
            },
            fail_remote: {
                isEnd: true,
                success: false,
                message: '사기꾼에게 원격 액세스 권한을 주었습니다.',
                feedback: '그들은 이제 파일을 훔치거나 키로거를 설치하거나 랜섬웨어로 컴퓨터를 잠글 수 있습니다. 원치 않는 전화에 원격 액세스 권한을 주지 마십시오.'
            },
            fail_malware: {
                isEnd: true,
                success: false,
                message: '악성 링크를 클릭했습니다.',
                feedback: '가짜 "바이러스 제거" 버튼은 종종 실제 악성 코드를 다운로드하게 합니다. 실제 바이러스 백신 소프트웨어는 브라우저 팝업이 아니라 자체 창에서 실행됩니다.'
            },
            safe_close: {
                isEnd: true,
                success: true,
                message: '팝업을 안전하게 닫았습니다.',
                feedback: '맞습니다. 이러한 팝업은 전체 화면 모드에 갇힌 웹 페이지일 뿐입니다. 브라우저(Alt+F4 또는 작업 관리자)를 닫으면 문제가 해결됩니다.'
            },
            safe_hangup: {
                isEnd: true,
                success: true,
                message: '사기꾼의 전화를 끊었습니다.',
                feedback: '좋아요. Microsoft는 컴퓨터 수리를 위해 먼저 전화를 걸지 않습니다.'
            }
        }
    },
    {
        id: 'social_legit',
        type: 'legit',
        isScam: false,
        title: '친구가 곤경에?',
        description: 'Instagram에서 친구 Sarah에게 DM을 받았습니다.',
        initialStep: 'start',
        steps: {
            start: {
                content: {
                    type: 'social',
                    platform: 'Instagram',
                    sender: 'Sarah_Jenkins99',
                    message: '안녕! 지금 시간 있어? 큰 부탁이 하나 있어.'
                },
                options: [
                    { label: '응, 뭔데?', next: 'ask_favor', outcome: 'neutral' },
                    { label: '진짜 Sarah 맞아?', next: 'verify_identity', outcome: 'neutral' },
                    { label: '무시하기. 해킹당했을 수도 있어.', next: 'ignore_friend', outcome: 'safe' },
                    { label: '진짜 번호로 문자해서 확인하기', next: 'text_real', outcome: 'safe' }
                ]
            },
            ignore_friend: {
                isEnd: true,
                success: true,
                message: '메시지를 무시했습니다.',
                feedback: '친구가 해킹당한 것으로 의심되면 무시하는 것이 안전합니다. 확인을 위해 다른 플랫폼에서 문자를 보내는 것이 가장 좋습니다.'
            },
            ask_favor: {
                content: {
                    type: 'social',
                    platform: 'Instagram',
                    sender: 'Sarah_Jenkins99',
                    message: '다른 계정이 잠겨서 대신 코드를 받아줄 사람이 필요해. 네 폰으로 보내도 될까?'
                },
                options: [
                    { label: '코드 보내줘', next: 'fail_2fa', outcome: 'fail' },
                    { label: '사기 같은데. 안 돼.', next: 'deny_request', outcome: 'safe' },
                    { label: '전화해서 설명해달라고 하기', next: 'call_sarah', outcome: 'safe' },
                    { label: '"내 강아지 이름이 뭐야?"라고 묻기', next: 'security_question', outcome: 'neutral' }
                ]
            },
            deny_request: {
                isEnd: true,
                success: true,
                message: '코드 전송을 거부했습니다.',
                feedback: '현명합니다. "친구"가 요청하더라도 휴대전화로 전송된 인증 코드는 절대 공유하지 마십시오.'
            },
            call_sarah: {
                isEnd: true,
                success: true,
                message: 'Sarah에게 전화했습니다.',
                feedback: '그녀는 전화를 받아 정말 잠겼다고 설명했지만, 당신의 신중함을 이해했습니다. 전화는 최고의 확인 방법입니다.'
            },
            security_question: {
                content: {
                    type: 'social',
                    platform: 'Instagram',
                    sender: 'Sarah_Jenkins99',
                    message: 'ㅋㅋ Buster잖아! 제발, 진짜 도움이 필요해.'
                },
                options: [
                    { label: '알았어, 이름을 아네. 도와줄게.', next: 'safe_help', outcome: 'safe' },
                    { label: '아직 수상해. 전화해.', next: 'call_sarah', outcome: 'safe' },
                    { label: '코드 전송.', next: 'fail_2fa', outcome: 'fail' },
                    { label: '무시.', next: 'ignore_friend', outcome: 'safe' }
                ]
            },
            verify_identity: {
                content: {
                    type: 'social',
                    platform: 'Instagram',
                    sender: 'Sarah_Jenkins99',
                    message: '어머, 나 맞다고! 차가 고장 났는데 배터리가 없어서 미치겠어. AAA에 전화해야 하는데 서비스가 안 되고 와이파이만 돼.'
                },
                options: [
                    { label: '알았어, 뭘 도와줄까?', next: 'help_car', outcome: 'neutral' },
                    { label: '음성 메모 보내줘', next: 'voice_note', outcome: 'neutral' },
                    { label: '정확히 어디야?', next: 'ask_location', outcome: 'neutral' },
                    { label: '내가 너희 어머니한테 전화해서 도와달라고 할게', next: 'call_mom', outcome: 'safe' }
                ]
            },
            help_car: {
                content: {
                    type: 'social',
                    platform: 'Instagram',
                    sender: 'Sarah_Jenkins99',
                    message: '견인차 부르게 CashApp으로 $50만 보내줄 수 있어? 내일 갚을게.'
                },
                options: [
                    { label: '$50 보내기.', next: 'fail_money', outcome: 'fail' },
                    { label: '내가 대신 견인차 불러줄게.', next: 'safe_help', outcome: 'safe' },
                    { label: '먼저 음성 메모.', next: 'voice_note', outcome: 'neutral' },
                    { label: '아니.', next: 'deny_request', outcome: 'safe' }
                ]
            },
            ask_location: {
                content: {
                    type: 'social',
                    platform: 'Instagram',
                    sender: 'Sarah_Jenkins99',
                    message: '메인 스트리트에 있는 Shell 주유소야.'
                },
                options: [
                    { label: '거기로 갈게.', next: 'safe_pickup', outcome: 'safe' },
                    { label: '견인비 송금.', next: 'fail_money', outcome: 'fail' },
                    { label: '확인을 위해 주유소에 전화.', next: 'safe_help', outcome: 'safe' },
                    { label: '무시.', next: 'ignore_friend', outcome: 'safe' }
                ]
            },
            call_mom: {
                isEnd: true,
                success: true,
                message: '그녀의 어머니에게 전화했습니다.',
                feedback: '어머니는 Sarah가 실제로 차에 문제가 있음을 확인했습니다. 당신은 자신의 안전을 위험에 빠뜨리지 않고 도왔습니다.'
            },
            voice_note: {
                content: {
                    type: 'social',
                    platform: 'Instagram',
                    sender: 'Sarah_Jenkins99',
                    message: '(음성 메모): "야, 진짜로 나 5번가 주유소에 갇혔어. 제발 견인차 좀 불러줘."'
                },
                options: [
                    { label: '확실히 그녀 목소리야. 도와주자.', next: 'safe_help', outcome: 'safe' },
                    { label: 'AI 목소리일 수도 있어. 아직 수상해.', next: 'call_mom', outcome: 'safe' },
                    { label: '먼저 돈을 요구', next: 'fail_rude', outcome: 'neutral' },
                    { label: '직접 데리러 가기', next: 'safe_pickup', outcome: 'safe' }
                ]
            },
            fail_rude: {
                isEnd: true,
                success: true,
                message: '무례했지만 안전했습니다.',
                feedback: '곤경에 처한 친구에게 돈을 요구했습니다. 좋지는 않지만 사기는 당하지 않았습니다.'
            },
            safe_pickup: {
                isEnd: true,
                success: true,
                message: '직접 도우러 갔습니다.',
                feedback: '(안전하다면) 직접 가는 것은 확인하기에 좋은 방법입니다. Sarah를 찾아 도왔습니다.'
            },
            fail_money: {
                isEnd: true,
                success: false,
                message: '잠재적인 사기꾼에게 돈을 보냈습니다.',
                feedback: '진짜처럼 보여도 CashApp/Zelle을 통한 송금은 위험합니다. 한 번 보내면 끝입니다. 먼저 음성이나 전화로 확인하십시오.'
            },
            fail_2fa: {
                isEnd: true,
                success: false,
                message: '2FA 코드를 넘겨주었습니다.',
                feedback: '이것은 "Instagram 탈취" 사기입니다. 코드는 실제로 귀하의 계정을 위한 것이었습니다. 이제 그들이 귀하의 계정을 훔쳤습니다.'
            },
            safe_help: {
                isEnd: true,
                success: true,
                message: '친구를 안전하게 도왔습니다.',
                feedback: '정말 Sarah였습니다! 목소리와 구체적인 상황을 확인함으로써 봇이 아님을 확인했습니다. 좋은 친구네요!'
            },
            text_real: {
                isEnd: true,
                success: true,
                message: '두 번째 채널을 통해 확인했습니다.',
                feedback: 'Sarah는 문자에 답장하여 갇힌 것이 맞다고 확인했습니다. 다중 요소 인증(다른 채널 사용)은 확인하기에 가장 좋은 방법입니다.'
            }
        }
    },
    {
        id: 'service_legit',
        type: 'legit',
        isScam: false,
        title: '은행 사기 경보',
        description: '의심스러운 청구에 대한 문자 메시지를 받습니다.',
        initialStep: 'start',
        steps: {
            start: {
                content: {
                    type: 'phone',
                    caller: 'Chase 사기 경보 (72001)',
                    audio_text: 'Chase 사기 경보: 월마트에서 $450.00를 결제 시도하셨습니까? YES 또는 NO로 답장하세요.'
                },
                options: [
                    { label: 'NO라고 답장', next: 'reply_no', outcome: 'neutral' },
                    { label: 'YES라고 답장', next: 'reply_yes', outcome: 'neutral' },
                    { label: '링크 클릭 (있다면)', next: 'no_link', outcome: 'neutral' },
                    { label: '무시하기', next: 'ignore_alert', outcome: 'neutral' }
                ]
            },
            reply_yes: {
                content: {
                    type: 'phone',
                    caller: 'Chase 사기 경보',
                    audio_text: '감사합니다. 거래가 승인되었습니다. 이 구매를 하지 않으셨다면 즉시 1-800-935-9935로 전화해 주십시오.'
                },
                options: [
                    { label: '내가 안 했어! 전화하기.', next: 'safe_verify', outcome: 'safe' },
                    { label: '잠깐, 잘못 읽었어. NO라고 답장.', next: 'reply_no', outcome: 'neutral' },
                    { label: '무시.', next: 'ignore_alert', outcome: 'neutral' },
                    { label: '번호 차단.', next: 'block_legit', outcome: 'neutral' }
                ]
            },
            ignore_alert: {
                isEnd: true,
                success: false,
                message: '실제 사기 경보를 무시했습니다.',
                feedback: '실제 경보를 무시하면 사기성 청구가 통과될 수 있습니다. 항상 은행 앱으로 확인하십시오.'
            },
            reply_no: {
                content: {
                    type: 'phone',
                    caller: 'Chase 사기 경보',
                    audio_text: '감사합니다. 거래를 거절했습니다. 카드가 잠겼습니다. 3-5 영업일 이내에 새 카드를 보내드립니다. 추가 조치는 필요 없습니다.'
                },
                options: [
                    { label: '잘됐네, 고마워.', next: 'safe_end', outcome: 'safe' },
                    { label: '확인을 위해 카드 뒷면 번호로 전화', next: 'safe_verify', outcome: 'safe' },
                    { label: '"지금 잠금 해제할 수 있나요?"라고 답장', next: 'ask_unlock', outcome: 'neutral' },
                    { label: '패닉', next: 'panic', outcome: 'neutral' }
                ]
            },
            ask_unlock: {
                content: {
                    type: 'phone',
                    caller: 'Chase 사기 경보',
                    audio_text: '카드를 잠금 해제하려면 지원 라인으로 전화해 주십시오. 보안상의 이유로 문자를 통해서는 잠금 해제할 수 없습니다.'
                },
                options: [
                    { label: '지원팀에 전화.', next: 'safe_verify', outcome: 'safe' },
                    { label: '"잠금 해제해 주세요"라고 답장.', next: 'safe_end', outcome: 'safe' },
                    { label: '은행 지점 방문.', next: 'safe_verify', outcome: 'safe' },
                    { label: '무시.', next: 'safe_end', outcome: 'safe' }
                ]
            },
            panic: {
                content: {
                    type: 'info',
                    text: '당신은 당황하기 시작합니다. 은행 앱을 확인하니 거래가 실제로 보류 중/거절됨으로 나옵니다.'
                },
                options: [
                    { label: '은행에 전화.', next: 'safe_verify', outcome: 'safe' },
                    { label: '문자를 믿고 아무것도 안 함.', next: 'safe_end', outcome: 'safe' },
                    { label: 'STOP이라고 답장.', next: 'reply_stop', outcome: 'neutral' },
                    { label: '페이스북에 게시.', next: 'safe_end', outcome: 'safe' }
                ]
            },
            reply_stop: {
                isEnd: true,
                success: false,
                message: '사기 경보 수신을 거부했습니다.',
                feedback: '실제 은행 번호에 STOP이라고 답장하면 향후 경보가 비활성화됩니다. 이는 귀하를 취약하게 만듭니다.'
            },
            no_link: {
                content: {
                    type: 'info',
                    text: '자세히 봅니다. 메시지에 링크가 없습니다. YES/NO 답장만 요청합니다. 이는 합법적인 경보의 좋은 징조입니다.'
                },
                options: [
                    { label: 'NO라고 답장', next: 'reply_no', outcome: 'neutral' },
                    { label: '아직 수상해. 은행에 직접 전화.', next: 'safe_verify', outcome: 'safe' },
                    { label: '번호 차단', next: 'block_legit', outcome: 'neutral' },
                    { label: 'STOP이라고 답장', next: 'reply_stop', outcome: 'neutral' }
                ]
            },
            safe_verify: {
                isEnd: true,
                success: true,
                message: '은행에 확인했습니다.',
                feedback: '상담원은 문자가 진짜였고 청구가 차단되었음을 확인했습니다. 공식 번호로 전화하는 것이 항상 가장 안전한 방법입니다.'
            },
            safe_end: {
                isEnd: true,
                success: true,
                message: '사기 경보를 올바르게 처리했습니다.',
                feedback: '실제 사기 경보는 종종 예/아니요만 묻고 링크를 클릭하거나 로그인하도록 요구하지 않습니다. 안전을 지켰습니다.'
            },
            block_legit: {
                isEnd: true,
                success: false,
                message: '실제 사기 경보를 차단했습니다.',
                feedback: '그건 실제로 Chase였습니다. 차단하면 향후 경보를 놓칠 수 있습니다. 조심하는 것은 좋지만 무작정 차단하는 것보다 확인하는 것이 좋습니다.'
            }
        }
    }
];

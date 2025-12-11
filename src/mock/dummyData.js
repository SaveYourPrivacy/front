// Sample terms text for testing
export const sampleTermsText = `제1조 (목적)
이 약관은 회사가 제공하는 서비스의 이용조건 및 절차에 관한 사항을 규정함을 목적으로 합니다.

제2조 (정의)
1. "서비스"란 회사가 제공하는 모든 온라인 서비스를 의미합니다.
2. "회원"이란 이 약관에 동의하고 서비스를 이용하는 자를 말합니다.

제3조 (약관의 효력 및 변경)
1. 회사는 필요하다고 인정되는 경우 이 약관을 변경할 수 있으며, 변경된 약관은 공지 없이 즉시 효력이 발생합니다.
2. 회원이 변경된 약관에 동의하지 않을 경우 서비스 이용을 중단하고 탈퇴할 수 있습니다. 계속 사용 시 동의한 것으로 간주합니다.

제4조 (개인정보의 보호)
1. 회사는 관련 법령이 정하는 바에 따라 회원의 개인정보를 보호하기 위해 노력합니다.
2. 회사는 서비스 향상을 위해 회원의 개인정보를 제3자에게 제공할 수 있습니다.

제5조 (회사의 면책)
1. 회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 책임이 면제됩니다.
2. 회사는 회원의 귀책사유로 인한 서비스 이용의 장애에 대하여 책임을 지지 않습니다.
3. 회사는 서비스 이용으로 발생한 어떠한 손해에 대해서도 책임을 지지 않습니다.

제6조 (분쟁의 해결)
1. 이 약관과 관련된 분쟁은 회사의 본사 소재지 법원을 전속 관할 법원으로 합니다.`;

// Sample analysis result
export const sampleAnalysisResult = {
  summary: {
    title: "약관 분석 요약",
    overview: "총 6개 조항 중 5개 조항에서 소비자에게 불리한 불공정 조항이 발견되었습니다. 특히 약관 변경 및 개인정보 제3자 제공 조항에서 심각한 문제가 발견되었습니다.",
    totalClauses: 6,
    unfairCount: 5,
    riskLevel: "높음"
  },
  termsSummary: {
    mainPoints: [
      "본 약관은 온라인 서비스 이용에 관한 조건과 절차를 규정하고 있습니다.",
      "서비스 정의, 약관 변경, 개인정보 보호, 회사 면책, 분쟁 해결 등 6개 조항으로 구성되어 있습니다.",
      "약관 변경 시 사전 공지 없이 즉시 효력이 발생하며, 개인정보를 제3자에게 제공할 수 있다고 명시되어 있습니다."
    ],
    keyRights: [
      "회원은 변경된 약관에 동의하지 않을 경우 서비스 이용을 중단하고 탈퇴할 수 있습니다.",
      "개인정보는 관련 법령에 따라 보호받을 권리가 있습니다."
    ],
    keyObligations: [
      "회원은 약관 변경 시 계속 사용하면 동의한 것으로 간주됩니다.",
      "서비스 이용 중 발생하는 손해에 대해 회사는 책임을 지지 않습니다.",
      "약관 관련 분쟁은 회사 본사 소재지 법원의 관할로 합니다."
    ]
  },
  unfairClauses: [
    {
      id: 1,
      clauseNumber: "제3조 제1항",
      text: "회사는 필요하다고 인정되는 경우 이 약관을 변경할 수 있으며, 변경된 약관은 공지 없이 즉시 효력이 발생합니다.",
      issues: [
        {
          type: "절차 위반",
          description: "약관 변경 시 사전 공지 없이 즉시 효력을 발생시키는 것은 소비자의 권리를 침해합니다.",
          severity: "높음",
          relatedLaw: "약관의 규제에 관한 법률 제4조"
        }
      ]
    },
    {
      id: 2,
      clauseNumber: "제4조 제2항",
      text: "회사는 서비스 향상을 위해 회원의 개인정보를 제3자에게 제공할 수 있습니다.",
      issues: [
        {
          type: "개인정보 침해",
          description: "개인정보를 제3자에게 제공하기 위해서는 명시적 동의가 필요하나, 이를 일방적으로 규정하고 있습니다.",
          severity: "높음",
          relatedLaw: "개인정보 보호법 제17조"
        },
        {
          type: "법률 위반",
          description: "GDPR 및 개인정보보호법에서 요구하는 명시적 동의 절차가 누락되어 있습니다.",
          severity: "높음",
          relatedLaw: "GDPR Article 6"
        }
      ]
    },
    {
      id: 3,
      clauseNumber: "제5조 제3항",
      text: "회사는 서비스 이용으로 발생한 어떠한 손해에 대해서도 책임을 지지 않습니다.",
      issues: [
        {
          type: "면책 조항 과다",
          description: "회사의 고의 또는 과실로 인한 손해에 대해서도 일괄적으로 면책하는 것은 무효입니다.",
          severity: "높음",
          relatedLaw: "약관의 규제에 관한 법률 제7조"
        }
      ]
    },
    {
      id: 4,
      clauseNumber: "제6조 제1항",
      text: "본 약관과 관련된 분쟁은 회사의 본사 소재지 법원을 전속 관할 법원으로 합니다.",
      issues: [
        {
          type: "관할권 제한",
          description: "소비자의 주소지 법원이 아닌 회사 소재지 법원으로만 제한하는 것은 소비자에게 불리한 조항입니다.",
          severity: "중간",
          relatedLaw: "약관규제법 제14조"
        }
      ]
    },
    {
      id: 5,
      clauseNumber: "제2조 제3항",
      text: "회사는 천재지변 등 불가항력적 사유로 서비스를 제공할 수 없는 경우 책임이 면제됩니다.",
      issues: [
        {
          type: "정보성 조항",
          description: "천재지변 등 불가항력으로 인한 면책은 법률상 당연한 내용으로, 크게 문제되지 않습니다.",
          severity: "낮음",
          relatedLaw: "민법 제750조"
        }
      ]
    }
  ],
  recommendations: [
    "약관 변경 시 최소 7일 전 사전 공지를 명시해야 합니다.",
    "개인정보 제3자 제공 시 별도의 명시적 동의 절차를 추가해야 합니다.",
    "회사의 고의 또는 중과실로 인한 손해에 대해서는 책임을 지도록 수정해야 합니다.",
    "관할 법원을 소비자의 선택에 따라 정할 수 있도록 변경하세요."
  ]
};

// Sample abuse scenarios for business analysis
export const sampleAbuseScenarios = [
  {
    title: "약관 변경을 통한 일방적 서비스 축소",
    severity: "높음",
    scenario: "회사가 공지 없이 약관을 변경하여 유료 기능을 무료 회원에게서 제거하거나, 서비스 이용 요금을 인상할 수 있습니다. 사용자가 약관 변경 사실을 인지하지 못한 채 계속 서비스를 이용하면 자동으로 동의한 것으로 간주되어, 예상치 못한 불이익을 받을 수 있습니다.",
    relatedClauses: [
      "제3조 제1항 - 공지 없는 약관 변경 조항",
      "제3조 제2항 - 묵시적 동의 간주 조항"
    ],
    potentialDamage: "고객 이탈률 증가, 집단 소송 위험, 브랜드 신뢰도 하락, 소비자 보호 기관의 제재 가능성이 있습니다. 특히 대규모 약관 변경 시 언론 보도로 인한 기업 이미지 실추가 예상됩니다.",
    preventionMeasures: "약관 변경 시 최소 7일 전 이메일 및 앱 푸시 알림으로 사전 고지하고, 중요 변경 사항에 대해서는 별도 동의 절차를 마련해야 합니다. 변경 내용을 명확히 비교 표시하여 투명성을 확보하세요.",
    realCases: [
      {
        title: "소니 플레이스테이션 네트워크 약관 변경 논란 (2024)",
        url: "https://www.theverge.com/2024/4/15/24131034/sony-playstation-terms-of-service-changes-psn",
        description: "사전 고지 없이 약관 변경 후 집단 소송권 포기 조항 추가"
      },
      {
        title: "유니티 엔진 가격 정책 변경 사태 (2023)",
        url: "https://www.gamedeveloper.com/business/unity-walks-back-controversial-runtime-fee-policy",
        description: "게임 개발자들에게 급작스런 요금제 변경 통보로 업계 반발"
      }
    ]
  },
  {
    title: "개인정보 무단 판매를 통한 수익 창출",
    severity: "높음",
    scenario: "회사가 '서비스 향상'이라는 모호한 명목으로 회원의 개인정보를 제3자 마케팅 업체나 데이터 브로커에게 판매할 수 있습니다. 이용자의 행동 패턴, 구매 이력, 위치 정보 등이 본인 동의 없이 여러 기업에 공유되어 타겟 광고나 스팸 메시지가 급증할 수 있습니다.",
    relatedClauses: [
      "제4조 제2항 - 개인정보 제3자 제공 조항"
    ],
    potentialDamage: "개인정보보호법 위반으로 인한 최대 5억원의 과징금, 집단 소송으로 인한 배상 책임, GDPR 위반 시 글로벌 매출의 4% 벌금이 부과될 수 있습니다. 개인정보 유출 사고 발생 시 사업 운영 중단 위험도 있습니다.",
    preventionMeasures: "개인정보 제3자 제공 시 구체적인 제공 대상, 목적, 항목을 명시하고 별도의 선택적 동의를 받아야 합니다. 개인정보 처리방침을 상세히 작성하고 정기적으로 개인정보 보호 감사를 실시하세요.",
    realCases: [
      {
        title: "페이스북-캠브리지 애널리티카 스캔들 (2018)",
        url: "https://www.nytimes.com/2018/04/04/us/politics/cambridge-analytica-scandal-fallout.html",
        description: "8,700만 명의 개인정보가 동의 없이 정치 컨설팅 회사에 제공됨"
      },
      {
        title: "티몬 개인정보 무단 제공 과징금 부과 (2022)",
        url: "https://www.pipc.go.kr/np/cop/bbs/selectBoardArticle.do?bbsId=BS074&mCode=C020010000&nttId=8279",
        description: "개인정보보호위원회, 마케팅 목적 개인정보 무단 제공으로 2억 4천만원 과징금"
      },
      {
        title: "Google GDPR 위반 5,000만 유로 벌금 (2019)",
        url: "https://www.cnil.fr/en/cnils-restricted-committee-imposes-financial-penalty-50-million-euros-against-google-llc",
        description: "프랑스 정보보호당국, 광고 맞춤화를 위한 투명하지 않은 개인정보 처리로 제재"
      }
    ]
  },
  {
    title: "서비스 장애 시 전면 면책을 통한 책임 회피",
    severity: "중간",
    scenario: "서버 다운, 보안 취약점, 또는 회사의 부주의로 인한 서비스 중단이 발생해도 회사는 어떠한 책임도 지지 않는다고 주장할 수 있습니다. 예를 들어 결제 시스템 오류로 인한 중복 결제나 데이터 손실이 발생해도 보상을 거부할 수 있습니다.",
    relatedClauses: [
      "제5조 제3항 - 포괄적 면책 조항",
      "제5조 제2항 - 회원 귀책사유 조항"
    ],
    potentialDamage: "소비자 분쟁 급증으로 고객센터 운영 비용 증가, 소비자원 및 공정거래위원회의 시정 명령, 온라인 리뷰 및 SNS를 통한 부정적 평판 확산이 예상됩니다. 심각한 서비스 장애 시 집단 환불 요구가 발생할 수 있습니다.",
    preventionMeasures: "회사의 고의 또는 중과실로 인한 손해는 책임을 지도록 명시하고, SLA(Service Level Agreement)를 통해 보상 기준을 구체적으로 설정해야 합니다. 서비스 모니터링 체계를 강화하고 장애 대응 매뉴얼을 마련하세요.",
    realCases: [
      {
        title: "카카오 데이터센터 화재 사고 (2022)",
        url: "https://www.mk.co.kr/news/it/10504949",
        description: "서비스 장기 중단으로 손해배상 소송 제기, 면책 조항 논란 발생"
      },
      {
        title: "AWS 장애로 인한 서비스 중단 사태 (2021)",
        url: "https://www.theguardian.com/technology/2021/dec/07/amazon-web-services-outage-wreaks-havoc-on-us-businesses",
        description: "다수의 기업이 손실을 입었으나 AWS는 SLA에 따른 제한적 보상만 제공"
      }
    ]
  },
  {
    title: "불리한 관할 법원 지정을 통한 소송 회피",
    severity: "중간",
    scenario: "지방 소재 소비자가 서비스 분쟁으로 소송을 제기하려 할 때, 회사 본사가 위치한 서울 법원으로만 제소해야 하므로 시간적, 경제적 부담이 커져 소송을 포기하게 만들 수 있습니다. 이를 통해 회사는 법적 책임을 실질적으로 회피할 수 있습니다.",
    relatedClauses: [
      "제6조 제1항 - 전속 관할 법원 조항"
    ],
    potentialDamage: "약관규제법 위반으로 해당 조항이 무효 처리될 수 있으며, 소비자 단체의 집단 분쟁 조정 신청 가능성이 있습니다. 공정거래위원회의 시정 조치 및 언론 보도로 인한 기업 이미지 악화가 우려됩니다.",
    preventionMeasures: "관할 법원을 소비자의 주소지 또는 회사 소재지 중 선택 가능하도록 수정하거나, 온라인 분쟁 조정(ODR) 제도 활용 조항을 추가하세요. 소비자 분쟁 해결 기준을 투명하게 공개하여 신뢰를 구축하세요.",
    realCases: [
      {
        title: "애플 앱스토어 전속관할 조항 무효 판결 (2020)",
        url: "https://www.law.go.kr/LSW/detcInfoP.do?detcSeq=64394",
        description: "서울중앙지법, 소비자에게 불리한 전속관할 조항 무효 판결"
      },
      {
        title: "온라인 쇼핑몰 약관 전속관할 조항 시정명령 (2019)",
        url: "https://www.ftc.go.kr/www/selectReportUserView.do?key=10&rpttype=1&report_data_no=8125",
        description: "공정거래위원회, 다수 온라인 쇼핑몰의 불공정 관할 조항에 시정명령"
      }
    ]
  }
];

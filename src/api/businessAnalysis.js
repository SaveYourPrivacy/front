/**
 * Business Terms Analysis API
 * Analyzes terms for vulnerabilities and exploitation risks from a business perspective
 */

// Dummy data for demonstration
const dummyBusinessAnalysisResult = {
  summary: {
    title: "기업용 약관 분석 요약",
    overview: "총 8개 조항에서 심각한 취약점이 발견되었습니다. 특히 데이터 보호와 서비스 안정성 측면에서 중대한 법적 리스크가 존재합니다.",
    totalClauses: 15,
    unfairCount: 8,
    riskLevel: "높음"
  },
  termsSummary: {
    mainPoints: [
      "데이터 수집 및 제3자 공유 관련 조항이 GDPR 및 개인정보보호법 위반 소지가 높습니다.",
      "서비스 중단 및 변경에 대한 일방적 권한 부여로 사용자 피해 가능성이 큽니다.",
      "저작권 귀속 조항이 사용자의 권리를 과도하게 제한하고 있습니다."
    ],
    keyRights: [
      "사용자는 자신의 개인정보에 대한 열람 및 삭제 요구권이 있습니다.",
      "서비스 변경 시 사전 통지를 받을 권리가 있습니다."
    ],
    keyObligations: [
      "회원 탈퇴 후에도 개인정보가 무기한 보관될 수 있습니다.",
      "회사는 사용자 콘텐츠에 대한 저작권을 주장할 수 있습니다.",
      "서비스 중단으로 인한 손해에 대해 회사는 책임을 지지 않습니다."
    ]
  },
  unfairClauses: [
    {
      id: 1,
      clauseNumber: "제3조 제2항",
      text: "회사는 서비스 개선 및 맞춤형 서비스 제공을 위해 이용자의 모든 활동 정보를 수집하고 분석할 수 있으며, 이를 제3자와 공유할 수 있습니다.",
      issues: [
        {
          type: "데이터 보호 취약",
          description: "사용자 데이터를 무제한으로 수집할 수 있게 하며, '모든 활동 정보'라는 광범위한 표현으로 개인의 민감한 행동 패턴까지 추적할 수 있습니다. 제3자 공유 범위가 명확하지 않아 데이터 브로커나 광고 업체에 무분별하게 판매될 위험이 있습니다.",
          severity: "높음",
          relatedLaw: "개인정보보호법 제15조, GDPR Article 5"
        },
        {
          type: "악용 가능성",
          description: "개인정보 대량 유출 가능성, 고액 과징금(최대 매출액의 3%), 집단 소송 위험, 기업 평판 손실이 예상됩니다.",
          severity: "높음",
          relatedLaw: "개인정보보호법 제17조"
        }
      ]
    },
    {
      id: 2,
      clauseNumber: "제7조 제1항",
      text: "회사는 사전 통지 없이 서비스 내용을 변경하거나 중단할 수 있으며, 이로 인한 손해에 대해 책임지지 않습니다.",
      issues: [
        {
          type: "서비스 안정성 미보장",
          description: "기업이 아무런 공지 없이 핵심 서비스를 중단하거나 변경할 수 있게 허용합니다. 서비스에 의존하는 사용자나 사업자에게 막대한 피해를 줄 수 있으며, 기업의 책임을 완전히 면제하려는 시도입니다.",
          severity: "높음",
          relatedLaw: "약관규제법 제6조, 전자상거래법 제13조"
        },
        {
          type: "법적 리스크",
          description: "소비자 집단 소송 가능성, 약관 효력 제한 판정, 공정거래위원회 제재, B2B 계약 위반 분쟁이 발생할 수 있습니다.",
          severity: "높음",
          relatedLaw: "소비자기본법 제16조"
        }
      ]
    },
    {
      id: 3,
      clauseNumber: "제12조 제3항",
      text: "회원이 작성한 모든 게시물에 대한 저작권 및 소유권은 회사에 귀속되며, 회사는 이를 자유롭게 사용, 편집, 배포할 수 있습니다.",
      issues: [
        {
          type: "지식재산권 침해",
          description: "사용자가 창작한 콘텐츠의 저작권을 회사가 완전히 가져가려는 시도입니다. 사용자는 자신이 만든 콘텐츠에 대한 권리를 상실하게 되며, 회사는 이를 상업적으로 활용하거나 제3자에게 판매할 수 있습니다.",
          severity: "높음",
          relatedLaw: "저작권법 제2조, 제45조"
        },
        {
          type: "플랫폼 리스크",
          description: "저작권 분쟁 및 집단 소송, 크리에이터 이탈로 인한 플랫폼 가치 하락, 저작권법 위반 소지가 있습니다.",
          severity: "높음",
          relatedLaw: "약관규제법 제7조"
        }
      ]
    },
    {
      id: 4,
      clauseNumber: "제5조 제4항",
      text: "회원 탈퇴 시에도 회사는 회원의 개인정보를 무기한 보관할 수 있으며, 이를 통계 및 마케팅 목적으로 활용할 수 있습니다.",
      issues: [
        {
          type: "데이터 삭제권 침해",
          description: "GDPR의 '잊힐 권리'와 개인정보보호법의 파기 의무를 명백히 위반하는 조항입니다. 탈퇴 후에도 개인정보를 무기한 보관하는 것은 법적으로 허용되지 않으며, 마케팅 활용은 더욱 문제가 됩니다.",
          severity: "높음",
          relatedLaw: "개인정보보호법 제21조, GDPR Article 17"
        },
        {
          type: "과징금 위험",
          description: "개인정보보호위원회 과징금(최대 매출액의 3%), EU 시장에서 GDPR 위반 제재(최대 2천만 유로), 개인정보 침해 소송 리스크가 있습니다.",
          severity: "높음",
          relatedLaw: "전자상거래법 제6조"
        }
      ]
    },
    {
      id: 5,
      clauseNumber: "제9조 제2항",
      text: "회사는 이용자 간 분쟁에 대해 어떠한 책임도 지지 않으며, 분쟁 해결을 위한 중재나 지원을 제공하지 않습니다.",
      issues: [
        {
          type: "플랫폼 책임 회피",
          description: "플랫폼 사업자로서의 최소한의 책임도 회피하려는 조항입니다. 거래 중개 플랫폼의 경우 법적으로 일정 수준의 관리·감독 책임이 있으며, 완전한 면책은 인정되지 않습니다.",
          severity: "중간",
          relatedLaw: "전자상거래법 제20조, 정보통신망법 제44조의2"
        },
        {
          type: "신뢰도 하락",
          description: "플랫폼 신뢰도 하락으로 인한 사용자 이탈, 사기 피해 발생 시 공동 책임 인정 가능성이 있습니다.",
          severity: "중간",
          relatedLaw: "약관규제법 제7조"
        }
      ]
    },
    {
      id: 6,
      clauseNumber: "제15조 제1항",
      text: "본 약관에 대한 관할 법원은 회사 소재지 법원으로 하며, 준거법은 대한민국 법률로 합니다.",
      issues: [
        {
          type: "관할권 편의 조항",
          description: "회사 소재지 법원으로만 제한하는 것은 소비자에게 불리한 조항입니다. 회사가 원거리에 있는 경우 소비자가 소송을 제기하기 어렵게 만드는 장벽이 됩니다.",
          severity: "중간",
          relatedLaw: "약관규제법 제14조, 민사소송법 제2조"
        }
      ]
    },
    {
      id: 7,
      clauseNumber: "제11조 제5항",
      text: "회사는 이용자의 귀책사유 여부와 관계없이 언제든지 서비스 이용을 제한하거나 계약을 해지할 수 있습니다.",
      issues: [
        {
          type: "일방적 계약 해지권",
          description: "회사에게 과도한 재량권을 부여하여, 정당한 사유 없이도 사용자의 서비스 이용을 차단할 수 있게 합니다. 특히 유료 서비스의 경우 사용자가 지불한 금액에 대한 보호가 전혀 없습니다.",
          severity: "중간",
          relatedLaw: "약관규제법 제6조, 전자상거래법 제17조"
        }
      ]
    },
    {
      id: 8,
      clauseNumber: "제8조 제6항",
      text: "회사가 제공하는 정보의 정확성에 대해 회사는 보증하지 않으며, 이를 신뢰하여 발생한 손해에 대해 책임지지 않습니다.",
      issues: [
        {
          type: "정보 정확성 책임 회피",
          description: "정보 제공 서비스임에도 불구하고 정보의 정확성에 대한 책임을 완전히 회피하려는 조항입니다. 사용자가 잘못된 정보로 인해 손해를 입어도 회사가 책임을 지지 않겠다는 의미입니다.",
          severity: "낮음",
          relatedLaw: "약관규제법 제7조, 민법 제750조"
        }
      ]
    }
  ],
  recommendations: [
    "데이터 수집 범위를 최소화하고, 제3자 공유 시 사용자의 명시적 동의 절차를 추가하세요.",
    "서비스 변경 및 중단 시 최소 30일 전 사전 통지를 명시하고, 긴급 상황만 예외를 인정하세요.",
    "저작권은 사용자에게 유지되며, 회사는 서비스 운영 범위 내 비독점적 사용권만 보유하도록 변경하세요.",
    "회원 탈퇴 시 즉시 개인정보를 파기하고, 법적 보관 의무가 있는 경우만 기간을 명시하세요.",
    "플랫폼 관리·감독 의무를 인정하고, 분쟁 해결을 위한 최소한의 지원 체계를 마련하세요."
  ]
};

/**
 * Analyzes terms text for business vulnerabilities
 * @param {string} termsText - The terms text to analyze
 * @returns {Promise<Object>} Analysis result with vulnerabilities
 */
export async function analyzeBusinessTerms(termsText) {
  // Simulate API call with delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyBusinessAnalysisResult);
    }, 1500);
  });

  // Real API implementation (uncomment when backend is ready):
  // const response = await fetch('YOUR_API_ENDPOINT/api/business-analysis', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ termsText }),
  // });
  //
  // if (!response.ok) {
  //   throw new Error('분석 요청에 실패했습니다.');
  // }
  //
  // return await response.json();
}

/**
 * Analyzes terms from uploaded file for business vulnerabilities
 * @param {File} file - The file to analyze
 * @returns {Promise<Object>} Analysis result with vulnerabilities
 */
export async function analyzeBusinessTermsFromFile(file) {
  // Simulate API call with delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyBusinessAnalysisResult);
    }, 1500);
  });

  // Real API implementation (uncomment when backend is ready):
  // const formData = new FormData();
  // formData.append('file', file);
  //
  // const response = await fetch('YOUR_API_ENDPOINT/api/business-analysis/file', {
  //   method: 'POST',
  //   body: formData,
  // });
  //
  // if (!response.ok) {
  //   throw new Error('파일 분석 요청에 실패했습니다.');
  // }
  //
  // return await response.json();
}

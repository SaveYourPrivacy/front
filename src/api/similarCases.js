/**
 * Similar Cases API
 * Fetches similar real cases for abuse scenarios
 */

// 백엔드 API URL 설정
const API_BASE_URL = 'http://localhost:8000';

// 더미 데이터 사용 여부 (테스트용)
const USE_DUMMY_DATA = true;

// 더미 데이터
const DUMMY_SIMILAR_CASES = [
  {
    title: "네이버 클라우드 서비스 약관 변경 논란 (2023)",
    url: "https://www.boannews.com/media/view.asp?idx=115234",
    description: "사전 고지 기간 없이 약관 변경 후 서비스 중단, 사용자들의 데이터 접근 제한 발생"
  },
  {
    title: "카카오톡 개인정보 처리방침 변경 사태 (2022)",
    url: "https://www.yna.co.kr/view/AKR20220115045100017",
    description: "개인정보 수집 범위 확대를 일방적으로 통보, 거부 시 서비스 이용 불가 조치로 논란"
  },
  {
    title: "쿠팡 이츠 배달비 정책 변경 집단소송 (2021)",
    url: "https://www.edaily.co.kr/news/read?newsId=01234567890",
    description: "약관 변경 공지 없이 배달비 인상, 소비자 피해 보상 소송 진행 중"
  },
  {
    title: "토스 금융서비스 약관 변경 과징금 부과 (2023)",
    url: "https://www.mk.co.kr/news/economy/view/2023/123456",
    description: "금융당국이 불공정 약관 변경으로 과징금 부과, 고객에게 불리한 조건 일방적 추가"
  }
];

/**
 * Fetches similar real cases for worst scenario text
 * @param {string} worstScenario - Worst scenario text from analysis result
 * @returns {Promise<Array>} Array of real cases
 *
 * Expected backend response structure:
 * {
 *   "scenarios": [
 *     {
 *       "title": "소니 플레이스테이션 네트워크 약관 변경 논란 (2024)",
 *       "url": "https://...",
 *       "description": "사전 고지 없이 약관 변경 후 집단 소송권 포기 조항 추가"
 *     }
 *   ]
 * }
 */
export async function fetchSimilarCases(worstScenario) {
  // 더미 데이터 사용 시 1.5초 딜레이 후 더미 데이터 반환
  if (USE_DUMMY_DATA) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('유사 사례 더미 데이터 반환:', DUMMY_SIMILAR_CASES);
        resolve(DUMMY_SIMILAR_CASES);
      }, 1500);
    });
  }

  try {
    const response = await fetch(`${API_BASE_URL}/similar_cases`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        scenario: worstScenario
      }),
    });

    if (!response.ok) {
      throw new Error(`유사 사례 조회 실패: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Return the scenarios array directly
    return data.scenarios || [];
  } catch (error) {
    console.error('유사 사례 조회 중 오류 발생:', error);
    // Return empty array on error to allow graceful degradation
    return [];
  }
}

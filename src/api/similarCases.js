/**
 * Similar Cases API
 * Fetches similar real cases for abuse scenarios
 */

// 백엔드 API URL 설정
const API_BASE_URL = 'http://localhost:8000';

/**
 * Fetches similar real cases for worst scenario text
 * @param {string} worstScenario - Worst scenario text from analysis result
 * @returns {Promise<Array>} Array of real cases
 *
 * Backend response structure:
 * {
 *   "cases": [
 *     {
 *       "title": "사례 제목",
 *       "summary": "사례 요약",
 *       "url": "출처 링크"
 *     }
 *   ]
 * }
 */
export async function fetchSimilarCases(worstScenario) {
  try {
    const response = await fetch(`${API_BASE_URL}/CaseSearch/cases`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        worstScenario: worstScenario
      }),
    });

    if (!response.ok) {
      throw new Error(`유사 사례 조회 실패: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // 백엔드 응답 형식을 프론트엔드 형식으로 변환
    // summary -> description으로 매핑
    // summary 필드가 누락된 경우 기본값 제공
    const cases = (data.cases || []).map(caseItem => ({
      title: caseItem.title || '관련 사례',
      url: caseItem.url || '#',
      description: caseItem.summary || caseItem.title || '상세 내용을 확인해주세요.'
    }));

    return cases;
  } catch (error) {
    console.error('유사 사례 조회 중 오류 발생:', error);
    // Return empty array on error to allow graceful degradation
    return [];
  }
}

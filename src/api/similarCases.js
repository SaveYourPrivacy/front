/**
 * Similar Cases API
 *
 * 악용 시나리오에 대한 유사 실제 사례 조회 API
 */

const API_BASE_URL = 'http://localhost:8000';

/**
 * 최악 시나리오에 대한 유사 실제 사례 조회
 *
 * @param {string} worstScenario - 분석 결과의 최악 시나리오 텍스트
 * @returns {Promise<Array>} 유사 사례 배열
 *
 * 백엔드 응답 구조:
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

    const cases = (data.cases || []).map(caseItem => ({
      title: caseItem.title || '관련 사례',
      url: caseItem.url || '#',
      description: caseItem.summary || caseItem.title || '상세 내용을 확인해주세요.'
    }));

    return cases;
  } catch (error) {
    console.error('유사 사례 조회 중 오류 발생:', error);
    return [];
  }
}

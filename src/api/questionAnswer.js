/**
 * Question Answer API
 *
 * 약관 분석 결과에 대한 추가 질문 처리 API
 */

const API_BASE_URL = 'http://localhost:8000';

/**
 * 분석된 약관에 대한 질문을 전송하고 답변 받기
 *
 * @param {string} questionText - 질문 내용
 * @param {Object} analysisContext - 분석 결과 컨텍스트 (session_id 포함)
 * @returns {Promise<string>} 질문에 대한 답변
 */
export const askQuestion = async (questionText, analysisContext = null) => {
  try {
    const sessionId = analysisContext?.session_id;

    if (!sessionId) {
      throw new Error('세션 ID가 없습니다. 약관 분석을 먼저 수행해주세요.');
    }

    const response = await fetch(`${API_BASE_URL}/AdditionalNotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        session_id: sessionId,
        question: questionText
      }),
    });

    if (!response.ok) {
      throw new Error(`질문 처리 실패: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.summary;
  } catch (error) {
    console.error('질문 처리 중 오류 발생:', error);
    throw error;
  }
};

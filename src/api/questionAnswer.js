// 백엔드 API URL 설정
const API_BASE_URL = 'http://localhost:8000';

/**
 * Sends a question about the analyzed terms and receives an answer
 * @param {string} questionText - The question to ask
 * @param {object} analysisContext - The analysis result context containing session_id
 * @returns {Promise<string>} The answer to the question
 */
export const askQuestion = async (questionText, analysisContext = null) => {
  try {
    // analysisContext에서 session_id 추출
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

    // 백엔드 응답에서 summary 반환
    return data.summary;
  } catch (error) {
    console.error('질문 처리 중 오류 발생:', error);
    throw error;
  }
};

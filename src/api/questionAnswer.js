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
 * @param {string} sessionId - 세션 ID
 * @returns {Promise<string>} 질문에 대한 답변
 */
export const askQuestion = async (questionText, sessionId) => {
  try {
    if (!sessionId) {
      throw new Error('세션 ID가 없습니다. 약관 분석을 먼저 수행해주세요.');
    }

    if (!questionText || questionText.trim() === '') {
      throw new Error('질문 내용을 입력해주세요.');
    }

    const response = await fetch(`${API_BASE_URL}/AdditionalNotes_Legacy`, {
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

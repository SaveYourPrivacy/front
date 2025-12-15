/**
 * Complaint Email API
 *
 * 분석 결과 기반 컴플레인 메일 템플릿 생성 API
 */

const API_BASE_URL = 'http://localhost:8000';

/**
 * 분석 결과를 기반으로 컴플레인 메일 템플릿 생성
 *
 * @param {Object} analysisResult - 분석 결과 (session_id 포함)
 * @returns {Promise<Object>} 메일 템플릿 (subject, body)
 */
export const generateComplaintEmail = async (analysisResult) => {
  try {
    const sessionId = analysisResult.session_id;

    if (!sessionId) {
      throw new Error('세션 ID가 없습니다. 약관 분석을 먼저 수행해주세요.');
    }

    const response = await fetch(`${API_BASE_URL}/complain_email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        session_id: sessionId
      }),
    });

    if (!response.ok) {
      throw new Error(`컴플레인 이메일 생성 실패: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return {
      subject: data.title,
      body: data.content
    };
  } catch (error) {
    console.error('컴플레인 이메일 생성 중 오류 발생:', error);
    throw error;
  }
};

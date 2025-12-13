// 백엔드 API URL 설정
const API_BASE_URL = 'http://localhost:8000';

/**
 * Generates a complaint email template based on analysis results
 * @param {object} analysisResult - The analysis result containing session_id
 * @returns {Promise} Email template containing:
 *   - subject: string - Email subject (mapped from title)
 *   - body: string - Email body content (mapped from content)
 */
export const generateComplaintEmail = async (analysisResult) => {
  try {
    // analysisResult에서 session_id 추출
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

    // 백엔드 응답을 프론트엔드 형식으로 변환
    return {
      subject: data.title,
      body: data.content
    };
  } catch (error) {
    console.error('컴플레인 이메일 생성 중 오류 발생:', error);
    throw error;
  }
};

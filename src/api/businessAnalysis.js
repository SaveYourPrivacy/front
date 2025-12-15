/**
 * Business Terms Analysis API
 *
 * 기업용 약관 분석 API - 취약점 및 악용 위험 분석
 */

const API_BASE_URL = 'http://localhost:8000';

/**
 * 백엔드 응답을 프론트엔드 형식으로 변환
 *
 * @param {Object} backendData - 백엔드 응답 데이터
 * @returns {Object} 프론트엔드 형식의 데이터
 *
 * 백엔드 응답 구조:
 * {
 *   summary: {
 *     title: string,
 *     overview: string,
 *     totalClauses: number,
 *     vulnerabilityCount: number,
 *     riskLevel: string
 *   },
 *   termsSummary: {
 *     mainPoints: string[],
 *     legalGuards: string[],
 *     requirments: string[]
 *   },
 *   vulnerabilities: VulnerableClause[],
 *   recommendations: string[],
 *   worstScenario: string,
 *   session_id: string
 * }
 */
function transformCompanyAnalysisResponse(backendData) {
  return {
    summary: {
      title: backendData.summary?.title || "기업용 약관 분석 요약",
      overview: backendData.summary?.overview || "약관 분석이 완료되었습니다.",
      totalClauses: backendData.summary?.totalClauses || 0,
      unfairCount: backendData.summary?.vulnerabilityCount || 0,
      riskLevel: backendData.summary?.riskLevel || "중간"
    },
    termsSummary: {
      mainPoints: backendData.termsSummary?.mainPoints || [],
      keyRights: backendData.termsSummary?.legalGuards || [],
      keyObligations: backendData.termsSummary?.requirments || []
    },
    unfairClauses: backendData.vulnerabilities || [],
    recommendations: backendData.recommendations || [],
    worstScenario: backendData.worstScenario || "",
    session_id: backendData.session_id || null,
  };
}

/**
 * 약관 텍스트 분석 (기업용)
 *
 * @param {string} termsText - 분석할 약관 텍스트
 * @param {string} category - 약관 카테고리 ('광고', '환불', '개인정보', '책임제한', '자동결제')
 * @returns {Promise<Object>} 분석 결과 (취약점 포함)
 */
export async function analyzeBusinessTerms(termsText, category) {
  try {
    const response = await fetch(`${API_BASE_URL}/company_terms_analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        term: termsText,
        category: category
      }),
    });

    if (!response.ok) {
      throw new Error(`분석 실패: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return transformCompanyAnalysisResponse(data);
  } catch (error) {
    console.error('기업 약관 분석 중 오류 발생:', error);
    throw error;
  }
}

/**
 * PDF 파일로부터 약관 분석 (기업용)
 *
 * @param {File} file - 분석할 PDF 파일
 * @param {string} category - 약관 카테고리 ('광고', '환불', '개인정보', '책임제한', '자동결제')
 * @returns {Promise<Object>} 분석 결과 (취약점 포함)
 */
export async function analyzeBusinessTermsFromFile(file, category) {
  try {
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      throw new Error('PDF 파일만 업로드할 수 있습니다.');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', category);

    const response = await fetch(`${API_BASE_URL}/company_terms_analyze/pdf`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`PDF 분석 실패: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return transformCompanyAnalysisResponse(data);
  } catch (error) {
    console.error('파일 분석 중 오류 발생:', error);
    throw error;
  }
}

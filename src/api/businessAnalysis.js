/**
 * Business Terms Analysis API
 * Analyzes terms for vulnerabilities and exploitation risks from a business perspective
 */

import { sampleAbuseScenarios } from '../mock/dummyData';

// 백엔드 API URL 설정
const API_BASE_URL = 'http://localhost:8000';

/**
 * 백엔드 응답 형식을 프론트엔드 형식으로 변환
 * @param {Object} backendData - 백엔드에서 받은 데이터
 * @returns {Object} 프론트엔드 형식의 데이터
 *
 * Expected backend data structure for abuseScenarios:
 * backendData.abuseScenarios = [
 *   {
 *     title: string,              // 시나리오 제목
 *     severity: "높음"|"중간"|"낮음",  // 심각도
 *     scenario: string,            // 악용 시나리오 설명
 *     relatedClauses: string[],    // 관련 약관 조항들 (optional)
 *     potentialDamage: string,     // 예상 피해
 *     preventionMeasures: string,  // 예방 조치 (optional)
 *     realCases: [                 // 실제 사례 (optional)
 *       {
 *         title: string,           // 사례 제목
 *         url: string,             // 참고 링크 URL
 *         description: string      // 사례 설명 (optional)
 *       }
 *     ]
 *   }
 * ]
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
      keyRights: backendData.termsSummary?.keyRights || [],
      keyObligations: backendData.termsSummary?.keyObligations || []
    },
    unfairClauses: backendData.vulnerabilities || [],
    recommendations: backendData.recommendations || [],
    worstScenario: backendData.worstScenario || "",
    // 백엔드에서 abuseScenarios를 제공하지 않으면 더미 데이터 사용
    abuseScenarios: backendData.abuseScenarios || sampleAbuseScenarios
  };
}

/**
 * Analyzes terms text for business vulnerabilities
 * @param {string} termsText - The terms text to analyze
 * @param {string} category - The category of terms (optional)
 * @returns {Promise<Object>} Analysis result with vulnerabilities
 */
export async function analyzeBusinessTerms(termsText, category = '일반 약관') {
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

    // 백엔드 응답 형식을 프론트엔드 형식으로 변환
    return transformCompanyAnalysisResponse(data);
  } catch (error) {
    console.error('기업 약관 분석 중 오류 발생:', error);
    throw error;
  }
}

/**
 * Analyzes terms from uploaded PDF file for business vulnerabilities
 * @param {File} file - The PDF file to analyze
 * @param {string} category - The category of terms (optional)
 * @returns {Promise<Object>} Analysis result with vulnerabilities
 */
export async function analyzeBusinessTermsFromFile(file, category = '일반 약관') {
  try {
    // PDF 파일 검증
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

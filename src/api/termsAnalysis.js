/**
 * Terms Analysis API
 *
 * 소비자용 약관 분석 API
 */

const API_BASE_URL = 'http://localhost:8000';

/**
 * 약관 텍스트 분석 (소비자용)
 *
 * @param {string} termsText - 분석할 약관 텍스트
 * @param {string} category - 약관 카테고리 ('광고', '환불', '개인정보', '책임제한', '자동결제')
 * @returns {Promise<Object>} 분석 결과 (summary, termsSummary, unfairClauses, recommendations)
 */
export const analyzeTerms = async (termsText, category) => {
  try {
    const response = await fetch(`${API_BASE_URL}/terms_analyze`, {
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
    return data;
  } catch (error) {
    console.error('약관 분석 중 오류 발생:', error);
    throw error;
  }
};

/**
 * 파일로부터 약관 분석 (소비자용)
 *
 * @param {File} file - 약관 텍스트가 포함된 파일
 * @param {string} category - 약관 카테고리 ('광고', '환불', '개인정보', '책임제한', '자동결제')
 * @returns {Promise<Object>} 분석 결과
 */
export const analyzeTermsFromFile = async (file, category) => {
  try {
    if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('category', category);

      const response = await fetch(`${API_BASE_URL}/terms_analyze/pdf`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`PDF 분석 실패: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    }

    const text = await readFileAsText(file);
    return analyzeTerms(text, category);
  } catch (error) {
    console.error('파일 분석 중 오류 발생:', error);
    throw error;
  }
};

/**
 * 파일을 텍스트로 읽기
 *
 * @param {File} file - 읽을 파일
 * @returns {Promise<string>} 파일 내용 (텍스트)
 */
const readFileAsText = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (e) => reject(e);
    reader.readAsText(file);
  });
};

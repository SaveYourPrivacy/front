// 백엔드 API URL 설정
const API_BASE_URL = 'http://localhost:8000';

/**
 * Analyzes terms text for unfair clauses
 * @param {string} termsText - The terms text to analyze
 * @param {string} category - The category of terms (optional)
 * @returns {Promise} Analysis result containing:
 *   - summary: {title, overview, totalClauses, unfairCount, riskLevel}
 *   - termsSummary: {mainPoints, keyRights, keyObligations}
 *   - unfairClauses: array of unfair clause objects
 *   - recommendations: array of recommendation strings
 */
export const analyzeTerms = async (termsText, category = '기타') => {
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
 * Uploads and analyzes terms from a file
 * @param {File} file - The file containing terms text
 * @param {string} category - The category of terms (optional)
 * @returns {Promise} Analysis result
 */
export const analyzeTermsFromFile = async (file, category) => {
  // Read file content
  const text = await readFileAsText(file);

  // Analyze the text with category
  return analyzeTerms(text, category);

  // When backend supports direct file upload, use this instead:
  /*
  const formData = new FormData();
  formData.append('file', file);
  if (category) {
    formData.append('category', category);
  }

  try {
    const response = await fetch('YOUR_API_ENDPOINT/analyze-file', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('File analysis failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error analyzing file:', error);
    throw error;
  }
  */
};

/**
 * Helper function to read file as text
 * @param {File} file - The file to read
 * @returns {Promise<string>} File content as text
 */
const readFileAsText = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (e) => reject(e);
    reader.readAsText(file);
  });
};

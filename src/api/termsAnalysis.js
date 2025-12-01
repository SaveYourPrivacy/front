import { sampleAnalysisResult } from '../mock/dummyData';

/**
 * Analyzes terms text for unfair clauses
 * @param {string} termsText - The terms text to analyze
 * @returns {Promise} Analysis result containing:
 *   - summary: {title, overview, totalClauses, unfairCount, riskLevel}
 *   - termsSummary: {mainPoints, keyRights, keyObligations}
 *   - unfairClauses: array of unfair clause objects
 *   - recommendations: array of recommendation strings
 */
export const analyzeTerms = async (termsText) => {
  // For development: using dummy data
  // Remove this block and uncomment the API call when backend is ready
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(termsText);
      resolve(sampleAnalysisResult);
    }, 1500); // Simulate network delay
  });

  // Uncomment this block when backend API is ready
  /*
  try {
    const response = await fetch('YOUR_API_ENDPOINT/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ terms: termsText }),
    });

    if (!response.ok) {
      throw new Error('Analysis failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error analyzing terms:', error);
    throw error;
  }
  */
};

/**
 * Uploads and analyzes terms from a file
 * @param {File} file - The file containing terms text
 * @returns {Promise} Analysis result
 */
export const analyzeTermsFromFile = async (file) => {
  // Read file content
  const text = await readFileAsText(file);

  // Analyze the text
  return analyzeTerms(text);

  // When backend supports direct file upload, use this instead:
  /*
  const formData = new FormData();
  formData.append('file', file);

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

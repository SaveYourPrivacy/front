/**
 * Generates a complaint email template based on analysis results
 * @param {object} analysisResult - The analysis result containing unfair clauses
 * @returns {Promise} Email template containing:
 *   - subject: string - Email subject
 *   - body: string - Email body content
 */
export const generateComplaintEmail = async (analysisResult) => {
  // For development: Generate email from analysis result with delay
  // Remove this block and uncomment the API call when backend is ready
  return new Promise((resolve) => {
    setTimeout(() => {
      const { summary, unfairClauses, recommendations } = analysisResult;

      // Email subject
      const subject = `약관 내 불공정 조항에 대한 개선 요청`;

      // Email body
      let body = `안녕하십니까.

귀사의 서비스 이용약관을 검토한 결과, 소비자에게 불리한 조항이 발견되어 이에 대한 개선을 요청드리고자 합니다.

[약관 분석 결과]
- 전체 조항 수: ${summary.totalClauses}개
- 불공정 조항 수: ${summary.unfairCount}개
- 위험도: ${summary.riskLevel}

${summary.overview}

[발견된 불공정 조항]
`;

      // Add each unfair clause
      unfairClauses.forEach((clause, index) => {
        body += `\n${index + 1}. ${clause.clauseNumber}\n`;
        body += `원문: "${clause.text}"\n\n`;

        clause.issues.forEach((issue) => {
          body += `문제점: ${issue.description}\n`;
          body += `관련 법령: ${issue.relatedLaw}\n`;
          body += `심각도: ${issue.severity}\n\n`;
        });
      });

      // Add recommendations
      body += `[개선 요청 사항]\n`;
      recommendations.forEach((rec, index) => {
        body += `${index + 1}. ${rec}\n`;
      });

      body += `\n위와 같은 불공정 조항은 약관의 규제에 관한 법률 및 관련 소비자 보호법에 위배될 소지가 있습니다. 소비자의 권익 보호와 공정한 거래 질서 확립을 위해 해당 조항들을 개선해 주시기를 요청드립니다.

회신 기한: 본 메일 수신 후 14일 이내
회신 방법: 이메일 또는 서면

감사합니다.`;

      resolve({ subject, body });
    }, 800); // Simulate network delay
  });

  // Uncomment this block when backend API is ready
  /*
  try {
    const response = await fetch('YOUR_API_ENDPOINT/generate-complaint-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ analysisResult }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate complaint email');
    }

    const data = await response.json();
    return data; // Expected: { subject: string, body: string }
  } catch (error) {
    console.error('Error generating complaint email:', error);
    throw error;
  }
  */
};

/**
 * Sends a question about the analyzed terms and receives an answer
 * @param {string} questionText - The question to ask
 * @param {object} analysisContext - The analysis result context for better answers
 * @returns {Promise<string>} The answer to the question
 */
// eslint-disable-next-line no-unused-vars
export const askQuestion = async (questionText, analysisContext = null) => {
  // For development: using dummy data with simulated delay
  // Remove this block and uncomment the API call when backend is ready
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate a dummy answer based on the question
      const dummyAnswers = [
        "해당 조항은 약관의 규제에 관한 법률 제6조에 의해 소비자에게 부당하게 불리한 조항으로 간주될 수 있습니다. 특히 사업자의 책임을 과도하게 제한하거나 소비자의 권리를 부당하게 침해하는 경우 무효로 판단될 수 있습니다.",
        "이 약관 조항은 개인정보 보호법 제17조 및 제18조에 따라 문제가 될 수 있습니다. 개인정보를 제3자에게 제공하기 위해서는 정보주체의 별도 동의가 필요하며, 제공받는 자, 제공 목적, 제공 항목 등을 명확히 고지해야 합니다.",
        "약관 변경에 관한 조항은 약관의 규제에 관한 법률 제4조를 위반할 가능성이 있습니다. 약관을 변경할 경우 그 시행일 7일 이전부터 적용일 이후 상당한 기간 동안 변경 내용을 계속적으로 게시하여야 하며, 소비자에게 불리한 변경의 경우 최소 30일 이전에 공지해야 합니다.",
        "면책 조항이 지나치게 포괄적인 경우 약관의 규제에 관한 법률 제7조에 의해 무효가 될 수 있습니다. 사업자는 자신의 고의나 중대한 과실로 인한 법률상의 책임을 배제하거나 제한할 수 없으며, 이를 위반한 약관 조항은 효력이 없습니다.",
        "해당 조항에 대해서는 공정거래위원회의 표준약관을 참고하시는 것이 좋습니다. 또한, 한국소비자원의 약관 심사 서비스를 통해 전문적인 검토를 받으실 수 있습니다. 필요시 소비자상담센터(1372)에 문의하시면 더 자세한 상담을 받으실 수 있습니다."
      ];

      const randomAnswer = dummyAnswers[Math.floor(Math.random() * dummyAnswers.length)];
      resolve(randomAnswer);
    }, 2000); // Simulate network delay (2 seconds)
  });

  // Uncomment this block when backend API is ready
  /*
  try {
    const response = await fetch('YOUR_API_ENDPOINT/ask-question', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question: questionText,
        context: analysisContext // Send analysis context for better answers
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get answer');
    }

    const data = await response.json();
    return data.answer;
  } catch (error) {
    console.error('Error asking question:', error);
    throw error;
  }
  */
};

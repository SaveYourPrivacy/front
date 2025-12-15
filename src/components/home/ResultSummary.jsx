import '../../styles/home/resultSummary.css';

/**
 * ResultSummary Component
 *
 * 분석 요약 정보 및 주요 통계를 표시하는 컴포넌트
 *
 * @param {Object} summary - 요약 정보 (title, overview, totalClauses, unfairCount, riskLevel)
 * @param {Object} termsSummary - 약관 요약 (mainPoints, keyRights, keyObligations)
 */
function ResultSummary({ summary, termsSummary }) {
  /**
   * 위험도에 따른 CSS 클래스 반환
   */
  const getRiskClass = (riskLevel) => {
    if (riskLevel === '높음') return 'high-risk';
    if (riskLevel === '중간') return 'medium-risk';
    return 'low-risk';
  };

  return (
    <div className="result-summary">
      <h2 className="result-summary-title">{summary.title}</h2>
      <p className="result-summary-overview">{summary.overview}</p>

      <div className="result-summary-stats">
        <div className="result-summary-stat">
          <p className="result-summary-stat-label">전체 조항 수</p>
          <p className="result-summary-stat-value">{summary.totalClauses}개</p>
        </div>
        <div className="result-summary-stat">
          <p className="result-summary-stat-label">불공정 조항 수</p>
          <p className="result-summary-stat-value">{summary.unfairCount}개</p>
        </div>
        <div className="result-summary-stat">
          <p className="result-summary-stat-label">위험도</p>
          <p className={`result-summary-stat-value ${getRiskClass(summary.riskLevel)}`}>
            {summary.riskLevel}
          </p>
        </div>
      </div>

      {termsSummary && (
        <div className="terms-summary-section">
          <h3 className="terms-summary-subtitle">약관 분석 내용</h3>
          <div className="terms-summary-content">
            <div className="terms-summary-block">
              <h4 className="terms-summary-block-title">핵심 내용</h4>
              <ul className="terms-summary-list">
                {termsSummary.mainPoints.map((point, index) => (
                  <li key={index} className="terms-summary-item">{point}</li>
                ))}
              </ul>
            </div>

            <div className="terms-summary-block">
              <h4 className="terms-summary-block-title">주요 권리</h4>
              <ul className="terms-summary-list">
                {termsSummary.keyRights.map((right, index) => (
                  <li key={index} className="terms-summary-item">{right}</li>
                ))}
              </ul>
            </div>

            <div className="terms-summary-block">
              <h4 className="terms-summary-block-title">주요 의무</h4>
              <ul className="terms-summary-list">
                {termsSummary.keyObligations.map((obligation, index) => (
                  <li key={index} className="terms-summary-item">{obligation}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResultSummary;

import '../../styles/home/resultSummary.css';

/**
 * ResultSummary Component
 * Displays the analysis summary with key statistics
 *
 * Props:
 * - summary: object - Contains title, overview, totalClauses, unfairCount, riskLevel
 */
function ResultSummary({ summary }) {
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
    </div>
  );
}

export default ResultSummary;

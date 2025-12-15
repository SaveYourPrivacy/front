import '../../styles/home/unfairClauses.css';

/**
 * UnfairClauses Component
 *
 * 불공정 약관 상세 정보를 표시하는 컴포넌트
 *
 * @param {Array} unfairClauses - 불공정 조항 객체 배열
 * @param {Array} recommendations - 개선 권고사항 배열
 */
function UnfairClauses({ unfairClauses, recommendations }) {
  /**
   * 심각도에 따른 CSS 클래스 반환
   */
  const getSeverityClass = (severity) => {
    if (severity === '높음') return 'high';
    if (severity === '중간') return 'medium';
    return 'low';
  };

  /**
   * 여러 이슈 중 가장 높은 심각도 반환
   */
  const getHighestSeverity = (issues) => {
    const severityOrder = { '높음': 3, '중간': 2, '낮음': 1 };
    let highest = '낮음';
    let highestValue = 0;

    issues.forEach(issue => {
      const value = severityOrder[issue.severity] || 0;
      if (value > highestValue) {
        highestValue = value;
        highest = issue.severity;
      }
    });

    return highest;
  };

  return (
    <div className="unfair-clauses">
      <h2 className="unfair-clauses-title">불공정 약관 상세</h2>

      {unfairClauses.map((clause) => {
        const highestSeverity = getHighestSeverity(clause.issues);
        const severityClass = getSeverityClass(highestSeverity);

        return (
          <div key={clause.id} className={`unfair-clause-item severity-${severityClass}`}>
            <div className="unfair-clause-header">
              <p className="unfair-clause-number">{clause.clauseNumber}</p>
            </div>

            <p className="unfair-clause-text">{clause.text}</p>

            <div className="unfair-clause-issues">
              {clause.issues.map((issue, index) => (
                <div key={index} className="unfair-clause-issue">
                  <div className="unfair-clause-issue-header">
                    <p className="unfair-clause-issue-type">{issue.type}</p>
                    <span className={`unfair-clause-issue-severity severity-badge-${getSeverityClass(issue.severity)}`}>
                      {issue.severity}
                    </span>
                  </div>
                  <p className="unfair-clause-issue-description">
                    {issue.description}
                  </p>
                  <p className="unfair-clause-issue-law">
                    관련 법령: {issue.relatedLaw}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {recommendations && recommendations.length > 0 && (
        <div className="unfair-clauses-recommendations">
          <h3 className="unfair-clauses-recommendations-title">개선 권고사항</h3>
          <ul className="unfair-clauses-recommendations-list">
            {recommendations.map((recommendation, index) => (
              <li key={index} className="unfair-clauses-recommendations-item">
                {recommendation}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default UnfairClauses;

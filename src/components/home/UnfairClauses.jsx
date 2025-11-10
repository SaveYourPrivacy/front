import '../../styles/home/unfairClauses.css';

/**
 * UnfairClauses Component
 * Displays detailed information about unfair clauses found in the terms
 *
 * Props:
 * - unfairClauses: array - List of unfair clause objects
 * - recommendations: array - List of recommendation strings
 */
function UnfairClauses({ unfairClauses, recommendations }) {
  return (
    <div className="unfair-clauses">
      <h2 className="unfair-clauses-title">불공정 약관 상세</h2>

      {unfairClauses.map((clause) => (
        <div key={clause.id} className="unfair-clause-item">
          <div className="unfair-clause-header">
            <p className="unfair-clause-number">{clause.clauseNumber}</p>
          </div>

          <p className="unfair-clause-text">{clause.text}</p>

          <div className="unfair-clause-issues">
            {clause.issues.map((issue, index) => (
              <div key={index} className="unfair-clause-issue">
                <div className="unfair-clause-issue-header">
                  <p className="unfair-clause-issue-type">{issue.type}</p>
                  <span className="unfair-clause-issue-severity">
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
      ))}

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

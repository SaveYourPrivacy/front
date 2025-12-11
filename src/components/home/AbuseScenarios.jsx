import '../../styles/home/abuseScenarios.css';

/**
 * AbuseScenarios Component
 * Displays potential abuse scenarios based on identified vulnerabilities
 *
 * Props:
 * - abuseScenarios: array - List of abuse scenario objects
 */
function AbuseScenarios({ abuseScenarios }) {
  if (!abuseScenarios || abuseScenarios.length === 0) {
    return null;
  }

  const getSeverityClass = (severity) => {
    if (severity === '높음') return 'high';
    if (severity === '중간') return 'medium';
    return 'low';
  };

  return (
    <div className="abuse-scenarios">
      <h2 className="abuse-scenarios-title">악용 시나리오</h2>
      <p className="abuse-scenarios-description">
        발견된 취약점이 실제로 어떻게 악용될 수 있는지 시나리오를 제시합니다
      </p>

      {abuseScenarios.map((scenario, index) => {
        const severityClass = getSeverityClass(scenario.severity);

        return (
          <div key={index} className={`abuse-scenario-item severity-${severityClass}`}>
            <div className="abuse-scenario-header">
              <h3 className="abuse-scenario-title">{scenario.title}</h3>
              <span className={`abuse-scenario-severity severity-badge-${severityClass}`}>
                {scenario.severity}
              </span>
            </div>

            <div className="abuse-scenario-content">
              <div className="abuse-scenario-section">
                <h4 className="abuse-scenario-section-title">시나리오</h4>
                <p className="abuse-scenario-section-text">{scenario.scenario}</p>
              </div>

              {scenario.relatedClauses && scenario.relatedClauses.length > 0 && (
                <div className="abuse-scenario-section">
                  <h4 className="abuse-scenario-section-title">관련 약관</h4>
                  <ul className="abuse-scenario-clauses-list">
                    {scenario.relatedClauses.map((clause, idx) => (
                      <li key={idx} className="abuse-scenario-clause-item">
                        {clause}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="abuse-scenario-section">
                <h4 className="abuse-scenario-section-title">예상 피해</h4>
                <p className="abuse-scenario-section-text">{scenario.potentialDamage}</p>
              </div>

              {scenario.preventionMeasures && (
                <div className="abuse-scenario-section">
                  <h4 className="abuse-scenario-section-title">예방 조치</h4>
                  <p className="abuse-scenario-section-text">{scenario.preventionMeasures}</p>
                </div>
              )}

              {scenario.realCases && scenario.realCases.length > 0 && (
                <div className="abuse-scenario-section">
                  <h4 className="abuse-scenario-section-title">실제 사례</h4>
                  <ul className="abuse-scenario-cases-list">
                    {scenario.realCases.map((realCase, idx) => (
                      <li key={idx} className="abuse-scenario-case-item">
                        <a
                          href={realCase.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="abuse-scenario-case-link"
                        >
                          {realCase.title}
                        </a>
                        {realCase.description && (
                          <span className="abuse-scenario-case-description">
                            {realCase.description}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AbuseScenarios;

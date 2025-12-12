import '../../styles/home/abuseScenarios.css';

/**
 * AbuseScenarios Component
 * Displays analysis scenarios with similar real cases
 *
 * Props:
 * - abuseScenarios: array - List of scenario objects from analysis with real cases
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
      <h2 className="abuse-scenarios-title">악용 시나리오 분석</h2>
      <p className="abuse-scenarios-description">
        분석 결과를 바탕으로 도출된 악용 시나리오와 유사한 실제 사례를 제시합니다
      </p>

      {abuseScenarios.map((scenario, index) => {
        const severityClass = getSeverityClass(scenario.severity);

        return (
          <div key={index} className={`abuse-scenario-item severity-${severityClass}`}>
            <div className="abuse-scenario-header">
              <h3 className="abuse-scenario-title">{scenario.title}</h3>
              <span className={`abuse-scenario-severity severity-badge-${severityClass}`}>
                위험도: {scenario.severity}
              </span>
            </div>

            <div className="abuse-scenario-content">
              {/* Analysis Scenario Section */}
              <div className="abuse-scenario-analysis">
                <div className="abuse-scenario-section">
                  <h4 className="abuse-scenario-section-title">악용 시나리오</h4>
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
              </div>

              {/* Similar Real Cases Section */}
              {scenario.realCases && scenario.realCases.length > 0 && (
                <div className="abuse-scenario-real-cases">
                  <h4 className="abuse-scenario-real-cases-title">유사한 실제 사례</h4>
                  <div className="abuse-scenario-cases-grid">
                    {scenario.realCases.map((realCase, idx) => (
                      <div key={idx} className="abuse-scenario-case-card">
                        <a
                          href={realCase.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="abuse-scenario-case-link"
                        >
                          <div className="abuse-scenario-case-title">{realCase.title}</div>
                          {realCase.description && (
                            <div className="abuse-scenario-case-description">
                              {realCase.description}
                            </div>
                          )}
                          <div className="abuse-scenario-case-icon">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                        </a>
                      </div>
                    ))}
                  </div>
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

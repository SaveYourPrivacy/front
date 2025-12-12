import { useState, useEffect } from 'react';
import '../../styles/home/abuseScenarios.css';
import { fetchSimilarCases } from '../../api/similarCases';

/**
 * AbuseScenarios Component
 * Displays worst scenario and fetches similar real cases from API
 * Now with caching - prevents duplicate API calls
 *
 * Props:
 * - worstScenario: string - Worst scenario text from analysis result
 * - similarCases: array - Cached similar cases from parent
 * - setSimilarCases: function - Setter for similar cases in parent
 */
function AbuseScenarios({ worstScenario, similarCases, setSimilarCases }) {
  const [realCases, setRealCases] = useState([]);
  const [isLoadingCases, setIsLoadingCases] = useState(false);

  // Fetch similar real cases when worst scenario is provided (with caching)
  useEffect(() => {
    const loadSimilarCases = async () => {
      if (!worstScenario) {
        return;
      }

      // Skip if already loaded (check cached similarCases from parent)
      if (similarCases) {
        setRealCases(similarCases);
        return;
      }

      setIsLoadingCases(true);
      try {
        // Pass worst scenario text to API
        const cases = await fetchSimilarCases(worstScenario);
        setRealCases(cases);
        // Cache the result in parent
        if (setSimilarCases) {
          setSimilarCases(cases);
        }
      } catch (error) {
        console.error('Failed to load similar cases:', error);
        setRealCases([]);
      } finally {
        setIsLoadingCases(false);
      }
    };

    loadSimilarCases();
  }, [worstScenario, similarCases, setSimilarCases]);

  if (!worstScenario) {
    return null;
  }

  return (
    <div className="abuse-scenarios">
      <h2 className="abuse-scenarios-title">악용 시나리오 분석</h2>
      <p className="abuse-scenarios-description">
        분석 결과를 바탕으로 도출된 악용 시나리오와 유사한 실제 사례를 제시합니다
      </p>

      <div className="abuse-scenario-single">
        {/* Scenario Section */}
        <div className="abuse-scenario-content-section">
          <h3 className="abuse-scenario-content-title">시나리오</h3>
          <p className="abuse-scenario-text">{worstScenario}</p>
        </div>

        {/* Similar Real Cases Section */}
        <div className="abuse-scenario-cases-section">
          <h3 className="abuse-scenario-content-title">유사한 실제 사례</h3>

          {isLoadingCases ? (
            <div className="abuse-scenario-cases-loading">
              <div className="abuse-scenario-loading-spinner"></div>
              <p>유사 사례를 검색하고 있습니다...</p>
            </div>
          ) : realCases && realCases.length > 0 ? (
            <div className="abuse-scenario-cases-list">
              {realCases.map((realCase, idx) => (
                <div key={idx} className="abuse-scenario-case-item">
                  <a
                    href={realCase.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="abuse-scenario-case-link"
                  >
                    <div className="abuse-scenario-case-header">
                      <span className="abuse-scenario-case-title">{realCase.title}</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="abuse-scenario-case-icon">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    {realCase.description && (
                      <p className="abuse-scenario-case-description">{realCase.description}</p>
                    )}
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="abuse-scenario-cases-empty">
              <p>유사한 실제 사례를 찾지 못했습니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AbuseScenarios;

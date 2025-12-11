import '../../styles/home/analysisResult.css';
import ResultSummary from './ResultSummary';
import UnfairClauses from './UnfairClauses';
import AbuseScenarios from './AbuseScenarios';

/**
 * AnalysisResult Component
 * Main container for displaying analysis results with loading and error states
 *
 * Props:
 * - result: object - Analysis result data (summary, unfairClauses, recommendations)
 * - isLoading: boolean - Shows loading spinner
 * - error: string - Error message to display
 */
function AnalysisResult({ result, isLoading, error }) {
  if (isLoading) {
    return (
      <div className="analysis-result-container">
        <div className="analysis-result-loading">
          <div className="analysis-result-spinner"></div>
          <p>약관을 분석하고 있습니다...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="analysis-result-container">
        <div className="analysis-result-error">
          <h3 className="analysis-result-error-title">분석 중 오류가 발생했습니다</h3>
          <p className="analysis-result-error-message">{error}</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return null;
  }

  return (
    <div className="analysis-result-container">
      <ResultSummary summary={result.summary} termsSummary={result.termsSummary} />
      <UnfairClauses
        unfairClauses={result.unfairClauses}
        recommendations={result.recommendations}
      />
      <AbuseScenarios abuseScenarios={result.abuseScenarios} />
    </div>
  );
}

export default AnalysisResult;

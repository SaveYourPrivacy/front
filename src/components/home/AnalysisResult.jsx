import '../../styles/home/analysisResult.css';
import ResultSummary from './ResultSummary';
import UnfairClauses from './UnfairClauses';

/**
 * AnalysisResult Component
 *
 * 분석 결과를 표시하는 메인 컨테이너 (로딩 및 에러 상태 처리 포함)
 *
 * @param {Object} result - 분석 결과 데이터 (summary, unfairClauses, recommendations)
 * @param {boolean} isLoading - 로딩 스피너 표시 여부
 * @param {string} error - 에러 메시지
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
    </div>
  );
}

export default AnalysisResult;

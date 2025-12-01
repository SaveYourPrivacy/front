import { useState } from 'react';
import TermsInput from '../components/home/TermsInput';
import AnalysisResult from '../components/home/AnalysisResult';
import { analyzeBusinessTerms, analyzeBusinessTermsFromFile } from '../api/businessAnalysis';

function BusinessAnalysis() {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async (input, type) => {
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      let result;
      if (type === 'text') {
        result = await analyzeBusinessTerms(input);
      } else {
        result = await analyzeBusinessTermsFromFile(input);
      }
      setAnalysisResult(result);
    } catch (err) {
      setError(err.message || '분석 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem' }}>
          기업용 약관 분석
        </h2>
        <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
          약관의 취약점과 악용 가능성을 분석합니다
        </p>
      </div>
      <TermsInput onAnalyze={handleAnalyze} isLoading={isLoading} />
      <AnalysisResult result={analysisResult} isLoading={isLoading} error={error} />
    </div>
  );
}

export default BusinessAnalysis;

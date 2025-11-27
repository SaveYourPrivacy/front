import { useState } from 'react';
import TermsInput from '../components/home/TermsInput';
import AnalysisResult from '../components/home/AnalysisResult';
import { analyzeTerms, analyzeTermsFromFile } from '../api/termsAnalysis';

function Home() {
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
        result = await analyzeTerms(input);
      } else {
        result = await analyzeTermsFromFile(input);
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
 <TermsInput onAnalyze={handleAnalyze} isLoading={isLoading} /> 
 <AnalysisResult result={analysisResult} isLoading={isLoading} error={error} /> 
 </div> 
 ); 
}

export default Home;

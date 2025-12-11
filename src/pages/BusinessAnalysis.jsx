import { useState } from 'react';
import TermsInput from '../components/home/TermsInput';
import ResultTabs from '../components/home/ResultTabs';
import { analyzeBusinessTerms, analyzeBusinessTermsFromFile } from '../api/businessAnalysis';
import { askQuestion } from '../api/questionAnswer';

function BusinessAnalysis() {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [isLoadingQuestion, setIsLoadingQuestion] = useState(false);

  const handleAnalyze = async (input, type) => {
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);
    setQuestions([]); // Reset questions when analyzing new terms

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

  const handleAskQuestion = async (questionText) => {
    const newQuestion = {
      id: Date.now().toString(),
      question: questionText,
      answer: null,
      timestamp: new Date(),
      isAnswering: true
    };

    setQuestions(prev => [newQuestion, ...prev]);
    setIsLoadingQuestion(true);

    try {
      const answer = await askQuestion(questionText, analysisResult);

      setQuestions(prev => prev.map(q =>
        q.id === newQuestion.id
          ? { ...q, answer: answer, isAnswering: false }
          : q
      ));
    } catch (err) {
      console.error('Error asking question:', err);
      setQuestions(prev => prev.map(q =>
        q.id === newQuestion.id
          ? { ...q, answer: '답변을 가져오는 중 오류가 발생했습니다. 다시 시도해주세요.', isAnswering: false }
          : q
      ));
    } finally {
      setIsLoadingQuestion(false);
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
      <ResultTabs
        analysisResult={analysisResult}
        isLoading={isLoading}
        error={error}
        questions={questions}
        onAskQuestion={handleAskQuestion}
        isLoadingQuestion={isLoadingQuestion}
        showEmailTab={false}
      />
    </div>
  );
}

export default BusinessAnalysis;

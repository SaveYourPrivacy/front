import { useState } from 'react';
import TermsInput from '../components/home/TermsInput';
import ResultTabs from '../components/home/ResultTabs';
import { analyzeBusinessTerms, analyzeBusinessTermsFromFile } from '../api/businessAnalysis';
import { askQuestion } from '../api/questionAnswer';

/**
 * BusinessAnalysis Page Component (기업용)
 *
 * 기업을 위한 약관 분석 페이지
 * 약관 입력, 분석 결과 표시, 악용 시나리오, 유사 사례, 질의응답 기능 제공
 */
function BusinessAnalysis() {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [isLoadingQuestion, setIsLoadingQuestion] = useState(false);
  const [similarCases, setSimilarCases] = useState(null);

  /**
   * 약관 분석 핸들러
   */
  const handleAnalyze = async (input, type, category) => {
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);
    setQuestions([]);
    setSimilarCases(null);

    try {
      let result;
      if (type === 'text') {
        result = await analyzeBusinessTerms(input, category);
      } else {
        result = await analyzeBusinessTermsFromFile(input, category);
      }
      setAnalysisResult(result);
    } catch (err) {
      setError(err.message || '분석 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 질문 처리 핸들러
   */
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
      const answer = await askQuestion(questionText, analysisResult?.session_id);

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
        showScenariosTab={true}
        similarCases={similarCases}
        setSimilarCases={setSimilarCases}
      />
    </div>
  );
}

export default BusinessAnalysis;

import { useState } from 'react';
import TermsInput from '../components/home/TermsInput';
import ResultTabs from '../components/home/ResultTabs';
import { analyzeTerms, analyzeTermsFromFile } from '../api/termsAnalysis';
import { askQuestion } from '../api/questionAnswer';

/**
 * Home Page Component (소비자용)
 *
 * 소비자를 위한 약관 분석 페이지
 * 약관 입력, 분석 결과 표시, 질의응답, 컴플레인 메일 템플릿 생성 기능 제공
 */
function Home() {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [isLoadingQuestion, setIsLoadingQuestion] = useState(false);
  const [emailContent, setEmailContent] = useState(null);

  /**
   * 약관 분석 핸들러
   */
  const handleAnalyze = async (input, type, category) => {
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);
    setQuestions([]);
    setEmailContent(null);

    try {
      let result;
      if (type === 'text') {
        result = await analyzeTerms(input, category);
      } else {
        result = await analyzeTermsFromFile(input, category);
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
     소비자용 약관 분석
   </h2>
   <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
     AI가 약관의 불공정 조항을 찾아드립니다
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
   emailContent={emailContent}
   setEmailContent={setEmailContent}
 />
 </div>
 );
}

export default Home;

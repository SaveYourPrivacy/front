import { useState } from 'react';
import TermsInput from '../components/home/TermsInput';
import AnalysisResult from '../components/home/AnalysisResult';
import ComplaintEmailTemplate from '../components/home/ComplaintEmailTemplate';
import QuestionBoard from '../components/home/QuestionBoard';
import { analyzeTerms, analyzeTermsFromFile } from '../api/termsAnalysis';
import { askQuestion } from '../api/questionAnswer';

function Home() {
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
 <TermsInput onAnalyze={handleAnalyze} isLoading={isLoading} />
 <AnalysisResult result={analysisResult} isLoading={isLoading} error={error} />
 {analysisResult && (
   <>
     <ComplaintEmailTemplate analysisResult={analysisResult} />
     <QuestionBoard
       onAskQuestion={handleAskQuestion}
       questions={questions}
       isLoading={isLoadingQuestion}
     />
   </>
 )}
 </div>
 );
}

export default Home;

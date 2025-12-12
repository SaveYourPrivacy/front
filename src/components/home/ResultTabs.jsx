import { useState } from 'react';
import '../../styles/home/resultTabs.css';
import AnalysisResult from './AnalysisResult';
import ComplaintEmailTemplate from './ComplaintEmailTemplate';
import QuestionBoard from './QuestionBoard';
import AbuseScenarios from './AbuseScenarios';

/**
 * ResultTabs Component
 * Displays analysis results in tabs to reduce API calls and improve performance
 *
 * Props:
 * - analysisResult: object - Analysis result data
 * - isLoading: boolean - Shows loading spinner
 * - error: string - Error message to display
 * - questions: array - List of questions and answers
 * - onAskQuestion: function - Handler for asking questions
 * - isLoadingQuestion: boolean - Loading state for questions
 * - emailContent: object - Cached email content (optional, for consumer only)
 * - setEmailContent: function - Setter for email content (optional, for consumer only)
 * - showEmailTab: boolean - Whether to show email template tab (default: true)
 * - showScenariosTab: boolean - Whether to show abuse scenarios tab (default: false)
 * - similarCases: array - Cached similar cases (optional, for business only)
 * - setSimilarCases: function - Setter for similar cases (optional, for business only)
 */
function ResultTabs({
  analysisResult,
  isLoading,
  error,
  questions,
  onAskQuestion,
  isLoadingQuestion,
  emailContent,
  setEmailContent,
  showEmailTab = true,
  showScenariosTab = false,
  similarCases,
  setSimilarCases
}) {
  const [activeTab, setActiveTab] = useState('analysis'); // 'analysis', 'scenarios', 'email', 'questions'

  if (isLoading || error || !analysisResult) {
    return (
      <AnalysisResult
        result={analysisResult}
        isLoading={isLoading}
        error={error}
      />
    );
  }

  return (
    <div className="result-tabs-container">
      <div className="result-tabs-header">
        <button
          className={`result-tab ${activeTab === 'analysis' ? 'active' : ''}`}
          onClick={() => setActiveTab('analysis')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M9 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M9 16H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          분석 결과
        </button>
        {showScenariosTab && (
          <button
            className={`result-tab ${activeTab === 'scenarios' ? 'active' : ''}`}
            onClick={() => setActiveTab('scenarios')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 9V11M12 15H12.01M5.07183 19H18.9282C20.4678 19 21.4301 17.3333 20.6603 16L13.7321 4C12.9623 2.66667 11.0377 2.66667 10.2679 4L3.33975 16C2.56995 17.3333 3.53223 19 5.07183 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            악용 시나리오
          </button>
        )}
        {showEmailTab && (
          <button
            className={`result-tab ${activeTab === 'email' ? 'active' : ''}`}
            onClick={() => setActiveTab('email')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 8L10.89 13.26C11.5639 13.7197 12.4361 13.7197 13.11 13.26L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            민원 메일
          </button>
        )}
        <button
          className={`result-tab ${activeTab === 'questions' ? 'active' : ''}`}
          onClick={() => setActiveTab('questions')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 9H16M8 13H14M6 21H18C19.1046 21 20 20.1046 20 19V5C20 3.89543 19.1046 3 18 3H6C4.89543 3 4 3.89543 4 5V19C4 20.1046 4.89543 21 6 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          질의응답
          {questions.length > 0 && (
            <span className="result-tab-badge">{questions.length}</span>
          )}
        </button>
      </div>

      <div className="result-tabs-content">
        {activeTab === 'analysis' && (
          <AnalysisResult
            result={analysisResult}
            isLoading={false}
            error={null}
          />
        )}

        {activeTab === 'scenarios' && showScenariosTab && (
          <AbuseScenarios
            worstScenario={analysisResult.worstScenario}
            similarCases={similarCases}
            setSimilarCases={setSimilarCases}
          />
        )}

        {activeTab === 'email' && showEmailTab && (
          <ComplaintEmailTemplate
            analysisResult={analysisResult}
            emailContent={emailContent}
            setEmailContent={setEmailContent}
          />
        )}

        {activeTab === 'questions' && (
          <QuestionBoard
            onAskQuestion={onAskQuestion}
            questions={questions}
            isLoading={isLoadingQuestion}
          />
        )}
      </div>
    </div>
  );
}

export default ResultTabs;

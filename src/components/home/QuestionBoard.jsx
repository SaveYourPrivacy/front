import { useState } from 'react';
import '../../styles/home/questionBoard.css';

/**
 * QuestionBoard Component
 *
 * Displays a question and answer board where users can ask additional questions
 * about analyzed terms and view previous Q&As.
 *
 * @param {Function} onAskQuestion - Callback function when user submits a question
 * @param {Array} questions - Array of question objects with structure:
 *   [{id: string, question: string, answer: string|null, timestamp: Date, isAnswering: boolean}]
 * @param {boolean} isLoading - Loading state while submitting a question
 */
function QuestionBoard({ onAskQuestion, questions = [], isLoading = false }) {
  const [questionText, setQuestionText] = useState('');

  /**
   * 질문 제출 핸들러
   */
  const handleSubmit = () => {
    if (!questionText.trim() || isLoading) return;

    onAskQuestion(questionText.trim());
    setQuestionText('');
  };

  /**
   * 키보드 단축키 핸들러 (Ctrl/Cmd + Enter)
   */
  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleSubmit();
    }
  };

  /**
   * 타임스탬프를 상대 시간으로 포맷
   */
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';

    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return '방금 전';
    if (diffMins < 60) return `${diffMins}분 전`;
    if (diffHours < 24) return `${diffHours}시간 전`;
    if (diffDays < 7) return `${diffDays}일 전`;

    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="question-board">
      <h2 className="question-board-title">추가 질문</h2>
      <p className="question-board-description">
        분석 결과에 대해 궁금한 점이 있으시면 질문해주세요.
      </p>

      <div className="question-input-container">
        <textarea
          className="question-input-textarea"
          placeholder="예: 이 약관에서 가장 주의해야 할 조항은 무엇인가요?"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          aria-label="질문 입력"
        />
        <button
          className="question-submit-button"
          onClick={handleSubmit}
          disabled={!questionText.trim() || isLoading}
          aria-label="질문 제출"
        >
          {isLoading ? '질문 등록 중...' : '질문하기'}
        </button>
        <p className="question-input-hint">Ctrl + Enter로 빠르게 제출할 수 있습니다</p>
      </div>

      {questions.length === 0 ? (
        <div className="question-empty-state">
          <p className="question-empty-text">아직 질문이 없습니다.</p>
          <p className="question-empty-subtext">궁금한 점을 질문해보세요.</p>
        </div>
      ) : (
        <div className="question-list">
          {questions.map((item) => (
            <div key={item.id} className="question-item">
              <div className="question-header">
                <span className="question-label">Q</span>
                <span className="question-timestamp">{formatTimestamp(item.timestamp)}</span>
              </div>
              <p className="question-text">{item.question}</p>

              {item.isAnswering ? (
                <div className="answer-loading">
                  <div className="answer-loading-spinner"></div>
                  <span className="answer-loading-text">답변 대기 중...</span>
                </div>
              ) : item.answer ? (
                <div className="answer-container">
                  <div className="answer-header">
                    <span className="answer-label">A</span>
                  </div>
                  <p className="answer-text">{item.answer}</p>
                </div>
              ) : (
                <div className="answer-pending">
                  <span className="answer-pending-text">답변 대기 중...</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default QuestionBoard;

import { useState } from 'react';
import { askQuestion } from '../../api/termsAnalysis';
import '../../styles/home/QnASection.css';

function QnASection({ analysisResult }) {
    const [question, setQuestion] = useState('');
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!question.trim() || isLoading) return;

        const currentQuestion = question;
        setQuestion('');
        setIsLoading(true);

        // Add question to history immediately
        setHistory(prev => [...prev, { type: 'question', content: currentQuestion }]);

        try {
            const answer = await askQuestion(currentQuestion, analysisResult);
            setHistory(prev => [...prev, { type: 'answer', content: answer }]);
        } catch (error) {
            setHistory(prev => [...prev, { type: 'answer', content: '죄송합니다. 답변을 가져오는 중 오류가 발생했습니다.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    if (!analysisResult) return null;

    return (
        <div className="qna-section">
            <h2 className="qna-title">약관에 대해 궁금한 점이 있으신가요?</h2>

            <div className="qna-history" style={history.length === 0 ? { display: 'none' } : {}}>
                {history.map((item, index) => (
                    <div key={index} className={`qna-item`}>
                        <div className={`qna-${item.type}`}>
                            {item.content}
                        </div>
                    </div>
                ))}
                {isLoading && <div className="qna-loading">답변을 작성하고 있습니다...</div>}
            </div>

            <form onSubmit={handleSubmit} className="qna-input-form">
                <input
                    type="text"
                    className="qna-input"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="예: 환불 규정이 어떻게 되나요?"
                    disabled={isLoading}
                />
                <button type="submit" className="qna-submit-btn" disabled={isLoading || !question.trim()}>
                    질문하기
                </button>
            </form>
        </div>
    );
}

export default QnASection;

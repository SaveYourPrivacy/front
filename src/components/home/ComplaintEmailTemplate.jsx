import { useState, useEffect } from 'react';
import { generateComplaintEmail } from '../../api/complaintEmail';
import '../../styles/home/complaintEmailTemplate.css';

/**
 * ComplaintEmailTemplate Component
 *
 * 분석 결과 기반 컴플레인 메일 템플릿 생성 및 표시 (캐싱 지원)
 *
 * @param {Object} analysisResult - 약관 분석 결과 (summary, unfairClauses, recommendations)
 * @param {Object} emailContent - 부모로부터 캐시된 이메일 컨텐츠
 * @param {Function} setEmailContent - 이메일 컨텐츠 setter
 */
function ComplaintEmailTemplate({ analysisResult, emailContent, setEmailContent }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);

  /**
   * 이메일 컨텐츠를 API에서 가져오기 (캐싱 지원)
   */
  useEffect(() => {
    const fetchEmailContent = async () => {
      if (emailContent || !analysisResult) {
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const result = await generateComplaintEmail(analysisResult);
        setEmailContent(result);
      } catch (err) {
        setError(err.message || '메일 템플릿 생성에 실패했습니다.');
        console.error('Error generating email:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmailContent();
  }, [analysisResult, emailContent, setEmailContent]);

  /**
   * 이메일을 클립보드에 복사
   */
  const handleCopyEmail = async () => {
    if (!emailContent) return;

    const { subject, body } = emailContent;
    const fullEmail = `제목: ${subject}\n\n${body}`;

    try {
      await navigator.clipboard.writeText(fullEmail);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    } catch (err) {
      console.error('Failed to copy email:', err);
      alert('메일 복사에 실패했습니다. 다시 시도해주세요.');
    }
  };

  if (isLoading) {
    return (
      <div className="complaint-email-template">
        <div className="complaint-email-template-loading">
          <div className="complaint-email-template-spinner"></div>
          <p>컴플레인 메일 템플릿을 생성하고 있습니다...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="complaint-email-template">
        <div className="complaint-email-template-error">
          <h3 className="complaint-email-template-error-title">템플릿 생성 실패</h3>
          <p className="complaint-email-template-error-message">{error}</p>
        </div>
      </div>
    );
  }

  if (!emailContent) {
    return null;
  }

  const { subject, body } = emailContent;

  return (
    <div className="complaint-email-template">
      <div className="complaint-email-template-header">
        <h2 className="complaint-email-template-title">컴플레인 메일 템플릿</h2>
        <button
          className="complaint-email-template-copy-button"
          onClick={handleCopyEmail}
          aria-label="메일 복사하기"
        >
          메일 복사하기
        </button>
      </div>

      {copySuccess && (
        <div className="complaint-email-template-success" role="alert">
          메일이 클립보드에 복사되었습니다.
        </div>
      )}

      <div className="complaint-email-template-content">
        <div className="complaint-email-template-subject">
          <label className="complaint-email-template-label">제목</label>
          <div className="complaint-email-template-subject-text">
            {subject}
          </div>
        </div>

        <div className="complaint-email-template-body">
          <label className="complaint-email-template-label">본문</label>
          <pre className="complaint-email-template-body-text">
            {body}
          </pre>
        </div>
      </div>

      <div className="complaint-email-template-footer">
        <p className="complaint-email-template-footer-note">
          이 템플릿은 약관 분석 결과를 바탕으로 자동 생성되었습니다.
          실제 발송 전 내용을 검토하고 필요에 따라 수정하시기 바랍니다.
        </p>
      </div>
    </div>
  );
}

export default ComplaintEmailTemplate;

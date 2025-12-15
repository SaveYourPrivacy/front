import { useState } from 'react';
import '../../styles/home/termsInput.css';
import TermsCategorySelect from './TermsCategorySelect'; 

/**
 * TermsInput Component
 *
 * 약관 입력 컴포넌트 - 텍스트 직접 입력 또는 파일 업로드 지원
 *
 * @param {Function} onAnalyze - 분석 버튼 클릭 시 호출되는 콜백 (termsText, type, category)
 * @param {boolean} isLoading - 로딩 상태 (버튼 비활성화 및 텍스트 변경)
 */
function TermsInput({ onAnalyze, isLoading }) {
  const [activeTab, setActiveTab] = useState('text');
  const [termsText, setTermsText] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');

  /**
   * 파일 선택 핸들러 - PDF 파일만 허용
   */
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
        setSelectedFile(file);
      } else {
        alert('PDF 파일만 업로드할 수 있습니다.');
        e.target.value = '';
      }
    }
  };

  /**
   * 분석 버튼 클릭 핸들러
   */
  const handleAnalyze = () => {
    if (activeTab === 'text') {
      if (termsText.trim()) {
        onAnalyze(termsText, 'text', selectedCategory);
      }
    } else {
      if (selectedFile) {
        onAnalyze(selectedFile, 'file', selectedCategory);
      }
    }
  };

  /**
   * 분석 버튼 비활성화 여부 확인
   */
  const isButtonDisabled = () => {
    if (isLoading) return true;
    if (activeTab === 'text') return !termsText.trim();
    return !selectedFile;
  };

  return (
    <div className="terms-input-container">
      <TermsCategorySelect onSelect={setSelectedCategory} />
      <h2 className="terms-input-title">약관 입력</h2>

      <div className="terms-input-tabs">
        <button
          className={`terms-input-tab ${activeTab === 'text' ? 'active' : ''}`}
          onClick={() => setActiveTab('text')}
        >
          직접 입력
        </button>
        <button
          className={`terms-input-tab ${activeTab === 'file' ? 'active' : ''}`}
          onClick={() => setActiveTab('file')}
        >
          파일 업로드
        </button>
      </div>

      {activeTab === 'text' ? (
        <textarea
          className="terms-input-textarea"
          placeholder="약관 내용을 입력하세요..."
          value={termsText}
          onChange={(e) => setTermsText(e.target.value)}
        />
      ) : (
        <div className="terms-input-file-area">
          {!selectedFile ? (
            <>
              <input
                type="file"
                id="terms-file-input"
                className="terms-input-file-input"
                accept=".pdf,application/pdf"
                onChange={handleFileChange}
              />
              <label htmlFor="terms-file-input" className="terms-input-file-label">
                파일 선택
              </label>
              <p className="terms-input-file-info">
                PDF 파일만 업로드할 수 있습니다
              </p>
            </>
          ) : (
            <div className="terms-input-file-selected">
              <div className="terms-input-file-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" fill="#dc2626"/>
                  <path d="M14 2V8H20" fill="#b91c1c"/>
                  <text x="12" y="16" fontSize="6" fill="white" textAnchor="middle" fontWeight="bold">PDF</text>
                </svg>
              </div>
              <div className="terms-input-file-details">
                <p className="terms-input-file-name-styled">{selectedFile.name}</p>
                <p className="terms-input-file-size">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
              <button
                type="button"
                className="terms-input-file-remove"
                onClick={() => {
                  setSelectedFile(null);
                  document.getElementById('terms-file-input').value = '';
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
              <input
                type="file"
                id="terms-file-input"
                className="terms-input-file-input"
                accept=".pdf,application/pdf"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
            </div>
          )}
        </div>
      )}

      <button
        className="terms-input-button"
        onClick={handleAnalyze}
        disabled={isButtonDisabled()}
      >
        {isLoading ? '분석 중...' : '약관 분석하기'}
      </button>
    </div>
  );
}

export default TermsInput;

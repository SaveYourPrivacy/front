import { useState } from 'react';
import '../../styles/home/termsInput.css';
import { sampleTermsText } from '../../mock/dummyData';
import TermsCategorySelect from './TermsCategorySelect'; 

/**
 * TermsInput Component
 * Allows users to input terms text manually or upload a file
 *
 * Props:
 * - onAnalyze: function(termsText) - Called when analyze button is clicked
 * - isLoading: boolean - Shows loading state on button
 */
function TermsInput({ onAnalyze, isLoading }) {
  const [activeTab, setActiveTab] = useState('text'); // 'text' or 'file'
  const [termsText, setTermsText] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleAnalyze = () => {
    if (activeTab === 'text') {
      if (termsText.trim()) {
        onAnalyze(termsText, 'text');
      }
    } else {
      if (selectedFile) {
        onAnalyze(selectedFile, 'file');
      }
    }
  };

  const handleLoadSample = () => {
    setTermsText(sampleTermsText);
    setActiveTab('text');
  };

  const isButtonDisabled = () => {
    if (isLoading) return true;
    if (activeTab === 'text') return !termsText.trim();
    return !selectedFile;
  };

  return (
    <div className="terms-input-container">

      {/*약관 종류 선택 추가 */}
      <TermsCategorySelect onSelect={(value) => console.log('선택된 약관 종류:', value)} />
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
        <div>
          <textarea
            className="terms-input-textarea"
            placeholder="약관 내용을 입력하세요..."
            value={termsText}
            onChange={(e) => setTermsText(e.target.value)}
          />
          <button
            type="button"
            className="terms-input-button"
            onClick={handleLoadSample}
            style={{
              backgroundColor: '#ffffff',
              color: '#1f2937',
              border: '1px solid #d1d5db',
              marginTop: '0.5rem'
            }}
          >
            샘플 약관 불러오기
          </button>
        </div>
      ) : (
        <div className="terms-input-file-area">
          <input
            type="file"
            id="terms-file-input"
            className="terms-input-file-input"
            accept=".txt,.pdf,.doc,.docx"
            onChange={handleFileChange}
          />
          <label htmlFor="terms-file-input" className="terms-input-file-label">
            파일 선택
          </label>
          <p className="terms-input-file-info">
            TXT, PDF, DOC, DOCX 파일을 업로드할 수 있습니다
          </p>
          {selectedFile && (
            <p className="terms-input-file-name">
              선택된 파일: {selectedFile.name}
            </p>
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

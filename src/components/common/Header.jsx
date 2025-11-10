import '../../styles/common/header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div>
          <h1 className="header-title">불공정 약관 분석기</h1>
          <p className="header-subtitle">AI가 약관의 불공정 조항을 찾아드립니다</p>
        </div>
      </div>
    </header>
  );
}

export default Header;

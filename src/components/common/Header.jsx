import { Link, useLocation } from 'react-router-dom';
import '../../styles/common/header.css';

function Header() {
  const location = useLocation();
  const isConsumerPage = location.pathname === '/';
  const isBusinessPage = location.pathname === '/business';

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="header-title">불공정 약관 분석기</h1>
        <nav className="header-nav">
          <Link
            to="/"
            className={`header-nav-link ${isConsumerPage ? 'active' : ''}`}
          >
            소비자용
          </Link>
          <Link
            to="/business"
            className={`header-nav-link ${isBusinessPage ? 'active' : ''}`}
          >
            기업용
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;

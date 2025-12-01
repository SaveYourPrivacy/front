import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import ScrollToTop from './components/common/ScrollToTop';
import Home from './pages/Home';
import BusinessAnalysis from './pages/BusinessAnalysis';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/business" element={<BusinessAnalysis />} />
          </Routes>
        </main>
        <ScrollToTop />
      </div>
    </Router>
  );
}

export default App;

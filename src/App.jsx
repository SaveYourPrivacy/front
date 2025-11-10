import './App.css';
import Header from './components/common/Header';
import ScrollToTop from './components/common/ScrollToTop';
import Home from './pages/Home';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Home />
      </main>
      <ScrollToTop />
    </div>
  );
}

export default App;

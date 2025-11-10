import './App.css';
import Header from './components/common/Header';
import Home from './pages/Home';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Home />
      </main>
    </div>
  );
}

export default App;

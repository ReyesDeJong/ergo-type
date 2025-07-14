import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import KeyboardPreviewPage from './pages/KeyboardPreviewPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/keyboard/:id' element={<KeyboardPreviewPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

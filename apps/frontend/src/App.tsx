import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import KeyboardPreviewPage from './pages/KeyboardPreviewPage';
import Navbar from './components/Navbar';
import SignupPage from './pages/SignupPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/keyboard/:id' element={<KeyboardPreviewPage />} />
          <Route path='/signup' element={<SignupPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import './App.css';
import LoginForm from './components/LoginForm';
import Page from './components/Page';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from './context/AuthProvider';

function App() {
  return (
    <>
    <Router>
      <AuthProvider>
      <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/page" element={<Page />} />
    </Routes>
      </AuthProvider>
    </Router>
    </>
  );
}

export default App;

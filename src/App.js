import React from 'react';
import Navbar from './components/navbar2';
import Home from './pages/home';
import About from './pages/about';
import Footer from './components/footer';
import Chatbot from './components/chatbotCopy';
import { Routes, Route, useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();

  // Function to determine whether to show the footer or not
  const showFooter = () => {
    return location.pathname !== '/chatbot';
  };
  const showNavbar = () => {
    return location.pathname !== '/chatbot';
  };

  return (
    <>
      {showNavbar() && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/chatbot' element={<Chatbot />} />
      </Routes>
      {showFooter() && <Footer />}
    </>
  );
}

export default App;

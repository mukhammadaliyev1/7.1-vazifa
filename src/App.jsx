import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ButtonPagination from './components/ButtonPagination';
import ScrollPagination from './components/ScrollPagination';

function App() {
  return (
    <Router>
      <nav className='flex justify-between p-10'>
        <Link to="/" className='p-4 bg-blue-600 rounded-md text-white'>Button Pagination</Link> 
        <Link className='p-4 bg-blue-600 rounded-md text-white' to="/scroll-pagination">Scroll Pagination</Link>
      </nav>
      <Routes>
        <Route path="/" element={<ButtonPagination />} />
        <Route path="/scroll-pagination" element={<ScrollPagination />} />
      </Routes>
    </Router>
  );
}

export default App;

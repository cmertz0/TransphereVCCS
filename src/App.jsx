import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Search from './pages/Search';
import MyList from './pages/MyList';
import './App.css';

function App() {
  const [myList, setMyList] = useState([]);

  const addToList = (college) => {
    if (!myList.some(c => c.name === college.name)) {
      setMyList([...myList, college]);
    }
  };

  const removeFromList = (name) => {
    setMyList(myList.filter(c => c.name !== name));
  };

  return (
    <Router>
      <div className="app">
        <header className="navbar">
          <div className="navbar-inner">
            <div className="brand">TransphereVCCS</div>
            <nav className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/search">Search</Link>
              <Link to="/my-list">My List</Link>
            </nav>
          </div>
        </header>

        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/search" element={<Search addToList={addToList} list={myList} />} />
            <Route path="/my-list" element={<MyList list={myList} removeFromList={removeFromList} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Search from './pages/Search';
import MyList from './pages/MyList';
import './App.css';
import { auth, signIn, logOut, saveUserList, loadUserList } from './firebase';

function App() {
  const [user, setUser] = useState(null);
  const [myList, setMyList] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const savedList = await loadUserList(currentUser.uid);
        setMyList(savedList);
      } else {
        setUser(null);
        setMyList([]);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const addToList = async (college) => {
    if (!myList.some(c => c.name === college.name)) {
      const updatedList = [...myList, college];
      setMyList(updatedList);
      if (user) {
        await saveUserList(user.uid, updatedList);
      }
    }
  };

  const removeFromList = async (name) => {
    const updatedList = myList.filter(c => c.name !== name);
    setMyList(updatedList);
    if (user) {
      await saveUserList(user.uid, updatedList);
    }
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
            <div className="auth-section" ref={dropdownRef}>
              {user ? (
                <div className="profile-wrapper">
                  <img
                    src={user.photoURL}
                    alt="profile"
                    className="profile-pic"
                    onClick={() => setShowDropdown(!showDropdown)}
                  />
                  {showDropdown && (
                    <div className="profile-dropdown">
                      <p>{user.displayName}</p>
                      <p>{user.email}</p>
                      <button onClick={logOut}>Sign Out</button>
                    </div>
                  )}
                </div>
              ) : (
                <button onClick={signIn}>Sign in with Google</button>
              )}
            </div>
          </div>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/search" element={<Search addToList={addToList} myList={myList} />} />
            <Route path="/my-list" element={<MyList list={myList} removeFromList={removeFromList} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import CollegeList from './pages/CollegeList'

function App() {
  return (
    <Router>
      <div className="app">
      <header className="navbar">
  <div className="brand">TransphereVCCS</div>
  <nav className="nav-links">
    <Link to="/">Home</Link>
    <Link to="/about">About</Link>
    <Link to="/college-list">College List</Link>
  </nav>
</header>



        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/college-list" element={<CollegeList />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App


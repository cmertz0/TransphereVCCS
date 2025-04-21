import './Home.css';
import { Link } from 'react-router-dom';
import heroImage from '../assets/uva-campus.jpg';

function Home() {
  return (
    <div className="home-wrapper">
      <section
        className="hero-section"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="hero-content">
          <h1>Welcome to TransphereVCCS</h1>
          <p>
            A website for Virginia community college students looking to 
            use the Guaranteed Admissions Agreement to find their next college.
          </p>
          <div className="cta-container">
            <Link to="/search" className="hero-button">
              Explore Schools
            </Link>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step-card">
            <div className="emoji">🧮</div>
            <h3>Enter Your Stats</h3>
            <p>Track your GPA, major, credits, and degree progress in one place.</p>
          </div>
          <div className="step-card">
            <div className="emoji">🔍</div>
            <h3>Explore Colleges</h3>
            <p>Search and filter colleges based on your goals and distance preferences.</p>
          </div>
          <div className="step-card">
            <div className="emoji">📌</div>
            <h3>Build Your List</h3>
            <p>Add schools to your list and see if you meet the Guaranteed Admission Agreement.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;

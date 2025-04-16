import './Home.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <section className="hero">
      <div className="hero-overlay">
        <h1>Welcome to TransphereVCCS</h1>
        <p>
          A website for Virginia community college students studying computer science,
          looking to use the Guaranteed Admissions Agreement to find their next college.
        </p>
        <Link to="/Search" className="hero-button">
          Explore Schools
        </Link>
      </div>
    </section>
  );
}

export default Home;

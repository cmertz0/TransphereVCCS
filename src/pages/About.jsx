import "./About.css";
import aboutImage from "../assets/about-graphic.jpg"; // replace with your own image

function About() {
  return (
    <div className="about-wrapper">
      <div className="about-content">
        <div className="text-section">
          <h1>Why We Built This</h1>
          <p>
            As Virginia community college students, we recently went through the
            process of researching guaranteed admissions options for computer
            science. There wasn’t a centralized, clear resource to help us track
            requirements and eligibility — so we decided to build one.
          </p>
          <p>
            TransphereVCCS was created to help students like us explore colleges,
            track stats, and understand GAA requirements — all in one place.
          </p>
          <p>
            This project is also part of a larger learning journey. If you're
            interested in more of the technical or design side of this project,
            feel free to check out{" "}
            <a href="https://cmertz.dev" target="_blank" rel="noopener noreferrer">
              cmertz.dev
            </a>
            .
          </p>
        </div>
        <div className="image-section">
          <img src={aboutImage} alt="Visual of the site or concept" />
        </div>
      </div>
    </div>
  );
}

export default About;

import "../css/hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Smart Career Roadmap & Opportunity Platform</h1>

        <p>
          Find the right career path, learn new skills, track your progress, and
          discover internships and jobs.
        </p>

        <div className="hero-buttons">
          <button className="primary-btn">Explore Roadmaps</button>
          <button className="secondary-btn">Get Started</button>
        </div>
      </div>
    </section>
  );
}

export default Hero;

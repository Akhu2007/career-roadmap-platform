import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import careers from "../data/careers";
import CareerCard from "../components/CareerCard";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />

      <section className="career-section">
        <h1>Popular Career Paths</h1>

        <div className="career-container">
          {careers.map((career) => (
            <CareerCard
              key={career.id}
              title={career.title}
              skills={career.skills}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;

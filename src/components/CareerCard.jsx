import "../css/card.css";

function CareerCard({ title, skills }) {
  return (
    <div className="career-card">
      <h2>{title}</h2>
      <p>{skills}</p>
      <button>View Roadmap</button>
    </div>
  );
}

export default CareerCard;

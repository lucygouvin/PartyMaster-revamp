export default function FeatureCard({ feature }) {
  return (
    <div className="feature-card">
      {/* <img className="feature-icon" src={feature.image} alt={feature.alt} /> */}
      <div className="feature-text">
        <h2>{feature.title}</h2>
        <h3>{feature.subheading}</h3>
        <p>{feature.text}</p>
      </div>
    </div>
  );
}

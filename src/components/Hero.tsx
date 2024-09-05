import "./Header.css";

interface ContainerProps {}

const Hero: React.FC<ContainerProps> = () => {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1>Lease Logic</h1>
        <h2>
          The next generation of tenant landlord interactions. <br />
          No leasing fuss. Just comfort plus.
        </h2>
        {/* <button className="hero-button">Get Started</button> */}
      </div>
    </div>
  );
};

export default Hero;

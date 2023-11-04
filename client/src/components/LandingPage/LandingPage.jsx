import React, { useState } from 'react';
import '../../styles/LandingPage.css';

export function LandingPage(props) {
  const [isHovered, setIsHovered] = useState(false);
    return (
    <div className="landing-page">
      <header className="landing-header"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <h1 className={isHovered ? 'hide' : ''}>Welcome to PartyMaster</h1>
        <h1 className={isHovered ? '' : 'hide'}>Your go-to for planning and managing social events.</h1>
      </header>
      
      <main className="main-content">
      <section className="features-overview">
        <div className="feature">
          <h2>Plan Events Effortlessly</h2>
          <p>Create events, manage guest lists, and coordinate contributions all in one place.</p>
        </div>
        <div className="feature">
          <h2>Stay Connected</h2>
          <p>Communicate with guests, send invitations, and receive RSVPs in real-time.</p>
        </div>
        <div className="feature">
          <h2>Track Contributions</h2>
          <p>Manage contributions and expenses, and allow guests to chip in easily.</p>
        </div>
      </section>
      {/* <section className="features-overview">
        <div className="feature">
          <h2>Sign Up</h2>
        </div>
        <div className="feature">
          <h2>Sign In</h2>
          <p>Communicate with guests, send invitations, and receive RSVPs in real-time.</p>
        </div>
      </section> */}
      </main>

      <footer className="landing-footer">
        <p>&copy; 2023 PartyMaster</p>
      </footer>
    </div>
  );
};

export default LandingPage;
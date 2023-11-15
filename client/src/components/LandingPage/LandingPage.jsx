import React, { useState } from 'react';
import '../../styles/LandingPage.css';
import exampleImage from '../../../../assets/create-new-event.png';
import exampleImage2 from '../../../../assets/checklist.png';
import exampleImage3 from '../../../../assets/contributions.png';
import { useQuery } from '@apollo/client';
import { USERS } from '../../utils/queries';

export function LandingPage(props) {

  const { data, loading, error } = useQuery(USERS)
  const userData = data?.users || []
  // console log i sent you a pic of
  console.log(userData);

  if (loading) return <h2>Loading....</h2>

  return (
    <div className="landing-page">
      <main className="main-content">
        {/* <div> {userData[0].name} </div> */}
        <section className="features-overview">
          <h1 className="landing-page-header">What Can Party Master Do For You?</h1>
          <div className="feature">
            <img className='landing-icon' src={exampleImage} alt="Description" style={{ height: '200px', }} />
            <div style={{ justifyContent: 'space-between', }}>
              <h2>Plan Events Effortlessly</h2>
              <p>Create events, manage guest lists, and coordinate contributions all in one place.</p>
            </div>
          </div>
          <div className="feature">
            <img className='landing-icon' src={exampleImage2} alt="Description" style={{ height: '200px', }} />
            <div style={{ justifyContent: 'space-between', }}>
              <h2>Stay Connected</h2>
              <p>Communicate with guests, send invitations, and receive RSVPs in real-time.</p>
            </div>
          </div>
          <div className="feature">
            <img className='landing-icon' src={exampleImage3} alt="Description" style={{ height: '200px', }} />
            <div style={{ justifyContent: 'space-between', }}>
              <h2>Plan Events Effortlessly</h2>
              <p>Create events, manage guest lists, and coordinate contributions all in one place.</p>
            </div>
          </div>
          <a href="/signup" className="start-button">Get Started</a>
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
    </div>
  );
}

export default LandingPage;
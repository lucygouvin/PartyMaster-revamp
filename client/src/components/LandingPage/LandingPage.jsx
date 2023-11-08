import React, { useState } from 'react';
import '../../styles/LandingPage.css';
import { useQuery } from '@apollo/client';
import { USERS } from '../../utils/queries';

export function LandingPage(props) {

  const {data, loading, error} = useQuery(USERS)
  const userData = data?.users || []
  // console log i sent you a pic of
  console.log(userData);

  if (loading) return <h2>Loading....</h2>

    return (
    <div className="landing-page">
      <main className="main-content">
      <div> {userData[0].name} </div>
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
    </div>
  );
}

export default LandingPage;
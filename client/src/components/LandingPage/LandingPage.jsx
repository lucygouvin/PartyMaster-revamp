import { useQuery } from '@apollo/client';
import '../../styles/LandingPage.css';
import FeatureCard from './FeatureCard';

import { EVENTS } from '../../utils/queries';

export function LandingPage() {
  const {loading, data} = useQuery(EVENTS);
  const events = data?.events;
  console.log(events)
  return (
    <div className="landing-page full-page content-padding">
      <main className="main-content">
        <h1 className="landing-page-header">What Will You Plan?</h1>
        <div className="features-overview">
          <FeatureCard feature={{
            image: "./create-new-event.png",
            alt:"Description",
            title:"Create Events",
            subheading:"Effortlessly plan events of any size",
            text:"From boardgame night to BBQ bash, it's sure to be a hit!"
          }} />
           <FeatureCard feature={{
            image: "./invite.png",
            alt:"Description",
            title:"Invite Your Friends",
            subheading:"The more the merrier!",
            text:"Your guests can send RSVPs from the app"
          }} />
           <FeatureCard feature={{
            image: "./bring.png",
            alt:"Description",
            title:`"Can I Bring Anything?"`,
            subheading:"Easily manage who's bringing what",
            text:"Let your guests volunteer to bring things -- or let them know you've got it covered."
          }} />
           <FeatureCard feature={{
            image: "./contact.jpeg",
            alt:"Description",
            title:"Keep In Contact",
            subheading:"Post updates and ask questions",
            text:"Add comments to build the excitement and share information"
          }} />
        </div>
        
        <a href="/signup" className="start-button">Join the Party!</a>
        {/* <button className='start-button'>Join the party</button> */}
      </main>
    </div>
  );
}

export default LandingPage;
import { useState } from 'react';
// Here we import a helper function that will check if the email is valid
import { validateEmail } from '../../utils/helpers';

function Contact() {
  // Create state variables for the fields in the form
  // We are also setting their initial values to an empty string
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    // Getting the value and name of the input which triggered the change
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;

    // Based on the input type, we set the state of either email, username, and password
    if (inputType === 'email') {
      setEmail(inputValue);
    } else if (inputType === 'name') {
      setName(inputValue);
    } else {
      setMessage(inputValue);
    }
  };
  const handleValidation = (e) => {
    if (e.target.name === 'email') {
      if (!validateEmail(e.target.value)) {
        setErrorMessage('Missing Email')
      } else {
        setErrorMessage('')
      }
    } else {
      if (!e.target.value.length) {
        setErrorMessage("Message required")
      } else {
        setErrorMessage('')
      }
    }
  }

  const handleFormSubmit = (e) => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    e.preventDefault();

    // If everything goes according to plan, we want to clear out the input after a successful registration.
    setName('');
    setEmail('');
    setMessage('');
    setErrorMessage('SENT');
  };

  return (
    <>
      <div className="container">
        {/* About Section */}
        <section id="about">
          <h1>About PartyMaster</h1>
          <p>Welcome to PartyMaster, your ultimate solution for hassle-free party planning and coordination, founded in 2023. Our journey began with a simple yet ambitious goal: to revolutionize event management by making it more accessible, efficient, and enjoyable for everyone. We're a team dedicated to this vision, driven by core values that are evident in every aspect of PartyMaster.</p>

          <p>Here's what makes PartyMaster your go-to event planning companion:</p>

          <ul>
            <li><strong>All-in-One Event Management:</strong> We set out to create a platform that simplifies event organization by bringing everything under one roof. With PartyMaster, effortlessly create, manage, and update your events all in one convenient place. Invite guests via email and watch them RSVP, chat about the event, and plan potluck contributions with ease.</li>
            <li><strong>Personalized Dashboard:</strong> Emphasizing user-friendliness, each member gets a customizable dashboard. It's like having a personal party planner, keeping track of all your events, whether you're hosting or attending.</li>
            <li><strong>User-Friendly Interface:</strong> PartyMaster's intuitive design reflects our belief in simplicity and ease of use. Spend less time navigating the app and more time enjoying your party planning.</li>
            <li><strong>Real-Time Updates:</strong> In line with our core value of efficiency, PartyMaster provides real-time information, ensuring you're always updated on the latest event changes or guest responses.</li>
            <li><strong>Adaptability and Strength:</strong> Our robust system is designed to cater to all event types and sizes. PartyMaster's flexibility and scalability echo our dedication to accommodating a wide range of party planning needs.</li>
            <li><strong>Commitment to Security:</strong> Aligning with our values of trust and safety, we ensure that every user's information is securely protected, offering a safe and reliable experience every time.</li>
          </ul>

          <p>At PartyMaster, we believe in transforming the art of party planning into an enjoyable, stress-free experience. Founded on principles of simplicity, user-centric design, and secure, efficient event management, PartyMaster is more than an app – it's a movement towards better, brighter, and more memorable events.</p>

        </section>

        {/* Team Section */}
        <section id="team">
          <h2>Meet Our Team</h2>
          <p>- Lucy Gouvin, Github Link: <a href="https://github.com/lucygouvin" target="_blank">https://github.com/lucygouvin</a></p>
          <p>- Albert Hua, Github Link: <a href="https://github.com/Albyhua" target="_blank">https://github.com/Albyhua</a></p>
          <p>- Kojo Otchere, Github Link: <a href="https://github.com/kojootchere" target="_blank">https://github.com/kojootchere</a></p>
          <p>- Angela Figueroa, Github Link: <a href="https://github.com/AngelaFig" target="_blank">https://github.com/AngelaFig</a></p>
        </section>

        {/* GitHub Links Section */}
        <section id="github">
          <h2>Our GitHub</h2>
          <p>Explore our project and contributions on GitHub:</p>
          <p><a href="https://github.com/Albyhua/Project-3" target="_blank" rel="noopener noreferrer">PartyMaster</a></p>
        </section>

        {/* Contact Section */}
        <section id="contact">
          <h2>Contact Us</h2>
          <form className='contact-us-form' onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" required
                value={email}
                name="email"
                onChange={handleInputChange}
                onBlur={handleValidation} />
            </div>
            <div className="form-group">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="name" className="form-control" required
                value={name}
                name="name"
                onChange={handleInputChange}
                onBlur={handleValidation}
              />
            </div>
            <div className="form-group">
              <label htmlFor="message" className="form-label">Message</label>
              <input type="message" className="form-control" required
                value={message}
                name="message"
                onChange={handleInputChange}
                onBlur={handleValidation}
              />
            </div>
            <button type="submit" className="Submit">Submit</button>

          </form>
          {errorMessage && (
            <div>
              <p className="error-text">{errorMessage}</p>
            </div>
          )}
        </section>
      </div>

    </>
  );
}


export default Contact;

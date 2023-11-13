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
      if (!validateEmail(e.target.value))
      {
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
    <div> 
        <form className='contact-us-form' onSubmit={handleFormSubmit}>
        <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control"required
                  value={email}
                  name="email"
                  onChange={handleInputChange}
                  onBlur = {handleValidation}/>
            </div>
            <div className="form-group">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="name" className="form-control"required 
                 value={name}
                 name="name"
                 onChange={handleInputChange}
                 onBlur = {handleValidation}
              />
            </div>
            <div className="form-group">
              <label htmlFor="message" className="form-label">Message</label>
              <input type="message" className="form-control"  required 
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
    </div>
  );
}

export default Contact;

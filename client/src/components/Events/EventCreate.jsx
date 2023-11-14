import React, { useState } from 'react';
import '../../styles/EventCreate.css';
import { useMutation } from '@apollo/client';
import { ADD_EVENT } from '../../utils/mutations';
import { v4 as uuidv4 } from 'uuid'; // Ensure you've installed 'uuid'

const EventCreate = () => {
    // State variables for the form fields
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [guestEmail, setGuestEmail] = useState('');
    const [guestList, setGuestList] = useState([]);

    // Mutation hook for adding an event
    const [addEvent, { error }] = useMutation(ADD_EVENT);

    // Function to add an email to the guest list
    const handleEmailAddition = () => {
        if (guestEmail && !guestList.includes(guestEmail)) {
            setGuestList([...guestList, guestEmail]);
            setGuestEmail('');
        }
    };

    // Function to remove an email from the guest list
    const handleEmailRemoval = (emailToRemove) => {
        setGuestList(guestList.filter(email => email !== emailToRemove));
    };

    // Function to handle the event creation process
    const handleEventCreated = (uniqueEventId) => {
        const emailSubject = encodeURIComponent("You're Invited to My Event");
        const emailBody = encodeURIComponent(`Hello,\n\nYou have been invited to an event. Please sign up to join us!\n\nEvent ID: ${uniqueEventId}\n\nBest regards,`);

        // Constructing the webmail URLs
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=&su=${emailSubject}&body=${emailBody}`;
        const outlookUrl = `https://outlook.live.com/owa/?path=/mail/action/compose&to=&subject=${emailSubject}&body=${emailBody}`;

        // Prompt user for which service to use
        if (window.confirm("Do you want to send invitations via Gmail?")) {
            window.open(gmailUrl, '_blank');
        } else if (window.confirm("Do you want to send invitations via Outlook?")) {
            window.open(outlookUrl, '_blank');
        }
        // Redirect to the user's dashboard
        window.location.href = `/dashboard`;
    };

    // Function to submit the event creation form
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const result = await addEvent({
                variables: { title, date, time, location, description, guestList: guestList.join(',') },
            });
            console.log(result)

            // Assuming result.data.addEvent returns the event ID or other identifier
            const eventID = result.data.addEvent.id || uuidv4(); // Fallback to uuid if necessary
            handleEventCreated(eventID);
        } catch (err) {
            console.error(err);
        }
    };

    // JSX for rendering the event creation form
    return (
        <div className="landing-page">
            <div className="container">
                <h2>Create a New Event</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="title" className="form-label">Event Title:</label>
                        <input type="text" className="form-control" id="title" name="title" value={title} required onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="date" className="form-label">Date:</label>
                        <input type="date" className="form-control" id="date" name="date" value={date} required onChange={(e) => setDate(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="time" className="form-label">Time:</label>
                        <input type="time" className="form-control" id="time" name="time" value={time} required onChange={(e) => setTime(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="location" className="form-label">Location:</label>
                        <input type="text" className="form-control" id="location" name="location" value={location} required onChange={(e) => setLocation(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="description" className="form-label">Description:</label>
                        <textarea className="form-control" id="description" name="description" rows="5" value={description} required onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                    <div>
                        <label htmlFor="guestEmail" className="form-label">Add Guest Email:</label>
                        <input type="email" className="form-control" id="guestEmail" placeholder="Enter Guest Email" value={guestEmail} required onChange={(e) => setGuestEmail(e.target.value)} />
                        <button type="button" className="btn btn-secondary mt-2" style={{ margin: '0px 0px 16px 0px', padding: '8px' }} onClick={handleEmailAddition}>Add Email</button>
                    </div>
                    <div>
                        <label>Guest Emails:</label>
                        <ol>
                            {guestList.map((email, index) => (
                                <li key={index} style={{ listStyleType: "decimal" }}>
                                    {email}
                                    <button
                                        type="button"
                                        className="btn btn-danger btn-sm ml-3"
                                        style={{ margin: '8px', padding: '8px' }}
                                        onClick={() => handleEmailRemoval(email)}
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ol>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Create Event</button>
                    {error && <p>Error: {error.message}</p>}
                </form>
            </div>
        </div>
    );
};

export default EventCreate;


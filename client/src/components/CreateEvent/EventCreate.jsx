import {useState} from 'react';
import {useMutation} from '@apollo/client'
import {ADD_EVENT} from '../../utils/mutations';

import "../../styles/EventCreate.css"

const EventCreate = () => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
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
     const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const result = await addEvent({
                variables: { title, date, startTime, endTime, location, description, guestList: guestList.join(',') },
            });

            const eventID = result.data.addEvent._id 
            window.location.href = `/event/${eventID}`;
        } catch (err) {
            console.error(err);
        }
    };

    return (

        
        <div className="create-container">
            <h2>Create a New Event</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title" className="form-label">Event Title:</label>
                    <input type="text" className="form-controls styling-exclude" id="title" name="title" value={title} required onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="date" className="form-label">Date:</label>
                    <input type="date" className="form-controls" id="date" name="date" value={date} required onChange={(e) => setDate(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="time" className="form-label">Start Time:</label>
                    <input type="time" className="form-controls" id="start-time" name="time" value={startTime} required onChange={(e) => setStartTime(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="time" className="form-label">End Time:</label>
                    <input type="time" className="form-controls" id="end-time" name="time" value={endTime} required onChange={(e) => setEndTime(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="location" className="form-label">Location:</label>
                    <input type="text" className="form-controls" id="location" name="location" value={location} required onChange={(e) => setLocation(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="description" className="form-label">Description:</label>
                    <textarea className="form-controls" id="description" name="description" rows="5" value={description} required onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>
                <div>
                    <label htmlFor="guestEmail" className="form-label">Add Guest Email:</label>
                    <div className='flex-group add-guest-email'>
                         <input type="email" className="form-controls" id="guestEmail" placeholder="Enter Guest Email" value={guestEmail} required onChange={(e) => setGuestEmail(e.target.value)} />
                    <button type="button" className="cta-button add-email-button" onClick={handleEmailAddition}>Add</button>
                    </div>
                   
                </div>
                <div>
                    <label>Guest Emails:</label>
                    <ol>
                        {guestList.map((email, index) => (
                            <li key={index} style={{ listStyleType: "disc" }}>
                                {email}
                                <button
                                    type="button"
                                    className="delete-button remove-guest"
                                    onClick={() => handleEmailRemoval(email)}
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ol>
                </div>
                <button type="submit" className="primary-button create-button" onClick={handleSubmit}>Create Event</button>
                {error && <p>Error: {error.message}</p>}
            </form>
        </div>
);
};

export default EventCreate;


import React, { useState } from 'react';
import '../../styles/EventCreate.css';
import { useMutation } from '@apollo/client';
import { ADD_EVENT } from '../../utils/mutations';
// import sendInvitationEmails from '../../utils/sendInvitationEmails'; // Ensure this function is implemented

const EventCreate = () => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [guestEmail, setGuestEmail] = useState('');
    const [guestList, setGuestList] = useState([]);

    const [addEvent, { error }] = useMutation(ADD_EVENT);

    const handleEmailAddition = () => {
        if (guestEmail && !guestList.includes(guestEmail)) {
            setGuestList([...guestList, guestEmail]);
            setGuestEmail('');
        }
    };

    const handleEmailRemoval = (emailToRemove) => {
        setGuestList(guestList.filter(email => email !== emailToRemove));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await addEvent({
                variables: { title, date, time, location, description, guestList: guestList.join(',') },
            });

            sendInvitationEmails(guestList, title, date, location);
            window.location.href = "/dashboard";
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="landing-page">
            <div className="container">
                <h2>Create a New Event</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Event Title:</label>
                        <input type="text" className="form-control" id="title" name="title" value={title} required onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="date" className="form-label">Date:</label>
                        <input type="date" className="form-control" id="date" name="date" value={date} required onChange={(e) => setDate(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="time" className="form-label">Time:</label>
                        <input type="time" className="form-control" id="time" name="time" value={time} required onChange={(e) => setTime(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="location" className="form-label">Location:</label>
                        <input type="text" className="form-control" id="location" name="location" value={location} required onChange={(e) => setLocation(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description:</label>
                        <textarea className="form-control" id="description" name="description" rows="5" value={description} required onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="guestEmail" className="form-label">Add Guest Email:</label>
                        <input type="email" className="form-control" id="guestEmail" placeholder="Enter guest email" value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)} />
                        <button type="button" className="btn btn-secondary mt-2" style={{ margin: '0px 0px 16px 0px', padding: '8px' }} onClick={handleEmailAddition}>Add Email</button>
                    </div>
                    <div className="mb-3">
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
                    <button type="submit" className="btn btn-primary">Create Event</button>
                    {error && <p>Error: {error.message}</p>}
                </form>
            </div>
        </div>
    );
};

export default EventCreate;

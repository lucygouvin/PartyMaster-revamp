import React, { useState } from 'react';
import '../../styles/EventCreate.css';  
import { useMutation } from '@apollo/client';
import { ADD_EVENT } from '../../utils/mutations';


const EventCreate = () => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [guestList, setGuestList] = useState('')

    const [addEvent, {error}] = useMutation(ADD_EVENT)

    const handleSubmit = (event) => {
        event.preventDefault();
        
        try {
            const {data} = addEvent({
                variables: { title, date, time, location, description, guestList},
            });

            // TODO redirect to the newly created event page
            window.location.reload();
        } catch (err) {
          console.error(err);
        }
    };

    return (
        <div className="landing-page">
            <div className="container mt-5">
                <h2>Create a New Event</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Event Title:</label>
                        <input type="text" className="form-control" id="title" name="title" value={title} required onChange={(event) => setTitle(event.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="date" className="form-label">Date:</label>
                        <input type="date" className="form-control" id="date" name="date" value={date} required onChange={(event) => setDate(event.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="time" className="form-label">Time:</label>
                        <input type="time" className="form-control" id="time" name="time" value={time} required onChange={(event) => setTime(event.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="location" className="form-label">Location:</label>
                        <input type="text" className="form-control" id="location" name="location" value={location} required onChange={(event) => setLocation(event.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description:</label>
                        <textarea className="form-control" id="description" name="description" rows="5" value={description} required onChange={(event) => setDescription(event.target.value)}></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Guests:</label>
                        <textarea className="form-control" id="description" name="description" rows="5" value={guestList} required onChange={(event) => setGuestList(event.target.value)}></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Create Event</button>
                </form>
            </div>
        </div>
    );
};

export default EventCreate;

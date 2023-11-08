import React, { useState } from 'react';
import '../../styles/EventCreate.css';  


const EventCreate = () => {

    const handleSubmit = (event) => {
        event.preventDefault();
        const title = event.target.title.value;
        const date = event.target.date.value;
        const location = event.target.location.value;
        const description = event.target.description.value;
   
        fetch('/dashboard/create-event', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, date, location, description }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    return (
        <div className="landing-page">
            <div className="container mt-5">
                <h2>Create a New Event</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title:</label>
                        <input type="text" className="form-control" id="title" name="title" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="date" className="form-label">Date:</label>
                        <input type="date" className="form-control" id="date" name="date" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="location" className="form-label">Location:</label>
                        <input type="text" className="form-control" id="location" name="location" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description:</label>
                        <textarea className="form-control" id="description" name="description" rows="5" required></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Create Event</button>
                </form>
            </div>
        </div>
    );
};

export default EventCreate;

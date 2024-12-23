import React, { useState } from 'react';
import axios from 'axios';

const FeedbackForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        feedback: '',
        category: 'suggestion',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/feedback', formData);
            alert('Feedback submitted successfully!');
            setFormData({ name: '', email: '', feedback: '', category: 'suggestion' });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" value={formData.name} required onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            <input type="email" placeholder="Email" value={formData.email} required onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            <textarea placeholder="Feedback" value={formData.feedback} required onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}></textarea>
            <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                <option value="suggestion">Suggestion</option>
                <option value="bug report">Bug Report</option>
                <option value="feature request">Feature Request</option>
            </select>
            <button type="submit">Submit</button>
        </form>
    );
};

export default FeedbackForm;
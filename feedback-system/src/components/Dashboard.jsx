import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [feedback, setFeedback] = useState([]);
    const [category, setCategory] = useState('');
    const [sort, setSort] = useState('asc');

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const response = await axios.get('http://localhost:5000/feedback', {
                    params: { category, sort },
                });
                setFeedback(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchFeedback();
    }, [category, sort]);

    return (
        <div>
            <h1>Feedback Dashboard</h1>
            <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">All Categories</option>
                <option value="suggestion">Suggestion</option>
                <option value="bug report">Bug Report</option>
                <option value="feature request">Feature Request</option>
            </select>
            <select onChange={(e) => setSort(e.target.value)}>
                <option value="asc">Oldest First</option>
                <option value="desc">Newest First</option>
            </select>
            <ul>
                {feedback.map((item) => (
                    <li key={item._id}>
                        <p><strong>{item.name}</strong> ({item.email})</p>
                        <p>{item.feedback}</p>
                        <p>Category: {item.category}</p>
                        <p>{new Date(item.timestamp).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
// user-feedback-system/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Feedback = require('./models/Feedback');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database Connection
mongoose.connect('mongodb://localhost:27017/feedback', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB')).catch(err => console.log(err));

// Routes
app.post('/feedback', async (req, res) => {
    try {
        const feedback = new Feedback(req.body);
        await feedback.save();
        res.status(201).json({ message: 'Feedback submitted successfully!' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/feedback', async (req, res) => {
    try {
        const { category, sort } = req.query;
        const filter = category ? { category } : {};
        const feedback = await Feedback.find(filter).sort({ timestamp: sort === 'desc' ? -1 : 1 });
        res.status(200).json(feedback);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
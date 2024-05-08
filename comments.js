// Create web server
// Define routes
// Start server
// Connect to MongoDB
// Define Model
// Create a new comment
// Read all comments
// Read a comment by id
// Update a comment by id
// Delete a comment by id
// Stop server
// Disconnect from MongoDB

const express = require('express');
const mongoose = require('mongoose');
const Comment = require('./models/Comment');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.get('/comments', async (req, res) => {
    const comments = await Comment.find();
    res.json(comments);
});

app.get('/comments/:id', async (req, res) => {
    const comment = await Comment.findById(req.params.id);
    res.json(comment);
});

app.post('/comments', async (req, res) => {
    const comment = new Comment(req.body);
    await comment.save();
    res.json(comment);
});

app.put('/comments/:id', async (req, res) => {
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.json(comment);
});

app.delete('/comments/:id', async (req, res) => {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    res.json(comment);
});

app.listen(3000, async () => {
    console.log('Server is running on http://localhost:3000');

    await mongoose.connect('mongodb://localhost:27017/commentDB');
    console.log('Connected to MongoDB');
});

process.on('SIGINT', async () => {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit();
});
require("dotenv").config();
const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const auth = require('../middleware/auth'); // ✨ Import auth middleware
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const AI_MODEL = 'gemini-2.5-flash-lite'

// 1. SAVE A NOTE (Protected)
router.post('/add', auth, async (req, res) => { // ✨ Added auth middleware here
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required." });
    }

    // ✨ Include the user ID from the token
    const newNote = new Note({ 
      title, 
      content,
      user: req.user.userId 
    });
    
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(500).json({ message: "Error saving note", error });
  }
});

// 2. GET ALL NOTES (Protected)
router.get('/all', auth, async (req, res) => { // ✨ Added auth middleware here
  try {
    // ✨ Only find notes that belong to the logged-in user
    const notes = await Note.find({ user: req.user.userId }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notes", error });
  }
});

// 3. SUMMARIZE A NOTE (Protected)
router.post('/summarize/:id', auth, async (req, res) => {
  try {
    // ✨ Ensure the note exists AND belongs to the user
    const note = await Note.findOne({ _id: req.params.id, user: req.user.userId });
    if (!note) return res.status(404).json({ message: "Note not found or unauthorized" });

    if (note.summary) {
      return res.json({ message: "Already summarized", summary: note.summary });
    }

    const model = genAI.getGenerativeModel({ model: AI_MODEL });
    const prompt = `Summarize this note into 3 short bullet points. Do not use markdown headers, just bullet points: ${note.content}`;

    const result = await model.generateContent(prompt);
    const summaryText = result.response.text();

    note.summary = summaryText;
    await note.save();

    res.json({ summary: summaryText });
  } catch (error) {
    console.error("🚨 Gemini AI Error:", error);
    res.status(500).json({ message: "AI Summarization failed", error: error.message });
  }
});

// 4. DELETE A NOTE (Protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    // ✨ Ensure the user can only delete their own notes
    const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user.userId });
    if (!note) {
      return res.status(404).json({ message: "Note not found or unauthorized" });
    }
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error });
  }
});

module.exports = router;
import { useState, useEffect } from "react";
import { Brain, BookOpen, LogOut } from "lucide-react";
import API from "../api/axiosConfig";
import NoteForm from "../components/NoteForm";
import NoteCard from "../components/NoteCard";
import { useCallback } from "react";

export default function Dashboard({ onLogout }) {
  const [notes, setNotes] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  const fetchNotes = useCallback(async () => {
    try {
      const res = await API.get('/api/notes/all');
      setNotes(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
      if (err.response?.status === 401) onLogout(); 
    }
  },[onLogout]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleAddNote = async (noteData) => {
    try {
      await API.post('/api/notes/add', noteData);
      fetchNotes();
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  const summarizeNote = async (id) => {
    setLoadingId(id);
    try {
      await API.post(`/api/notes/summarize/${id}`);
      fetchNotes();
    } catch (err) {
      console.error("AI error:", err);
      alert(`AI Failed: ${err.response?.data?.error || err.message}`);
    } finally {
      setLoadingId(null);
    }
  };

  const deleteNote = async (id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await API.delete(`/api/notes/${id}`);
      fetchNotes();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 font-sans">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg shadow-lg">
              <Brain className="text-white" size={32} />
            </div>
            <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight italic">
              Second Brain
            </h1>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 text-slate-500 hover:text-red-600 transition-colors font-medium bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>

        {/* Input Card */}
        <NoteForm onAddNote={handleAddNote} />

        {/* Notes List */}
        <div className="space-y-6">
          {notes.map((note) => (
            <NoteCard 
              key={note._id} 
              note={note} 
              onDelete={deleteNote} 
              onSummarize={summarizeNote} 
              loadingId={loadingId} 
            />
          ))}
        </div>

        {/* Empty State */}
        {notes.length === 0 && (
          <div className="text-center py-20">
            <BookOpen className="mx-auto text-slate-300 mb-4" size={48} />
            <p className="text-slate-500 font-medium">
              Your brain is currently empty. Start capturing notes!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
import { useState } from "react";
import { PlusCircle } from "lucide-react";

export default function NoteForm({ onAddNote }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return;
    
    await onAddNote({ title, content });
    setTitle("");
    setContent("");
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8 transition-all focus-within:ring-2 focus-within:ring-indigo-100">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full text-xl font-semibold border-none focus:outline-none placeholder-slate-400"
          placeholder="Note Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full border-none focus:outline-none text-slate-600 placeholder-slate-400 resize-none min-h-[120px]"
          placeholder="Write your thoughts here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="flex justify-end border-t pt-4 border-slate-100">
          <button
            type="submit"
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-sm active:scale-95"
          >
            <PlusCircle size={18} /> Save to Brain
          </button>
        </div>
      </form>
    </div>
  );
}
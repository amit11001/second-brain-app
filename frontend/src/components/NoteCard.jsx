import { Trash2, Sparkles } from "lucide-react";

export default function NoteCard({ note, onDelete, onSummarize, loadingId }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-all group">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-slate-800 uppercase tracking-wide">
          {note.title}
        </h3>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 font-mono">
            {new Date(note.createdAt).toLocaleDateString()}
          </span>
          <button
            onClick={() => onDelete(note._id)}
            className="text-slate-300 hover:text-red-500 transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
        {note.content}
      </p>

      {note.summary && (
        <div className="mt-6 bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg">
          <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm mb-2 uppercase tracking-tighter">
            <Sparkles size={16} /> AI Insight
          </div>
          <p className="text-indigo-800 text-sm leading-relaxed">
            {note.summary}
          </p>
        </div>
      )}

      <div className="mt-6">
        <button
          onClick={() => onSummarize(note._id)}
          disabled={loadingId === note._id}
          className="flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
        >
          <Sparkles size={16} />
          {loadingId === note._id ? "Analyzing..." : "Summarize with AI"}
        </button>
      </div>
    </div>
  );
}
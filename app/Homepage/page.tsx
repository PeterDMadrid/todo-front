"use client";
import { useState, useEffect } from "react";

interface Note {
  id: number;
  title: string;
  body: string;
}

const API = "https://todo.digimaxits.com/api/v1/notes";

export default function Homepage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [form, setForm] = useState({ title: "", body: "" });
  const [editing, setEditing] = useState<Note | null>(null);

  const fetchNotes = () =>
    fetch(API).then((r) => r.json()).then((d) => setNotes(d.data));

  useEffect(() => { fetchNotes(); }, []);

  const handleSubmit = async () => {
    if (!form.title.trim() || !form.body.trim()) return;
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ title: "", body: "" });
    fetchNotes();
  };

  const handleUpdate = async () => {
    if (!editing) return;
    await fetch(`${API}/${editing.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: editing.title, body: editing.body }),
    });
    setEditing(null);
    fetchNotes();
  };

  const handleDelete = async (id: number) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    fetchNotes();
  };

  const s = {
    page: { minHeight: "100vh", background: "#0f0f0f", fontFamily: "'Georgia', serif", padding: "3rem 2rem", maxWidth: "640px", margin: "0 auto" } as React.CSSProperties,
    label: { display: "block", color: "#888", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase" as const, marginBottom: "0.4rem" },
    input: { width: "100%", background: "transparent", border: "none", borderBottom: "1px solid #444", color: "#e8e0d0", fontSize: "1.2rem", padding: "0.4rem 0", outline: "none", fontFamily: "inherit", boxSizing: "border-box" as const },
    textarea: { width: "100%", background: "#1a1a1a", border: "1px solid #333", color: "#c8bfaf", fontSize: "0.95rem", padding: "1rem", outline: "none", resize: "vertical" as const, fontFamily: "inherit", lineHeight: "1.7", borderRadius: "2px", boxSizing: "border-box" as const },
    btn: { background: "#e8e0d0", color: "#0f0f0f", border: "none", padding: "0.6rem 1.6rem", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase" as const, cursor: "pointer", fontFamily: "inherit" },
    ghostBtn: { background: "transparent", color: "#666", border: "1px solid #333", padding: "0.4rem 1rem", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, cursor: "pointer", fontFamily: "inherit" },
    dangerBtn: { background: "transparent", color: "#8b3a3a", border: "1px solid #8b3a3a", padding: "0.4rem 1rem", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, cursor: "pointer", fontFamily: "inherit" },
  };

  return (
    <div style={s.page}>
      {/* HEADER */}
      <h1 style={{ color: "#e8e0d0", fontSize: "1rem", letterSpacing: "0.25em", textTransform: "uppercase", borderBottom: "1px solid #333", paddingBottom: "1rem", marginBottom: "2.5rem" }}>
        Notes
      </h1>

      {/* CREATE FORM */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem", marginBottom: "3rem" }}>
        <div>
          <label style={s.label}>Title</label>
          <input style={s.input} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Title..." />
        </div>
        <div>
          <label style={s.label}>Body</label>
          <textarea style={s.textarea} rows={4} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} placeholder="Write something..." />
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button style={s.btn} onClick={handleSubmit}>Add Note</button>
        </div>
      </div>

      {/* NOTES LIST */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {notes.map((note) => (
          <div key={note.id} style={{ borderBottom: "1px solid #222", paddingBottom: "1.5rem" }}>
            {editing?.id === note.id ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                <input style={s.input} value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
                <textarea style={s.textarea} rows={3} value={editing.body} onChange={(e) => setEditing({ ...editing, body: e.target.value })} />
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button style={s.btn} onClick={handleUpdate}>Save</button>
                  <button style={s.ghostBtn} onClick={() => setEditing(null)}>Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <h2 style={{ color: "#e8e0d0", fontSize: "1.1rem", marginBottom: "0.4rem" }}>{note.title}</h2>
                <p style={{ color: "#888", fontSize: "0.9rem", lineHeight: "1.7", marginBottom: "1rem" }}>{note.body}</p>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button style={s.ghostBtn} onClick={() => setEditing(note)}>Edit</button>
                  <button style={s.dangerBtn} onClick={() => handleDelete(note.id)}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
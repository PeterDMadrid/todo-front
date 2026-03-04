"use client";
import { useEffect, useState } from "react";

interface Note {
  id: number;
  title: string;
  body: string;
}

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);

useEffect(() => {
  fetch("https://todo.digimaxits.com/api/v1/notes")
    .then((res) => res.json())
    .then((data) => {
      console.log(data); // check this in browser console
      setNotes(Array.isArray(data) ? data : data.data ?? data.notes ?? []);
    });
}, []);

  return (
    <div style={{ marginTop: "3rem", borderTop: "1px solid #333", paddingTop: "2rem" }}>
      {notes.map((note) => (
        <div key={note.id} style={{ marginBottom: "2rem" }}>
          <h2 style={{ color: "#e8e0d0", fontSize: "1.2rem", marginBottom: "0.4rem" }}>{note.title}</h2>
          <p style={{ color: "#888", lineHeight: "1.7", fontSize: "0.95rem" }}>{note.body}</p>
        </div>
      ))}
    </div>
  );
}
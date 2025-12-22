import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function Dashboard({ user, onLogout }) {
  const [records, setRecords] = useState([]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  useEffect(() => {
    setRecords([]);
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Welcome, {user.email}</h1>
      <button onClick={handleLogout}>Logout</button>
      <h2>Your Vinyl Collection</h2>
      {records.length === 0 ? (
        <p>No records yet.</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>Title</th>
              <th>Artist</th>
              <th>Year</th>
              <th>Format</th>
              <th>Condition</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r, i) => (
              <tr key={i}>
                <td>{r.title}</td>
                <td>{r.artist}</td>
                <td>{r.year}</td>
                <td>{r.format}</td>
                <td>{r.condition}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

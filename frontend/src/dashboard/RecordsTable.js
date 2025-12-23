import React from "react";

export default function RecordsTable({
  records,
  selected,
  toggleSelect,
  toggleSelectAll,
  deleteSelected,
}) {
  if (!records || records.length === 0) return <p>No records yet.</p>;

  return (
    <div>
      <button onClick={toggleSelectAll}>Select All</button>
      <button onClick={deleteSelected} disabled={selected.length === 0}>
        Delete Selected
      </button>

      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th></th>
            <th>Album</th>
            <th>Artist</th>
            <th>Year</th>
            <th>Format</th>
            <th>Condition</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selected.includes(r.id)}
                  onChange={() => toggleSelect(r.id)}
                />
              </td>
              <td>{r.title}</td>
              <td>{r.artist}</td>
              <td>{r.year || "—"}</td>
              <td>{r.format || "—"}</td>
              <td>{r.condition}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

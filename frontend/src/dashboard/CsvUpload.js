import React from "react";
import Papa from "papaparse";
import { supabase } from "../supabaseClient";

export default function CsvUpload({ user, onUpload }) {
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async function (results) {
        const newRecords = results.data.map((r) => ({
          user_id: user.id,
          title: r.title || r.album,
          artist: r.artist,
          condition: r.condition,
          format: r.format || null,
          year: r.year ? parseInt(r.year) : null,
          label: r.label || null,
          catalog_number: r.catalog_number || null,
          purchase_price: r.purchase_price ? parseFloat(r.purchase_price) : null,
          notes: r.notes || null,
        }));

        const { error } = await supabase.from("records").insert(newRecords);
        if (error) console.log(error);
        else onUpload(); // refresh dashboard
      },
    });
  };

  return (
    <div>
      <h2>Upload CSV</h2>
      <input type="file" accept=".csv" onChange={handleFile} />
    </div>
  );
}

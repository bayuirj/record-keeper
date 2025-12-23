import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import CsvUpload from "./CsvUpload";
import RecordsTable from "./RecordsTable";

export default function Dashboard({ user, onLogout }) {
  const [records, setRecords] = useState([]);
  const [selected, setSelected] = useState([]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  const fetchRecords = async () => {
    const { data, error } = await supabase
      .from("records")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) console.log(error);
    else setRecords(data);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selected.length === records.length) setSelected([]);
    else setSelected(records.map((r) => r.id));
  };

  const deleteSelected = async () => {
    const { error } = await supabase
      .from("records")
      .delete()
      .in("id", selected);
    if (error) console.log(error);
    else {
      setSelected([]);
      fetchRecords();
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Welcome, {user.email}</h1>
      <button onClick={handleLogout}>Logout</button>

      <CsvUpload user={user} onUpload={fetchRecords} />
      <RecordsTable
        records={records}
        selected={selected}
        toggleSelect={toggleSelect}
        toggleSelectAll={toggleSelectAll}
        deleteSelected={deleteSelected}
      />
    </div>
  );
}

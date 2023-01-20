import "./App.css";
import AddUser from "./components/AddUser";
import { Route } from "react-router";
import UserDataTable from "./components/UserDataTable";
import { Routes } from "react-router-dom";
import { CSVLink } from "react-csv";

function App() {
  return (
    <Routes>
      <Route path="/add-user" element={<AddUser />} />
      <Route path="/edit-user/:id" element={<AddUser />} />
      <Route path="/user-data" element={<UserDataTable />} />
      <Route path="/" element={<UserDataTable />} />
      <Route path="/csv" element={<CSVLink />} />
      <Route path="/csv/:id" element={<CSVLink />} />


    </Routes>
  );
}

export default App;

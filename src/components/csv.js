import React from 'react';
import { CSVLink } from 'react-csv';


headers = [
    { label: "id", key: "id" },
    { label: "name", key: "name" },
    { label: "E-mail", key: "email" },
    { label: "Dob", key: "dateOfBirth" },
    { label: "Address", key: "address" },
    { label: "Country", key: "country", }                          
  ];
  
  data = [
    { id: "1", name: "Tfg", email: "tfg@gmail.com", dateOfbirth:"", address:"asd", country:"df" },
    { id: "2", name: "gp", email: "gp@gmail.com", dateOfbirth:"", address:"ahd", country:"th" },
    { id: "3", name: "dfg", email: "cv@gmail.com", dateOfbirth:"", address:"dty", country:"ds" },
  ];
  
function csv() {
  return (
    
         <CSVLink data={data} headers={headers}>Export to CSV</CSVLink>
  )
}

export default csv
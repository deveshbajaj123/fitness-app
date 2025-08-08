// DataDisplayPage.js
import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from './firebase'; // Your firebase.js
import './Display.css'; // Import regular CSS

function DataDisplayPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const leadsCollection = collection(db, 'leads');
    const unsubscribe = onSnapshot(
      leadsCollection,
      (querySnapshot) => {
        const allLeads = [];
        querySnapshot.forEach((doc) => {
          allLeads.push({ id: doc.id, ...doc.data() });
        });
        setLeads(allLeads);
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching leads:', err);
        setError('Failed to load data.');
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  if (loading) return <div className="loading">Loading data...</div>;
  if (error)   return <div className="error">{error}</div>;
  if (leads.length === 0) return <div className="no-data">No data found.</div>;

  return (
    <div className="container">
      <h2 className="title">All Submitted Data</h2>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Instagram</th>
              <th>Submitted On</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id}>
                <td>{lead.fullName}</td>
                <td>{lead.email}</td>
                <td>{lead.instagram}</td>
                <td>{new Date(lead.timestamp.seconds * 1000).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataDisplayPage;

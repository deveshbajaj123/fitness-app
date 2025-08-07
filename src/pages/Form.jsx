import React, { useState } from 'react';
import './Form.css';
import { useNavigate } from 'react-router-dom'; 
import { db } from './firebase.js';
import { collection, addDoc } from 'firebase/firestore';

// --- Main App Component (Now handles routing) ---
export default function Form() {
  return <HomePage />;
}

// --- Home Page Component ---
// This contains your original header and form.
function HomePage() {
  return (
    <div className="bg-black text-white min-h-screen font-sans flex flex-col items-center justify-center p-4">
      <header className="text-center mb-8 header">
        <h1 className="text-5xl md:text-6xl font-bold tracking-wider">
          Aryan<span>Bhatia</span>
        </h1>
        <h2 className="text-2xl md:text-3xl font-light text-gray-300 mt-2">
          <span>CALORIE</span> CALCULATOR
        </h2>
      </header>
      <main className="w-full max-w-lg">
        <LeadForm />
      </main>
    </div>
  );
}

// --- Lead Capture Form Component (with navigation) ---
function LeadForm() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [instagram, setInstagram] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName || !email) {
      setMessage('Please fill in your Full Name and Email.');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      // Add a new document with a generated ID to a collection named 'leads'
      const docRef = await addDoc(collection(db, 'leads'), {
        fullName: fullName,
        email: email,
        instagram: instagram,
        timestamp: new Date() // Add a timestamp for when the lead was captured
      });

      console.log("Document written with ID: ", docRef.id);
      setMessage('Your information has been successfully submitted!');
      // Optionally clear the form after submission
      setFullName('');
      setEmail('');
      setInstagram('');

      // Navigate to the login page after successful submission
      navigate('/login');

    } catch (error) {
      console.error("Error adding document: ", error);
      setMessage('Failed to submit. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="text-center max-w-lg mx-auto main-content form-container">
      <p className="text-gray-400 mb-8">
        Complete the short form below to get access to my completely free, tailored calorie calculator, which will calculate you a calorie & macronutrient goal based on your goal.
      </p>
      <form onSubmit={handleSubmit} className="space-y-6 lead-form">
        {/* Full Name Input */}
        <input
          type="text"
          placeholder="Full Name*"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full p-4 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 form-input"
          required
        />
        {/* Email Input */}
        <input
          type="email"
          placeholder="Email*"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 form-input"
          required
        />
        {/* Instagram Handle Input */}
        <input
          type="text"
          placeholder="Instagram handle*"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
          className="w-full p-4 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 form-input"
          required
        />
        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          id="submit-button"
          className="w-full p-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed form-input submit-button"
        >
          {isLoading ? 'Submitting...' : 'Get My Calories!'}
        </button>
      </form>
      {/* Display message on validation error */}
      {message && <p className="mt-4 text-red-400 message">{message}</p>}
    </div>
  );
}

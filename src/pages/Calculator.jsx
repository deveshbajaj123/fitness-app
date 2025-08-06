// src/App.jsx
import React, { useState } from 'react';
import "./Calculator.css";

export default function App() {
  const [sex, setSex] = useState(null);
  const [age, setAge] = useState('');
  const [heightFeet, setHeightFeet] = useState('');
  const [heightInches, setHeightInches] = useState('');
  const [weight, setWeight] = useState('');
  const [activity, setActivity] = useState(null);
  const [goal, setGoal] = useState(null);

  const calculateCalories = () => {
    if (!sex || !age || !heightFeet || !heightInches || !weight || !activity || !goal) return 0;
    const hCm = ((parseFloat(heightFeet) * 12) + parseFloat(heightInches)) * 2.54;
    const wKg = parseFloat(weight);
    let bmr = sex === 'male'
      ? 10 * wKg + 6.25 * hCm - 5 * Number(age) + 5
      : 10 * wKg + 6.25 * hCm - 5 * Number(age) - 161;
    const activityFactors = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, very: 1.9 };
    bmr *= activityFactors[activity];
    const goalOffsets = { maintain: 0, loseSlow: -250, loseFast: -500, leanBulk: +250 };
    return Math.round(bmr + goalOffsets[goal]);
  };

  const calories = calculateCalories();

  return (
    <div className="container">
      <header>
        <h1>Aryan<span>Bhatia</span></h1>
        <h2>CALORIE CALCULATOR</h2>
        <p className="note">
          Our calorie calculator estimates based on your inputs.<br />
          Note: if it suggests fewer than 1400 calories, DM for a more tailored plan.
        </p>
      </header>

      <form className="calc-form" onSubmit={e => e.preventDefault()}>
        <h3>Step 1: Basic Information</h3>
        <div className="row">
          <div className="card sex">
            <button type="button" className={sex === 'male' ? 'selected' : ''} onClick={() => setSex('male')}>🚹</button>
            <button type="button" className={sex === 'female' ? 'selected' : ''} onClick={() => setSex('female')}>🚺</button>
          </div>
          <div className="card height"><input type="number" placeholder="ft" value={heightFeet} onChange={e => setHeightFeet(e.target.value)} /><input type="number" placeholder="in" value={heightInches} onChange={e => setHeightInches(e.target.value)} /></div>
          <div className="card"><input type="number" placeholder="Age" value={age} onChange={e => setAge(e.target.value)} /></div>
     
          {/* <div className="card"><input type="number" placeholder="Height (in)" value={heightInches} onChange={e => setHeightInches(e.target.value)} /></div> */}
          <div className="card"><input type="number" placeholder="Weight (kg)" value={weight} onChange={e => setWeight(e.target.value)} /></div>
        </div>

        <h3>Step 2: Activity Level</h3>
        <div className="row activity">
          {[
            ['sedentary', 'Sedentary', 'Little to no exercise'],
            ['light', 'Light', '4K–8K steps or 1–3 workouts/wk'],
            ['moderate', 'Moderate', '3–4 times/wk & 8K–10K steps'],
            ['active', 'Active', 'Daily intense or 10K+ steps'],
            ['very', 'Very Active', '6–7 times/wk & 12K+ steps'],
          ].map(([key, title, desc]) => (
            <div key={key} className={`card option ${activity === key ? 'selected' : ''}`} onClick={() => setActivity(key)}>
              <h4>{title}</h4>
              <small>{desc}</small>
            </div>
          ))}
        </div>

        <h3>Step 3: Select Your Goal</h3>
        <div className="row goals">
          {[
            ['maintain', 'Maintain Weight'],
            ['loseSlow', 'Lose Slowly'],
            ['loseFast', 'Lose Quickly'],
            ['leanBulk', 'Lean Bulk'],
            
          ].map(([key, label]) => (
            <button key={key} type="button" className={`card goal ${goal === key ? 'selected' : ''}`} onClick={() => setGoal(key)}>
              {label}
            </button>
          ))}
        </div>

        <div className="results">
          <h3>Your Results:</h3>
          <div className="calorie-output">{calories}</div>
          <div className="macros">
            <div>Fats: {Math.round(calories * 0.25 / 9)}g</div>
            <div>Protein: {Math.round(calories * 0.3 / 4)}g</div>
            <div>Carbs: {Math.round(calories * 0.45 / 4)}g</div>
          </div>
        </div>
      </form>
    </div>
  );
}

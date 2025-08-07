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
      ? (10 * wKg) + (6.25 * hCm) - (4 * Number(age)) + 5
      : (10 * wKg) + (6.25 * hCm) - (4 * Number(age)) - 161;
      console.log('age', age);
    const activityFactors = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, very: 1.9 };
    bmr *= activityFactors[activity];
    const goalOffsets = { maintain: 0, loseSlow: -300, loseFast: -650, leanBulk: +250 };
    return Math.round(bmr + goalOffsets[goal]);
  };

    // Helper to tell if the goal is one of the “losing” ones
  const isLosing = goal === 'loseSlow' || goal === 'loseFast';


  const calories = calculateCalories();

  return (
    <div className="container">
      <header>
        <h1>Aryan<span>Bhatia</span></h1>
        <h2>CALORIE CALCULATOR</h2>
        
        <p className="note">
          Our calorie calculator estimates based on your inputs.<br />
          
          Please make sure to select all relavent Information:
        </p>
      </header>

      <form className="calc-form" onSubmit={e => e.preventDefault()}>
        <h3>Step 1: Basic Information</h3>
        <div className="row">
          <div className='top-row'>
            
          <div className="card sex">
            
            <button type="button" className={sex === 'male' ? 'selected' : ''} photo onClick={() => setSex('male')}>🚹</button>
            <button type="button" className={sex === 'female' ? 'selected' : ''} photo onClick={() => setSex('female')}>🚺</button>
          </div>
          
          <div className="card height"><input type="number" placeholder="ft" value={heightFeet} onChange={e => setHeightFeet(e.target.value)} /><input type="number" placeholder="in" value={heightInches} onChange={e => setHeightInches(e.target.value)} /></div>
          </div>
          <div className="card nar"><input type="number" placeholder="Age" value={age} onChange={e => setAge(e.target.value)} /></div>
          
     
          {/* <div className="card"><input type="number" placeholder="Height (in)" value={heightInches} onChange={e => setHeightInches(e.target.value)} /></div> */}
          <div className="card nar"><input type="number" placeholder="Weight (kg)" value={weight} onChange={e => setWeight(e.target.value)} /></div>
        </div>

        <h3>Step 2: Activity Level</h3>
        <div className="row activity nar">
          {[
            ['sedentary', 'Sedentary', 'Little to no exercise'],
            ['light', 'Light', '1–2 workouts/wk or 3K–4K steps'],
            ['moderate', 'Moderate', '2–3 workouts/wk & 4K–8K steps'],
            ['active', 'Active', '4-5 workouts/wk & 8K-12K steps'],
            ['very', 'Very Active', '6–7 workouts/wk & 12K+ steps'],
          ].map(([key, title, desc]) => (
            <div key={key} className={`card option ${activity === key ? 'selected' : ''}`} onClick={() => setActivity(key)}>
              <h4>{title}</h4>
              <small>{desc}</small>
            </div>
          ))}
        </div>

        <h3>Step 3: Select Your Goal</h3>
        <div className="row goals nar">
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

       <div className="results nar">
          <h3>Your Results:</h3>
          <div className="calorie-output">{calories}</div>
          <div className="macros">
            <div>
              Fats: {isLosing
                ? Math.round(calories * 0.26 / 9)
                : Math.round(calories * 0.23 / 9)
              }g
            </div>
            <div>
              Protein: {isLosing
                ? Math.round(calories * 0.23 / 4)
                : Math.round(calories * 0.21 / 4)
              }g
            </div>
            <div>
              Carbs: {isLosing
                ? Math.round(calories * 0.51 / 4)
                : Math.round(calories * 0.56 / 4)
              }g
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

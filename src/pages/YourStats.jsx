import React, { useState, useContext } from 'react';
import { db } from '../firebase';
import { AuthContext } from '../AuthContext';
import { doc, setDoc } from 'firebase/firestore';

function YourStats() {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    gpa: '',
    major: '',
    degreeType: 'AS',
    credits: '',
    associatesEarned: false,
    gradSeason: 'Summer',
    gradYear: '',
    vaNative: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const saveStats = async () => {
    if (!user) {
      alert("You must be logged in to save your stats.");
      return;
    }

    try {
      await setDoc(doc(db, 'users', user.uid), {
        stats: formData
      });
      alert("Stats saved successfully!");
    } catch (error) {
      console.error("Error saving stats:", error);
      alert("Failed to save stats.");
    }
  };

  return (
    <div className="your-stats-box">
      <h3>Your Stats</h3>
      <input type="text" name="gpa" value={formData.gpa} onChange={handleChange} placeholder="GPA" />
      <input type="text" name="major" value={formData.major} onChange={handleChange} placeholder="Major" />
      <select name="degreeType" value={formData.degreeType} onChange={handleChange}>
        <option value="AS">AS</option>
        <option value="AA">AA</option>
        <option value="AAS">AAS</option>
      </select>
      <input type="number" name="credits" value={formData.credits} onChange={handleChange} placeholder="Credits Completed" />
      <label><input type="checkbox" name="associatesEarned" checked={formData.associatesEarned} onChange={handleChange} /> Associates Degree Earned</label>
      <select name="gradSeason" value={formData.gradSeason} onChange={handleChange}>
        <option value="Fall">Fall</option>
        <option value="Spring">Spring</option>
        <option value="Summer">Summer</option>
      </select>
      <input type="text" name="gradYear" value={formData.gradYear} onChange={handleChange} placeholder="Graduation Year" />
      <label><input type="checkbox" name="vaNative" checked={formData.vaNative} onChange={handleChange} /> Virginia Native Student</label>

      <button onClick={saveStats} style={{ marginTop: '1rem' }}>Save Stats</button>
    </div>
  );
}

export default YourStats;

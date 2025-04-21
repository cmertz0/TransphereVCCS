import React, { useState } from "react";
import "./Search.css";

const gaaRequirements = {
  "University of Virginia": {
    degree: "A.A. or A.S.",
    gpa: 3.4,
    credits: 60,
    residency: true,
    conduct: true,
  },
  "George Mason University": {
    degree: "A.A. or A.S.",
    gpa: 2.85,
    credits: 30,
    residency: true,
    conduct: true,
  },
  "Virginia Tech": {
    degree: "A.A. or A.S.",
    gpa: 3.2,
    credits: 60,
    residency: true,
    conduct: true,
  },
  "Christopher Newport University": {
    degree: "A.A. or A.S.",
    gpa: 3.0,
    credits: 60,
    residency: true,
    conduct: true,
  },
  "William and Mary": {
    degree: "A.A. or A.S.",
    gpa: 3.6,
    credits: 60,
    residency: true,
    conduct: true,
  },
  "James Madison University": {
    degree: "A.A. or A.S.",
    gpa: 3.0,
    credits: 60,
    residency: true,
    conduct: true,
  },
  "Old Dominion University": {
    degree: "A.A. or A.S.",
    gpa: 2.5,
    credits: 60,
    residency: false,
    conduct: true,
  },
  "Longwood University": {
    degree: "A.A. or A.S.",
    gpa: 2.5,
    credits: 60,
    residency: true,
    conduct: true,
  },
  "Radford University": {
    degree: "A.A. or A.S.",
    gpa: 2.8,
    credits: 60,
    residency: true,
    conduct: true,
  },
  "Virginia Commonwealth University": {
    degree: "A.A. or A.S.",
    gpa: 2.5,
    credits: 60,
    residency: true,
    conduct: true,
  },
};

function MyList({ list, removeFromList }) {
  const [gpa, setGpa] = useState("");
  const [degree, setDegree] = useState("AA");
  const [credits, setCredits] = useState("");
  const [resident, setResident] = useState(false);
  const [conduct, setConduct] = useState(false);
  const [qualifications, setQualifications] = useState({});

  const handleSave = () => {
    const parsedGpa = parseFloat(gpa);
    const parsedCredits = parseInt(credits);

    const newQualifications = {};
    list.forEach((college) => {
      const req = gaaRequirements[college.name];
      if (!req) return;
      const qualifies =
        (degree === "AA" || degree === "AS") &&
        parsedGpa >= req.gpa &&
        parsedCredits >= req.credits &&
        (!req.residency || resident) &&
        (!req.conduct || conduct);
      newQualifications[college.name] = qualifies;
    });

    setQualifications(newQualifications);
  };

  return (
    <div className="search-page mylist-page">
      <div className="your-stats-card">
        <h2>Your Stats</h2>
        <div className="form-group">
          <label>GPA</label>
          <input
            type="number"
            step="0.01"
            value={gpa}
            onChange={(e) => setGpa(e.target.value)}
            placeholder="e.g. 3.5"
          />
        </div>
        <div className="form-group">
          <label>Degree Type</label>
          <select value={degree} onChange={(e) => setDegree(e.target.value)}>
            <option value="AA">AA</option>
            <option value="AS">AS</option>
            <option value="AAS">AAS</option>
          </select>
        </div>
        <div className="form-group">
          <label>Credits Completed</label>
          <input
            type="number"
            value={credits}
            onChange={(e) => setCredits(e.target.value)}
            placeholder="e.g. 60"
          />
        </div>
        <div className="form-group checkbox">
          <label>
            <input
              type="checkbox"
              checked={resident}
              onChange={() => setResident(!resident)}
            />
            Virginia Resident
          </label>
        </div>
        <div className="form-group checkbox">
          <label>
            <input
              type="checkbox"
              checked={conduct}
              onChange={() => setConduct(!conduct)}
            />
            No Conduct Violations
          </label>
        </div>
        <button className="save-button" onClick={handleSave}>Save</button>
      </div>

      <div className="college-list-container adjusted-right">
        <h2>Your List</h2>
        <div className="college-list">
          {list.length === 0 ? (
            <p>Your list is empty.</p>
          ) : (
            list.map((college, index) => {
              const req = gaaRequirements[college.name];
              const isQualified = qualifications[college.name];
              return (
                <div className="college-card" key={index}>
                  <div className="college-card-inner">
                    <div className="college-info">
                      <h3>{college.name}</h3>
                      <p>GPA: {college.gpa}</p>
                      <p>{college.location}</p>
                      <p>{college.type}</p>
                      <p>Estimated Cost: {college.cost}</p>
                      <button onClick={() => removeFromList(college.name)}>Remove</button>

                      {typeof isQualified !== 'undefined' && (
                        <div className={isQualified ? "qualified-box" : "not-qualified-box"}>
                          {isQualified ? (
                            <p>✅ Qualified</p>
                          ) : (
                            <p>❌ Not Qualified</p>
                          )}
                        </div>
                      )}
                    </div>
                    {req && (
                      <div className="gaa-requirements">
                        <h4>GAA Requirements</h4>
                        <p><strong>Degree:</strong> {req.degree}</p>
                        <p><strong>Minimum GPA:</strong> {req.gpa}+</p>
                        <p><strong>Credits:</strong> {req.credits}</p>
                        <p><strong>Residency Required:</strong> {req.residency ? 'Yes' : 'No'}</p>
                        <p><strong>Conduct:</strong> {req.conduct ? 'No violations' : 'N/A'}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default MyList;

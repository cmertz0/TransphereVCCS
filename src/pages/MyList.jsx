import React from "react";
import "./Search.css";

function MyList({ list, removeFromList }) {
  return (
    <div className="search-page mylist-page">
      <div className="stats-box">
        <h2>Your Stats</h2>
        <form>
          <div className="form-row">
            <label>GPA</label>
            <input type="text" placeholder="e.g. 3.5" />
          </div>
          <div className="form-row">
            <label>Major</label>
            <input type="text" placeholder="e.g. Computer Science" />
          </div>
          <div className="form-row">
            <label>Degree Type</label>
            <select>
              <option value="AA">AA</option>
              <option value="AS">AS</option>
              <option value="AAS">AAS</option>
            </select>
          </div>
          <div className="form-row">
            <label>Credits Completed</label>
            <input type="number" placeholder="e.g. 60" />
          </div>
          <div className="form-row checkbox-row">
            <input type="checkbox" id="assoc-degree" />
            <label htmlFor="assoc-degree">Associates Degree Earned</label>
          </div>
          <div className="form-row">
            <label>Graduation Season</label>
            <select>
              <option value="Spring">Spring</option>
              <option value="Summer">Summer</option>
              <option value="Fall">Fall</option>
            </select>
          </div>
          <div className="form-row">
            <label>Graduation Year</label>
            <input type="number" placeholder="e.g. 2025" />
          </div>
          <div className="form-row checkbox-row">
            <input type="checkbox" id="va-native" />
            <label htmlFor="va-native">Virginia Native Student</label>
          </div>
        </form>
      </div>

      <div className="college-list-container">
        <h2>Your List</h2>
        <div className="college-list">
          {list.length === 0 ? (
            <p>Your list is empty.</p>
          ) : (
            list.map((college, index) => (
              <div className="college-card" key={index}>
                <img src={college.image} alt={college.name} />
                <div className="college-details">
                  <h3>{college.name}</h3>
                  <p>GPA: {college.gpa}</p>
                  <p>{college.location}</p>
                  <p>{college.type}</p>
                  <p>Estimated Cost: {college.cost}</p>
                  <button onClick={() => removeFromList(college.name)}>Remove</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default MyList;

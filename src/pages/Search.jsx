import React from 'react';
import './Search.css';
import placeholderImg from '../assets/uva-campus.jpg'; // placeholder image

function Search({ addToList, myList }) {
  const colleges = [
    {
      name: 'University of Virginia',
      image: placeholderImg,
      gpa: '3.8+',
      location: 'Charlottesville, VA',
      type: 'Public',
      cost: '$24K',
    },
    {
      name: 'George Mason University',
      image: placeholderImg,
      gpa: '3.0+',
      location: 'Fairfax, VA',
      type: 'Public',
      cost: '$22K',
    },
    {
      name: 'Virginia Tech',
      image: placeholderImg,
      gpa: '3.5+',
      location: 'Blacksburg, VA',
      type: 'Public',
      cost: '$23K',
    },
  ];

  return (
    <div className="search-page">
      <h2>Explore Colleges</h2>
      <input
        type="text"
        placeholder="Search for a school..."
        className="search-input"
        disabled
      />
      <div className="college-list">
        {colleges.map((college, index) => {
          const isAdded = myList.some(c => c.name === college.name);
          return (
            <div className="college-card" key={index}>
              <img src={college.image} alt={college.name} />
              <div className="college-details">
                <h3>{college.name}</h3>
                <p>GPA: {college.gpa}</p>
                <p>{college.location}</p>
                <p>{college.type}</p>
                <p>Estimated Cost: {college.cost}</p>
                {isAdded ? (
                  <button className="added">✔ Added</button>
                ) : (
                  <button onClick={() => addToList(college)}>Add to My List</button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Search;

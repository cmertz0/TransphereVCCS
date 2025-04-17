import React, { useState, useEffect } from 'react';
import './Search.css';
import placeholderImg from '../assets/uva-campus.jpg';

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function Search({ addToList, myList }) {
  const [location, setLocation] = useState(null);
  const [filter, setFilter] = useState({
    type: 'all',
    gpa: 'all',
    distance: 'all'
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      });
    }
  }, []);

  const colleges = [
    {
      name: 'University of Virginia',
      image: placeholderImg,
      gpa: 3.8,
      location: 'Charlottesville, VA',
      type: 'Public',
      cost: '$24K',
      lat: 38.0293,
      lng: -78.4767,
      website: 'https://www.virginia.edu/',
    },
    {
      name: 'George Mason University',
      image: placeholderImg,
      gpa: 3.0,
      location: 'Fairfax, VA',
      type: 'Public',
      cost: '$22K',
      lat: 38.8340,
      lng: -77.3126,
      website: 'https://www.gmu.edu/',
    },
    {
      name: 'Virginia Tech',
      image: placeholderImg,
      gpa: 3.5,
      location: 'Blacksburg, VA',
      type: 'Public',
      cost: '$23K',
      lat: 37.2296,
      lng: -80.4139,
      website: 'https://www.vt.edu/',
    },
    {
      name: 'Washington and Lee University',
      image: placeholderImg,
      gpa: 3.9,
      location: 'Lexington, VA',
      type: 'Private',
      cost: '$55K',
      lat: 37.7840,
      lng: -79.4428,
      website: 'https://www.wlu.edu/',
    },
  ];

  const filteredColleges = colleges.filter((college) => {
    const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filter.type === 'all' || college.type.toLowerCase() === filter.type;
    const matchesGPA = filter.gpa === 'all' || college.gpa >= parseFloat(filter.gpa);
    let matchesDistance = true;

    if (location && filter.distance !== 'all') {
      const distance = getDistanceFromLatLonInKm(
        location.lat,
        location.lng,
        college.lat,
        college.lng
      );
      matchesDistance = distance <= parseFloat(filter.distance);
    }

    return matchesSearch && matchesType && matchesGPA && matchesDistance;
  });

  return (
    <div className="search-page">
      <h2>Explore Colleges</h2>

      <input
        type="text"
        placeholder="Search for a school..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="filter-bar">
        <select value={filter.type} onChange={(e) => setFilter({ ...filter, type: e.target.value })}>
          <option value="all">All Types</option>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>

        <select value={filter.gpa} onChange={(e) => setFilter({ ...filter, gpa: e.target.value })}>
          <option value="all">Any GPA</option>
          <option value="2.5">2.5+</option>
          <option value="3.0">3.0+</option>
          <option value="3.5">3.5+</option>
          <option value="3.8">3.8+</option>
        </select>

        <select value={filter.distance} onChange={(e) => setFilter({ ...filter, distance: e.target.value })}>
          <option value="all">Any Distance</option>
          <option value="50">Within 50 km</option>
          <option value="100">Within 100 km</option>
          <option value="200">Within 200 km</option>
          <option value="500">Within 500 km</option>
          <option value="1000">Within 1000 km</option>
        </select>

        <select disabled>
          <option value="">More filters (coming soon)</option>
        </select>
      </div>

      <div className="college-list">
        {filteredColleges.map((college, index) => {
          const isAdded = myList.some((c) => c.name === college.name);
          return (
            <div className="college-card" key={index}>
              <img src={college.image} alt={college.name} />
              <div className="college-details">
                <h3>{college.name}</h3>
                <p>GPA: {college.gpa}</p>
                <p>{college.location}</p>
                <p>{college.type}</p>
                <p>Estimated Cost: {college.cost}</p>
                <div className="college-actions">
                  {isAdded ? (
                    <button className="action-button added">✔ Added</button>
                  ) : (
                    <button className="action-button" onClick={() => addToList(college)}>
                      Add to My List
                    </button>
                  )}
                  <a
                    href={college.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="action-button details-button"
                  >
                    School Details ↗
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Search;

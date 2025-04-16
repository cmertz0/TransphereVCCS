function MyList({ list, removeFromList }) {
    return (
      <div className="search-page">
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
    );
  }
  
  export default MyList;
  
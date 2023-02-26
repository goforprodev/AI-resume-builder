import { useState } from "react";
import Loading from "./Loading";
import "../index.css";

const Home = () => {
  const [fullname, setfullname] = useState("");
  const [currentPosition, setcurrentPosition] = useState("");
  const [currentLength, setcurrentLength] = useState(1);
  const [currentTechnologies, setcurrentTechnologies] = useState("");
  const [headshot, setHeadshot] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      fullname,
      currentPosition,
      currentLength,
      currentTechnologies,
      headshot,
    });
    setLoading(true);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="app">
      <h1>Resume Builder</h1>
      <p>Generate a good resume with AI</p>
      <form onSubmit={handleSubmit} method="POST" encType="multipart/form-data">
        <label htmlFor="fullname">Enter your full name</label>
        <input
          type="text"
          name="fullname"
          id="fullname"
          required
          value={fullname}
          onChange={(e) => setfullname(e.target.value)}
        />
        <div className="nestedContainer">
          <div>
            <label htmlFor="currentPosition">Current Position</label>
            <input
              type="text"
              name="currentPosition"
              id="currentPosition"
              required
              className="currentInput"
              value={currentPosition}
              onChange={(e) => setcurrentPosition(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="currentLength">For how long? (year)</label>
            <input
              type="number"
              name="currentLength"
              id="currentLength"
              required
              className="currentInput"
              value={currentLength}
              onChange={(e) => setcurrentLength(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="currentTechnologies">Technologies used</label>
            <input
              type="text"
              required
              name="currentTechnologies"
              className="currentInput"
              value={currentTechnologies}
              onChange={(e) => setcurrentTechnologies(e.target.value)}
            />
          </div>
        </div>
        <label htmlFor="photo">Upload your headshot image</label>
        <input
          type="file"
          name="photo"
          required
          id="photo"
          accept="image/x-png,image/jpeg"
          onChange={(e) => setHeadshot(e.target.files[0])}
        />
        <button>CREATE RESUME</button>
      </form>
    </div>
  );
};

export default Home;

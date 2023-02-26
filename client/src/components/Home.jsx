import { useState } from "react";
import Loading from "./Loading";
import "../index.css";

const Home = () => {
  const [fullname, setfullname] = useState("");
  const [currentPosition, setcurrentPosition] = useState("");
  const [currentLength, setcurrentLength] = useState(1);
  const [currentTechnologies, setcurrentTechnologies] = useState("");
  const [headshot, setHeadshot] = useState(null);
  const [companyInfo, setcompanyInfo] = useState([{ name: "", position: "" }]);
  const [loading, setLoading] = useState(false);

  // Handle for submit
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

  // handle add company
  const handleAddCompany = () => {
    setcompanyInfo([...companyInfo, { name: "", position: "" }]);
  };

  // handle removing a selected company from the list
  const handleRemoveCompany = (i) => {
    const newCompanyInfo = companyInfo.filter((company, index) => index !== i);
    setcompanyInfo(newCompanyInfo);
  };

  // handle update company info
  const handleUpdateCompany = (e, i) => {
    const { name, value } = e.target;
    const newCompanyInfo = [...companyInfo];
    newCompanyInfo[i][name] = value;
    setcompanyInfo(newCompanyInfo);
  };

  // handle loading state
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
        {/* Previous companies */}
        <h3>Companies you've worked at</h3>
        <form onSubmit={(e) => e.preventDefault()}>
          {companyInfo.map((company, index) => (
            <div className="nestedContainer" key={index}>
              <div className="companies">
                <label htmlFor="name">Company Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  onChange={(e) => handleUpdateCompany(e, index)}
                />
              </div>
              <div className="companies">
                <label htmlFor="position">Position Held</label>
                <input
                  type="text"
                  name="position"
                  required
                  onChange={(e) => handleUpdateCompany(e, index)}
                />
              </div>
              <div className="btn__group">
                {companyInfo.length - 1 === index && companyInfo.length < 4 && (
                  <button id="addBtn" onClick={handleAddCompany}>
                    Add
                  </button>
                )}
                {companyInfo.length > 1 && (
                  <button
                    id="deleteBtn"
                    onClick={() => handleRemoveCompany(index)}
                  >
                    Del
                  </button>
                )}
              </div>
            </div>
          ))}
        </form>
        <button>CREATE RESUME</button>
      </form>
    </div>
  );
};

export default Home;

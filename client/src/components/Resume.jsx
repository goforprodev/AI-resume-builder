import React from "react";
import ErrorPage from "./ErrorPage";

const Resume = ({ result }) => {
  if (JSON.stringify(result) === "{}") {
    return <ErrorPage />;
  }

  const handlePrint = () => alert("Print Succesful");

  return (
    <>
      <button onClick={handlePrint}>Print page</button>
      <main className="container">
        <p>Hello!</p>
      </main>
    </>
  );
};

export default Resume;

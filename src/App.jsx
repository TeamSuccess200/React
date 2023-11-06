import { useEffect, useState } from "react";

function App() {
  const [inquiry, setInquiry] = useState({});

  const fetchInquiry = () => {
    fetch('http://localhost:8080/inquiries/1')
      .then(response => {
        if (response.ok)
          return response.json();
        else
          throw new Error("Error in fetch: " + response.statusText);
      })
      .then(data => setInquiry(data))
      .catch(err => console.error(err))
  }

  useEffect(() => {
    fetchInquiry();
  }, []);

  return (
    <>
      <h1>{inquiry.name}</h1>
      <p>{inquiry.description}</p>
    </>
  )
}

export default App

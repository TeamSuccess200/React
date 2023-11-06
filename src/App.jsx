import { useEffect, useState } from "react";

function App() {
  const [inquiry, setInquiry] = useState({
    name: "",
    description: "",
    questions: [],
  });

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
      <div>
        <h2>Inquiry</h2>
        <table>
          <tbody>
            <tr><th>Question</th></tr>
            {inquiry.questions.map((question) => 
              <tr key={question.questionid}>
                <td>{question.questiontext}</td>
              </tr> 
              )}
          </tbody>
        </table>  
      </div>
    </>
  )
}

export default App

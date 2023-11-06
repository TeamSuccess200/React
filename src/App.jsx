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
      <div>
        <h2>{inquiry.name}</h2>
        <h3>{inquiry.description}</h3>
        <form>
        <table>
          <tbody>
            <tr><th>Questions</th></tr>
            {inquiry.questions.map((question) => 
              <tr key={question.questionid}>
                <td>{question.questiontext}</td>
                <td><input type = "text" value={question.answertext} /></td>
              </tr> 
              )}
          </tbody>
        </table>
        <button type="submit" value="submit"> Submit </button>
        </form>  
      </div>
    </>
  )
}

export default App

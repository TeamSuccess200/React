import { useEffect, useState } from "react";

function App() {

  const [inquiry, setInquiry] = useState({
    name: "",
    description: "",
    questions: [],
  });


  const [answer, setAnswer] = useState([
    // answer on taulukko olioita joiden tämänhetkinen ainoa attribuutti on answertext
    // HUOM, riittää että answertext on määritely fetchInquiry metodissa- tähän riittää siis pelkän tyhjän taulukon luonti
    /*     {
          answertext: ''
        } */
  ]);

  const fetchInquiry = () => {
    fetch('http://localhost:8080/inquiries/1')
      .then(response => {
        if (response.ok)
          return response.json();
        else
          throw new Error("Error in fetch: " + response.statusText);
      })
      .then(data => {
        setInquiry(data);

        //jokaiselle kysymykselle initialisoidaan oma answertext olio jonka lähtöarvo on tyhjä String
        setAnswer(data.questions.map(() => ({ answertext: "" })));
      })
      .catch(err => console.error(err));
  }

  useEffect(() => {
    fetchInquiry();
  }, []);

  const handleChange = (e, index) => {
    const newAnswers = [...answer];

    //Muuttaa tietyllä indeksipaikalla olevan vastausolion arvoa, e.target.name nappaa kentän nimen ja e.target.value kenttään käyttäjän syöttämän arvon
    newAnswers[index] = { ...newAnswers[index], [e.target.name]: e.target.value };
    setAnswer(newAnswers);
  }

  return (
    <>
      <div>
        <h2>{inquiry.name}</h2>
        <h3>{inquiry.description}</h3>
        <form>
          <table>
            <tbody>
              <tr><th>Questions</th></tr>
              {inquiry.questions.map((question, index) =>
                <tr key={question.questionid}>
                  <td>{question.questiontext}</td>
                  <td><input type="text" name="answertext" data-index={index} value={answer[index].answertext} onChange={(e) => handleChange(e, index)} /></td>
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

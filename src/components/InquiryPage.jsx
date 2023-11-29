import React, { useEffect, useState } from "react";

function InquiryPage({ inquiryId, onSubmit }) {
  const [inquiry, setInquiry] = useState({
    name: "",
    description: "",
    questions: [],
    isrequired: null,
  });

  const [answers, setAnswers] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isRequired, setIsRequired] = useState(inquiry.isrequired);

  const fetchInquiry = () => {
    fetch(`http://localhost:8080/inquiries/${inquiryId}`)
      .then((response) => {
        if (response.ok) return response.json();
        else throw new Error("Error in fetch: " + response.statusText);
      })
      .then((data) => {
        setInquiry(data);

        setAnswers(
          data.questions.map((question) => ({
            answertext: "",
            question: question,
          }))
        );
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchInquiry();
  }, [inquiryId]);

  useEffect(() => {
    setIsRequired(inquiry.isrequired);
  }, [inquiry]);

  const handleChange = (e, index) => {
    const newAnswers = [...answers];
    newAnswers[index] = { ...newAnswers[index], answertext: e.target.value };
    setAnswers(newAnswers);
  };

  const saveAnswer = (event) => {
    event.preventDefault();

    const answersWithQuestionId = answers.map((answer) => ({
      answertext: answer.answertext,
      question: { questionid: answer.question.questionid },
    }));

    fetch("http://localhost:8080/answers", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(answersWithQuestionId),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Error when adding an answer: " + response.statusText
          );
        }
        console.log("Answer submitted successfully");
        setAnswers(
          answers.map((answer) => ({
            answertext: "",
            question: answer.question,
          }))
        );
        setIsSubmitted(true);
        if (onSubmit) {
          onSubmit();
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div>
        <h2>{inquiry.name}</h2>
        <h3>{inquiry.description}</h3>
        <form onSubmit={saveAnswer}>
          <table>
            <tbody>
              <tr>
                <th>Questions</th>
              </tr>
              <br />
              <tr>
                <td style={{ color: "red" }}>
                  (Questions with * are required)
                </td>
              </tr>
              {inquiry.questions.map((question, index) => (
                <tr key={question.questionid}>
                  <td>
                    {question.isrequired && (
                      <span style={{ color: "red" }}>*</span>
                    )}
                    {question.questiontext}
                  </td>
                  {question.questiontype === "text" && (
                    <td>
                      <input
                        type="text"
                        name="answertext"
                        value={answers[index].answertext}
                        onChange={(e) => handleChange(e, index)}
                        required={question.isrequired}
                      />
                    </td>
                  )}

                  {question.questiontype === "radio" && (
                    <td>
                      {question.questionoptions
                        .split(", ")
                        .map((option, optionIndex) => (
                          <div key={optionIndex}>
                            <input
                              type="radio"
                              name={`radio_${index}`}
                              value={option}
                              checked={answers[index].answertext === option}
                              onChange={(e) => handleChange(e, index)}
                              required={question.isrequired}
                            />
                            {option}
                          </div>
                        ))}
                    </td>
                  )}

                  {/* työn alla */}
                  {question.questiontype === "range" && (
                    <>
                      <td>{question.questiontext}</td>
                      <td>
                        {question.min}
                        <input
                          type="range"
                          name="answertext"
                          value={answers[index].answertext}
                          onChange={(e) => handleChange(e, index)}
                          required={question.isrequired}
                          step="1"
                          min={question.min}
                          max={question.max}
                        />
                        {question.max}
                      </td>
                    </>
                  )}




                </tr>
              ))}
            </tbody>
          </table>
          <input type="submit" value="Submit" />
        </form>
        {isSubmitted && <p>Answers submitted successfully!</p>}
      </div>
    </>
  );
}

export default InquiryPage;

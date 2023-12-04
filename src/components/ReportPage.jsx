import React, { useEffect, useState } from "react";

function ReportPage({ inquiryId }) {
  const [inquiry, setInquiry] = useState({});

  const fetchInquiry = () => {
    fetch(`http://localhost:8080/inquiries/${inquiryId}`)
      .then((response) => {
        if (response.ok) return response.json();
        else throw new Error("Error in fetch: " + response.statusText);
      })
      .then((data) => {
        setInquiry(data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchInquiry();
  }, [inquiryId]);

  return (
    <>
      <h1>Specific answers</h1>
      <h3>{inquiry.name}</h3>
      <h4>{inquiry.description}</h4>

      <ul>
        {inquiry.questions &&
          inquiry.questions.map((question) => (
            <li key={question.questionid}>
              <p>{question.questiontext}</p>

              <ul>
                {question.answers &&
                  question.answers.map((answer) => (
                    <li key={answer.answerId}>
                      <p>{answer.answertext}</p>
                    </li>
                  ))}
              </ul>
            </li>
          ))}
      </ul>
    </>
  );
}

export default ReportPage;

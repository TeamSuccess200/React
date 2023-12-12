import React, { useEffect, useState } from "react";
import PieChartComponent from "./Piechart";

function ReportPage({ inquiryId }) {
  const [inquiry, setInquiry] = useState({});
  const inquiryProps = inquiryId;

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

  const isRadioQuestion = (question) => question.questiontype === "radio";

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

              {isRadioQuestion(question) ? (
                <PieChartComponent
                  inquiryProps={inquiryProps}
                  questionid={question.questionid}
                />
              ) : (
                <>
                  {question.questiontype === "text" ? (
                    <ul>
                      {question.answers &&
                        question.answers.map((answer) => (
                          <li key={answer.answerId}>
                            <p>{answer.answertext}</p>
                          </li>
                        ))}
                    </ul>
                  ) : null}

                  {question.questiontype === "range" ? (
                    <ul>
                      {question.answers &&
                        question.answers.map((answer) => (
                          <li key={answer.answerId}>
                            <p>{answer.rangeAnswer}</p>
                          </li>
                        ))}
                    </ul>
                  ) : null}
                </>
              )}
            </li>
          ))}





      </ul>
    </>
  );
}

export default ReportPage;

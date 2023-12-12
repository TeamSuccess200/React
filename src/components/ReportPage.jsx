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
    <div className="container mt-5" style={{ marginLeft: "20px" }}>
      <h1 className="mb-4">Specific report</h1>
      <h4 className="display-6">{inquiry.name}</h4>
      <h5 className="display-7">{inquiry.description}</h5>

      <ul className="list-group">
        {inquiry.questions &&
          inquiry.questions.map((question) => (
            <li key={question.questionid} className="list-group-item mb-3">
              <h5>{question.questiontext}</h5>

              {isRadioQuestion(question) ? (
                <PieChartComponent
                  inquiryProps={inquiryProps}
                  questionid={question.questionid}
                />
              ) : (
                <>
                  {question.questiontype === "text" ? (
                    <ul className="list-group">
                      {question.answers &&
                        question.answers.map((answer) => (
                          <li key={answer.answerId} className="list-group-item">
                            <p>{answer.answertext}</p>
                          </li>
                        ))}
                    </ul>
                  ) : null}

                  {question.questiontype === "range" ? (
                    <ul className="list-group">
                      {question.answers &&
                        question.answers.map((answer) => (
                          <li key={answer.answerId} className="list-group-item">
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
    </div>
  );
}

export default ReportPage;

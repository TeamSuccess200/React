import {useState, useEffect} from 'react';

function Answers() {
    const [inquiries, setInquiries] = useState([]);

    const fetchInquiries = () => {
        fetch('http://localhost:8080/inquiries')
          .then(response => {
            if (response.ok)
              return response.json();
            else
              throw new Error("Error in fetch: " + response.statusText);
          })
          .then(data => {
            setInquiries(data);
          })
          .catch(err => console.error(err));
      }
    
      useEffect(() => {
        fetchInquiries();
      }, []);

    return (
        <>
            <h1>Answers</h1>

            <div>
                {inquiries.map((inquiry) => (
                    <div key={inquiry.inquiryId}>
                        <h3>{inquiry.name}</h3>
                        <h4>{inquiry.description}</h4>

                        <ul>
                            {inquiry.questions.map((question) => (
                                <li key={question.questionid}>
                                    <p>{question.questiontext}</p>

                                    <ul>
                                        {question.answers.map((answer) => (
                                            <li key={answer.answerId}>
                                                <p>{answer.answertext}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Answers
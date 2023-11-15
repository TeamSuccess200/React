import { useEffect, useState } from "react";

function InquiryList() {
    const [inquiry, setInquiry] = useState({
        name: "",
        description: "",
        questions: [],
    });

    const [answers, setAnswers] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);

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

                /* mappaa läpi backendin datasta kysymyslistan, ja luo listan vastausolioita joilla on 
                attribuutit answertext ja question, jotka alustetaan alkuun tyhjiksi */
                setAnswers(data.questions.map(question => ({ answertext: "", question: question })));
            })
            .catch(err => console.error(err));
    }

    useEffect(() => {
        fetchInquiry();
    }, []);

    /* handleChange: käyttäjä kirjoittaa vastauskenttään */
    const handleChange = (e, index) => {
        /* Luo kopion answers listasta, jotta ei suoraan muokata alkuperäistä statea */
        const newAnswers = [...answers];

        /* Päivittää tietyllä newAnswers-listan indeksipaikalla olevan tyhjän vastausolion 
        answertext-attribuutin käyttäjän syöttämäksi vastaukseksi */
        newAnswers[index] = { ...newAnswers[index], answertext: e.target.value };
        setAnswers(newAnswers);
    }

    /* saveAnswer: kun käyttäjä klikkaa submit-painiketta */
    const saveAnswer = (event) => {
        event.preventDefault();

        /* mapataan läpi vastaus-listan sisältö, jokaselle vastaus-listan sisältämälle oliolle
        asetetaan answertext ja question-attribuuteille arvot
        - answer.answertext (käyttäjän syöttämä vastaus)
        - questionid: answer.question.questionid (kysymyksen id saadaan kysymysoliolta)  */
        const answersWithQuestionId = answers.map(answer => ({
            answertext: answer.answertext,
            question: { questionid: answer.question.questionid }
        }));

        /* backendille lähetetään vastaukset jotka sisältävät myös kysymysid:n */
        fetch('http://localhost:8080/answers', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(answersWithQuestionId)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error when adding an answer: " + response.statusText);
                }
                console.log("Answer submitted successfully");
                /* Tyhejnnetään kaikki vastauskentät, jos lähetys backendille on onnistunut */
                setAnswers(answers.map(answer => ({ answertext: "", question: answer.question })));

                /* vaihdetaan isSubmitted boolean true, jotta käyttäjälle voidaan renderöidä viesti
                vastausten onnistuneesta tallennuksesta */
                setIsSubmitted(true);
            })
            .catch(err => console.error(err));
    };

    /* Mapataan jokainen kyselyn kysymys ja renderöidään joka kysymys omalla rivillään.
    Jokaisella rivillä on oma yksilöllinen id (questionid).
    Vastauskentän value on tietyllä indeksipaikalla olevan vastausolion answertext-attribuutti. */
    return (
        <>
            <div>
                <h2>{inquiry.name}</h2>
                <h3>{inquiry.description}</h3>
                <form onSubmit={saveAnswer}>
                    <table>
                        <tbody>
                            <tr><th>Questions</th></tr>
                            {inquiry.questions.map((question, index) =>
                                <tr key={question.questionid}>
                                    <td>{question.questiontext}</td>
                                    <td><input type="text" name="answertext" value={answers[index].answertext} onChange={(e) => handleChange(e, index)} /></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <input type="submit" value="Submit" />
                </form>
                {isSubmitted && <p>Answers submitted successfully!</p>}
            </div>
        </>
    )
}

export default InquiryList;

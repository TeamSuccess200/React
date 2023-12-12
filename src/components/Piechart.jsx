import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

function PieChartComponent({ inquiryProps, questionid }) {

    const [answers, setAnswers] = useState([]);
    const inquiryId = inquiryProps;

    const fetchAnswers = async () => {
        try {
            const response = await fetch(`http://localhost:8080/inquiries/${inquiryId}`);
            if (!response.ok) {
                throw new Error("Error in fetch: " + response.statusText);
            }
            const data = await response.json();
            const surveyData = data;
            const answerCounts = {};

            //Lasketaan vastausten määrä kysymyksittäin
            surveyData.questions.forEach(question => {
                const questionId = question.questionid;

                //tarkistetaan, onko kysymyksellä vastaus
                if (question.answers && question.answers.length > 0) {
                    question.answers.forEach(answer => {
                        const answerText = answer.answertext;

                        //Lasketaan vastausten esiintymismäärä questionId:n perusteella
                        answerCounts[questionId] = answerCounts[questionId] || {}; //tarkistaa, onko kyseisellä questionilla jo laskuri, jos ei, alustetaan se tyhjällä objektilla
                        answerCounts[questionId][answerText] = (answerCounts[questionId][answerText] || 0) + 1; // tallentaa vastausten määrän; jos vastausta ei ole vielä olemassa, alusta se nollaksi, ja sitten lisää yksi
                    });
                }
            });

            const targetQuestionId = questionid;
            let transformedData = null;

            //muunnetaan data muotoon jonka piechart komponentti hyväksyy
            if (answerCounts[targetQuestionId]) {
                transformedData = Object.entries(answerCounts[targetQuestionId]).map(([name, value]) => ({
                    name,
                    value,
                }));
            } else {
                console.log(`Question with ID ${targetQuestionId} not found.`);
            }
            setAnswers(transformedData);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchAnswers();
    }, [inquiryId]);

    const COLORS = ['#8F2D2D', '#8F5F2D', '#558F2D', '#2D8F80', '#2D6C8F', '#2D388F', '#5C2D8F', '#8F2D7E', '#8F2D48', '#4A0606'];

    return (
        <>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={answers}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={80}
                        fill="#295332"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}`}
                    >

                        {answers && answers.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </>
    )
}

export default PieChartComponent
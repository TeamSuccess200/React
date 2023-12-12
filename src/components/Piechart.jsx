import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

function PieChartComponent({ inquiryProps, questionid }) {

    const [answers, setAnswers] = useState([]);
    const inquiryId = inquiryProps;

    /* Hakee vastaukset ja antaa niille arvon, kuinka monta kertaa vastaus esiintyy */
    const fetchAnswers = async () => {
        try {
            const response = await fetch(`http://localhost:8080/inquiries/${inquiryId}`);
            if (!response.ok) {
                throw new Error("Error in fetch: " + response.statusText);
            }
            const data = await response.json();

            const surveyData = data;

            // Create an object to store the counts
            const answerCounts = {};

            // Iterate through questions in the survey
            surveyData.questions.forEach(question => {
                const questionId = question.questionid;

                // Check if the question has answers
                if (question.answers && question.answers.length > 0) {
                    // Iterate through answers for the question
                    question.answers.forEach(answer => {
                        const answerText = answer.answertext;

                        // If the answerText is not already in the counts object, initialize it to 1
                        // Otherwise, increment the count
                        answerCounts[questionId] = answerCounts[questionId] || {};
                        answerCounts[questionId][answerText] = (answerCounts[questionId][answerText] || 0) + 1;
                    });
                }
            });
            // convert

            // const answerCounts = answers.questionid;
            // Convert answerCounts to the desired format
            // Specify the questionId you want to transform
            const targetQuestionId = questionid;
            let transformedData = null;
            // Check if the specified questionId exists in answerCounts
            if (answerCounts[targetQuestionId]) {
                // Transform the counts into the desired format
                transformedData = Object.entries(answerCounts[targetQuestionId]).map(([name, value]) => ({
                    name,
                    value,
                }));

                // Output the result
                // console.log(transformedData);
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


    // console.log(answers);
    //console.log(countAnswers());


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
                        // label={(answers) => { return (answers.name) }}
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
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StyleInterno.css';

const Questionario = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3001/questionario/perguntas`)
            .then(response => {
                setQuestions(response.data);
            })
            .catch(error => {
                console.error('Erro ao carregar perguntas:', error);
            });
    }, []);

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    const handleNextClick = () => {
        if (selectedOption !== null) {
            // Save response (could add an API call here)

            // Move to next question or submit
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setSelectedOption(null);
            } else {
                console.log('End of questions');
                // Implement submission logic here
            }
        }
    };

    return (
        <div className="screen-container">
            <div className="question-box">
                {questions.length > 0 && (
                    <>
                        <h2 className="question-text">{questions[currentQuestionIndex].pergunta}</h2>
                        <div className="options-container">
                            {['Sim', 'Não'].map((option, index) => (
                                <div
                                    key={index}
                                    className={`option-button ${selectedOption === option ? 'selected' : ''}`}
                                    onClick={() => handleOptionSelect(option)}
                                >
                                    {option}
                                </div>
                            ))}
                        </div>
                        <button className="next-button" onClick={handleNextClick}>Prosseguir</button>
                    </>
                )}
            </div>
            <div className="back-button">⟵ Voltar</div>
        </div>
    );
};

export default Questionario;

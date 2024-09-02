import React from 'react';

const ImageQuestion = ({ question, onAnswerSelect }) => {
    return (
        <div>
            <h2>{question.text}</h2>
            <img src={question.imageUrl} alt="Question related" />
            <div>
                {question.options.map((option, index) => (
                    <button key={index} onClick={() => onAnswerSelect(option)}>
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ImageQuestion;

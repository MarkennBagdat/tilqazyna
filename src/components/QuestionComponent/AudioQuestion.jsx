import React from 'react';

const AudioQuestion = ({ question, onAnswerSelect }) => {
    return (
        <div>
            <h2>{question.text}</h2>
            <audio controls>
                <source src={question.audioUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
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

export default AudioQuestion;

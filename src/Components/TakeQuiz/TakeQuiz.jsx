import React, { useEffect, useState } from 'react';

const TakeQuiz = () => {
    const [quiz, setQuiz] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const savedQuiz = localStorage.getItem('savedQuiz');
        if (savedQuiz) {
            setQuiz(JSON.parse(savedQuiz));
        }
    }, []);

    const handleSelect = (questionIndex, option) => {
        if (!submitted) {
            setSelectedAnswers({
                ...selectedAnswers,
                [questionIndex]: option,
            });
        }
    };

    const handleSubmit = () => {
        if (Object.keys(selectedAnswers).length < quiz.questions.length) {
            alert('⚠️ Please answer all questions before submitting.');
            return;
        }
        setSubmitted(true);
    };

    if (!quiz) {
        return (
            <div className="text-center text-gray-500 mt-16 text-xl font-medium">
                🚫 No quiz available.
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-6 py-10">
            <div className="bg-white shadow-2xl rounded-3xl p-8 border border-indigo-200">
                <h1 className="text-4xl font-bold text-indigo-900 mb-2">{quiz.title}</h1>
                <p className="text-gray-600 mb-8">{quiz.description}</p>

                {quiz.questions.map((q, index) => (
                    <div key={index} className="mb-10">
                        <p className="text-lg font-semibold text-indigo-800 mb-3">
                            {index + 1}. {q.question}
                        </p>
                        <ul className="space-y-3">
                            {q.options.map((opt, i) => {
                                const isSelected = selectedAnswers[index] === opt;
                                const isCorrectAnswer = opt === q.correctAnswer;
                                const isUserCorrect = isSelected && isCorrectAnswer;
                                const isUserWrong = isSelected && !isCorrectAnswer;

                                let baseStyle = 'flex items-center justify-between px-5 py-3 rounded-xl border transition-all cursor-pointer';
                                let styles = 'bg-white border-gray-300 text-gray-800 hover:bg-indigo-50';
                                let icon = null;

                                if (submitted) {
                                    if (isUserCorrect) {
                                        styles = 'bg-green-100 border-green-500 text-green-900';
                                        icon = '✅';
                                    } else if (isUserWrong) {
                                        styles = 'bg-red-100 border-red-500 text-red-900';
                                        icon = '❌';
                                    } else if (isCorrectAnswer) {
                                        styles = 'bg-green-50 border-green-300 text-green-700';
                                        icon = '✔';
                                    } else {
                                        styles = 'bg-gray-100 border-gray-300 text-gray-500';
                                    }
                                } else if (isSelected) {
                                    styles = 'bg-indigo-100 border-indigo-400 text-indigo-800';
                                }

                                return (
                                    <li
                                        key={i}
                                        className={`${baseStyle} ${styles}`}
                                        onClick={() => handleSelect(index, opt)}
                                    >
                                        <span className="flex-1">{opt}</span>
                                        {submitted && icon && <span className="ml-2">{icon}</span>}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}

                {!submitted ? (
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-indigo-700 hover:bg-indigo-800 text-white py-3 rounded-xl font-semibold shadow-md transition transform hover:scale-[1.02]"
                    >
                        Submit Quiz
                    </button>
                ) : (
                    <div className="mt-8 text-center text-green-700 font-semibold text-xl">
                        ✅ Quiz submitted!
                        <p className="mt-2 text-indigo-800">
                            Your Score:{' '}
                            <span className="font-bold">
                                {
                                    quiz.questions.filter((q, i) => selectedAnswers[i] === q.correctAnswer).length
                                } / {quiz.questions.length}
                            </span>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TakeQuiz;

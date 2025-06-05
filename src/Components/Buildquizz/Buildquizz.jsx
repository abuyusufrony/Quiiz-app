import React, { useState } from 'react';

const Buildquizz = () => {
    const [quizTitle, setQuizTitle] = useState('');
    const [quizDescription, setQuizDescription] = useState('');
    const [question, setQuestion] = useState('');
    const [optionInput, setOptionInput] = useState('');
    const [options, setOptions] = useState([]);
    const [correctOptionIndex, setCorrectOptionIndex] = useState(null);
    const [questions, setQuestions] = useState([]);

    const handleAddOption = () => {
        if (optionInput.trim()) {
            setOptions([...options, optionInput.trim()]);
            setOptionInput('');
        }
    };

    const handleAddQuestion = () => {
        if (question.trim() && options.length > 0 && correctOptionIndex !== null) {
            setQuestions([
                ...questions,
                {
                    question,
                    options,
                    correctAnswer: options[correctOptionIndex],
                },
            ]);
            setQuestion('');
            setOptions([]);
            setCorrectOptionIndex(null);
        } else {
            alert('Please complete the question, options, and select the correct answer.');
        }
    };

    const handleDeleteQuestion = (indexToDelete) => {
        setQuestions(questions.filter((_, index) => index !== indexToDelete));
    };

    const handleSaveQuiz = () => {
        if (!quizTitle.trim()) {
            alert('Please enter a quiz title before saving.');
            return;
        }
        if (questions.length === 0) {
            alert('Please add at least one question before saving the quiz.');
            return;
        }

        const quiz = {
            title: quizTitle.trim(),
            description: quizDescription.trim(),
            questions,
        };

        // Save to localStorage
        localStorage.setItem('savedQuiz', JSON.stringify(quiz));

        alert('Quiz saved! Redirecting to view page...');

        // Navigate to the view page (using React Router)
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-200 p-6">
            <div className="bg-white shadow-2xl rounded-3xl p-8 max-w-3xl w-full">
                <h1 className="text-4xl font-extrabold text-center text-indigo-900 mb-10 tracking-wide">
                    Quiz Builder
                </h1>

                {/* Quiz Title */}
                <div className="mb-6">
                    <label htmlFor="quizTitle" className="block text-indigo-700 font-semibold mb-2 text-lg">
                        Quiz Title
                    </label>
                    <input
                        id="quizTitle"
                        type="text"
                        value={quizTitle}
                        onChange={(e) => setQuizTitle(e.target.value)}
                        className="w-full px-5 py-3 rounded-xl border border-indigo-300 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition"
                        placeholder="Enter quiz title"
                        autoComplete="off"
                    />
                </div>

                {/* Quiz Description */}
                <div className="mb-8">
                    <label htmlFor="quizDescription" className="block text-indigo-700 font-semibold mb-2 text-lg">
                        Quiz Description
                    </label>
                    <textarea
                        id="quizDescription"
                        value={quizDescription}
                        onChange={(e) => setQuizDescription(e.target.value)}
                        className="w-full px-5 py-3 rounded-xl border border-indigo-300 focus:outline-none focus:ring-4 focus:ring-purple-400 transition"
                        placeholder="Enter a short description of the quiz"
                        rows={4}
                        spellCheck={false}
                    />
                </div>

                {/* Question Input */}
                <div className="mb-5">
                    <label htmlFor="questionInput" className="block text-indigo-700 font-semibold mb-2 text-lg">
                        Enter a Question
                    </label>
                    <input
                        id="questionInput"
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        className="w-full px-5 py-3 rounded-xl border border-indigo-300 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition"
                        placeholder="E.g. What is the capital of France?"
                        autoComplete="off"
                    />
                </div>

                {/* Option Input */}
                <div className="flex items-center gap-3 mb-6">
                    <input
                        type="text"
                        value={optionInput}
                        onChange={(e) => setOptionInput(e.target.value)}
                        className="flex-1 px-5 py-3 rounded-xl border border-indigo-300 focus:outline-none focus:ring-4 focus:ring-green-400 transition"
                        placeholder="Add an option"
                        autoComplete="off"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddOption();
                            }
                        }}
                    />
                    <button
                        onClick={handleAddOption}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition transform hover:scale-105"
                        aria-label="Add option"
                    >
                        + Option
                    </button>
                </div>

                {/* Options List with correct option selector */}
                {options.length > 0 && (
                    <ul className="mb-7 space-y-3">
                        {options.map((opt, idx) => (
                            <li
                                key={idx}
                                className={`flex justify-between items-center px-5 py-3 rounded-xl cursor-pointer select-none transition-shadow ${correctOptionIndex === idx
                                    ? 'bg-green-200 border border-green-500 shadow-lg'
                                    : 'bg-indigo-50 hover:bg-indigo-100'
                                    }`}
                                onClick={() => setCorrectOptionIndex(idx)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        setCorrectOptionIndex(idx);
                                    }
                                }}
                            >
                                <span className="text-indigo-900 font-medium">{idx + 1}. {opt}</span>
                                {correctOptionIndex === idx && (
                                    <span className="text-green-700 font-bold flex items-center gap-1">
                                        ✅ Correct
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>
                )}

                {/* Button to add question */}
                <button
                    onClick={handleAddQuestion}
                    className="w-full bg-indigo-700 hover:bg-indigo-800 text-white py-3 rounded-xl font-semibold shadow-lg transition transform hover:scale-[1.03]"
                    aria-label="Add question"
                >
                    Add Question
                </button>

                {/* Display added questions */}
                {questions.length > 0 && (
                    <section className="mt-10">
                        <h3 className="text-2xl font-bold mb-6 text-indigo-900 tracking-wide">Questions to be saved</h3>
                        {questions.map((q, index) => (
                            <article
                                key={index}
                                className="mb-6 p-6 bg-indigo-50 rounded-2xl shadow-md relative border border-indigo-200"
                            >
                                <button
                                    onClick={() => handleDeleteQuestion(index)}
                                    className="absolute top-4 right-4 text-red-600 hover:text-red-800 text-xl transition"
                                    aria-label={`Delete question ${index + 1}`}
                                >
                                    🗑
                                </button>
                                <p className="font-semibold text-indigo-900 mb-3 text-lg">
                                    {index + 1}. {q.question}
                                </p>
                                <ul className="list-disc list-inside text-indigo-800 space-y-1">
                                    {q.options.map((opt, i) => (
                                        <li
                                            key={i}
                                            className={`${opt === q.correctAnswer ? 'font-bold text-green-700' : ''
                                                }`}
                                        >
                                            {opt} {opt === q.correctAnswer && <span>✅</span>}
                                        </li>
                                    ))}
                                </ul>
                            </article>
                        ))}
                    </section>
                )}

                {/* Save entire quiz */}
                <button
                    onClick={handleSaveQuiz}
                    className="mt-8 w-full bg-purple-700 hover:bg-purple-800 text-white py-3 rounded-xl font-semibold shadow-lg transition transform hover:scale-[1.03]"
                    aria-label="Save quiz"
                >
                    Save Quiz
                </button>
            </div>
        </div>
    );
};

export default Buildquizz;

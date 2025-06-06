import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';

const Buildquizz = () => {
    const [quizTitle, setQuizTitle] = useState('');
    const [quizDescription, setQuizDescription] = useState('');
    const [question, setQuestion] = useState('');
    const [optionInput, setOptionInput] = useState('');
    const [options, setOptions] = useState([]);
    const [correctOptionIndex, setCorrectOptionIndex] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [quizSaved, setQuizSaved] = useState(false);

    const navigate = useNavigate();

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

        localStorage.setItem('savedQuiz', JSON.stringify(quiz));
        setQuizSaved(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 p-4 sm:p-6 flex justify-center items-start overflow-auto">
            <div className="bg-white shadow-2xl rounded-3xl p-5 sm:p-8 w-full max-w-3xl">
                <h1 className="text-2xl sm:text-4xl font-extrabold text-center text-indigo-900 mb-8 sm:mb-10">
                    📘 Quiz Builder
                </h1>

                {/* Title */}
                <div className="mb-5">
                    <label className="block text-indigo-700 font-medium mb-1">Quiz Title</label>
                    <input
                        type="text"
                        value={quizTitle}
                        onChange={(e) => setQuizTitle(e.target.value)}
                        className="w-full px-4 py-2 sm:py-3 rounded-lg border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        placeholder="Enter quiz title"
                    />
                </div>

                {/* Description */}
                <div className="mb-6">
                    <label className="block text-indigo-700 font-medium mb-1">Quiz Description</label>
                    <textarea
                        value={quizDescription}
                        onChange={(e) => setQuizDescription(e.target.value)}
                        rows={3}
                        className="w-full px-4 py-2 sm:py-3 rounded-lg border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        placeholder="Short quiz description"
                    />
                </div>

                {/* Question */}
                <div className="mb-4">
                    <label className="block text-indigo-700 font-medium mb-1">New Question</label>
                    <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        className="w-full px-4 py-2 sm:py-3 rounded-lg border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        placeholder="E.g., What is the capital of France?"
                    />
                </div>

                {/* Option Input */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
                    <input
                        type="text"
                        value={optionInput}
                        onChange={(e) => setOptionInput(e.target.value)}
                        className="flex-1 px-4 py-2 sm:py-3 rounded-lg border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                        placeholder="Add an option"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddOption();
                            }
                        }}
                    />
                    <button
                        onClick={handleAddOption}
                        className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 sm:py-3 rounded-lg font-semibold transition hover:scale-105"
                    >
                        + Option
                    </button>
                </div>

                {/* Option List */}
                {options.length > 0 && (
                    <ul className="mb-6 space-y-2">
                        {options.map((opt, idx) => (
                            <li
                                key={idx}
                                onClick={() => setCorrectOptionIndex(idx)}
                                className={`px-4 py-3 rounded-xl cursor-pointer transition-shadow ${correctOptionIndex === idx
                                    ? 'bg-green-100 border border-green-500 font-bold text-green-800'
                                    : 'bg-indigo-50 hover:bg-indigo-100'
                                    }`}
                            >
                                {idx + 1}. {opt}
                                {correctOptionIndex === idx && <span className="ml-2">✅</span>}
                            </li>
                        ))}
                    </ul>
                )}

                {/* Add Question Button */}
                <button
                    onClick={handleAddQuestion}
                    className="w-full bg-indigo-700 hover:bg-indigo-800 text-white py-3 rounded-xl font-semibold shadow-md transition hover:scale-[1.03]"
                >
                    ➕ Add Question
                </button>

                {/* Display Questions */}
                {questions.length > 0 && (
                    <div className="mt-10 space-y-5">
                        <h3 className="text-xl font-semibold text-indigo-800">Questions Added</h3>
                        {questions.map((q, i) => (
                            <div
                                key={i}
                                className="relative bg-indigo-50 border border-indigo-200 rounded-2xl p-5"
                            >
                                <button
                                    onClick={() => handleDeleteQuestion(i)}
                                    className="absolute top-2 right-2 text-red-600 hover:text-red-800 text-lg"
                                >
                                    🗑
                                </button>
                                <p className="font-semibold mb-2 text-indigo-900">
                                    {i + 1}. {q.question}
                                </p>
                                <ul className="space-y-1 text-indigo-800">
                                    {q.options.map((opt, j) => (
                                        <li key={j}>
                                            {opt} {opt === q.correctAnswer && <span>✅</span>}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}

                {/* Save / View Buttons */}
                {!quizSaved ? (
                    <button
                        onClick={handleSaveQuiz}
                        className="mt-8 w-full bg-purple-700 hover:bg-purple-800 text-white py-3 rounded-xl font-semibold shadow-md transition hover:scale-[1.03]"
                    >
                        💾 Save Quiz
                    </button>
                ) : (
                    <Link to="/ViewQuiz">
                        <button
                            className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold shadow-md transition hover:scale-[1.03]"
                        >
                            ✅ Quiz Saved! View Quiz
                        </button>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Buildquizz;

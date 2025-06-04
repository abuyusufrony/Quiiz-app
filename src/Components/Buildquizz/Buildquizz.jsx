import React, { useState } from 'react';

const Buildquizz = () => {
    const [quizTitle, setQuizTitle] = useState('');
    const [quizDescription, setQuizDescription] = useState('');
    const [question, setQuestion] = useState('');
    const [optionInput, setOptionInput] = useState('');
    const [options, setOptions] = useState([]);
    const [correctOptionIndex, setCorrectOptionIndex] = useState(null);
    const [questions, setQuestions] = useState([]);

    // Add option to current question
    const handleAddOption = () => {
        if (optionInput.trim()) {
            setOptions([...options, optionInput.trim()]);
            setOptionInput('');
        }
    };

    // Add current question to questions list
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
            // Reset question inputs for next question
            setQuestion('');
            setOptions([]);
            setCorrectOptionIndex(null);
        } else {
            alert('Please complete the question, options and select the correct answer.');
        }
    };

    // Delete question from questions list
    const handleDeleteQuestion = (indexToDelete) => {
        setQuestions(questions.filter((_, index) => index !== indexToDelete));
    };

    // Save the full quiz (e.g., send to API or localStorage)
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

        console.log('Quiz saved:', quiz);
        alert('Quiz saved! Check console for output.');

        // Reset everything after saving
        setQuizTitle('');
        setQuizDescription('');
        setQuestions([]);
        setQuestion('');
        setOptions([]);
        setCorrectOptionIndex(null);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 p-4">
            <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-2xl">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">Quiz Builder</h1>

                {/* Quiz Title */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Quiz Title:</label>
                    <input
                        type="text"
                        value={quizTitle}
                        onChange={(e) => setQuizTitle(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter quiz title"
                    />
                </div>

                {/* Quiz Description */}
                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-1">Quiz Description:</label>
                    <textarea
                        value={quizDescription}
                        onChange={(e) => setQuizDescription(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        placeholder="Enter a short description of the quiz"
                        rows={3}
                    />
                </div>

                {/* Question Input */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Enter a Question:</label>
                    <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="E.g. What is the capital of France?"
                    />
                </div>

                {/* Option Input */}
                <div className="flex items-center gap-2 mb-4">
                    <input
                        type="text"
                        value={optionInput}
                        onChange={(e) => setOptionInput(e.target.value)}
                        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                        placeholder="Add an option"
                    />
                    <button
                        onClick={handleAddOption}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-all"
                    >
                        + Option
                    </button>
                </div>

                {/* Options List with correct option selector */}
                {options.length > 0 && (
                    <ul className="mb-4 space-y-2">
                        {options.map((opt, idx) => (
                            <li
                                key={idx}
                                className={`flex justify-between items-center px-3 py-2 rounded-lg ${correctOptionIndex === idx ? 'bg-green-100 border border-green-400' : 'bg-gray-100'
                                    }`}
                            >
                                <span>
                                    {idx + 1}. {opt}
                                </span>
                                <button
                                    onClick={() => setCorrectOptionIndex(idx)}
                                    className="text-sm text-green-700 hover:underline"
                                >
                                    {correctOptionIndex === idx ? '✅ Correct' : 'Set as Correct'}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}

                {/* Button to add question to list */}
                <button
                    onClick={handleAddQuestion}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-all mb-6"
                >
                    Add Question
                </button>

                {/* Display added questions */}
                {questions.length > 0 && (
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-3 text-gray-800">Questions to be saved</h3>
                        {questions.map((q, index) => (
                            <div key={index} className="mb-4 p-4 bg-gray-50 rounded-xl shadow-sm relative">
                                <button
                                    onClick={() => handleDeleteQuestion(index)}
                                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                    title="Delete Question"
                                >
                                    🗑
                                </button>
                                <p className="font-medium text-gray-900 mb-2">
                                    {index + 1}. {q.question}
                                </p>
                                <ul className="list-disc list-inside text-gray-700">
                                    {q.options.map((opt, i) => (
                                        <li key={i} className={opt === q.correctAnswer ? 'font-semibold text-green-700' : ''}>
                                            {opt} {opt === q.correctAnswer && <span>✅</span>}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}

                {/* Save entire quiz */}
                <button
                    onClick={handleSaveQuiz}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-all"
                >
                    Save Quiz
                </button>
            </div>
        </div>
    );
};

export default Buildquizz;

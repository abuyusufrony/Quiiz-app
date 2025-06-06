import React, { useEffect, useState } from 'react';
import { Link, Links, useNavigate } from 'react-router';

const ViewQuiz = () => {
    const [quiz, setQuiz] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const savedQuiz = localStorage.getItem('savedQuiz');
        if (savedQuiz) {
            setQuiz(JSON.parse(savedQuiz));
        }
    }, []);

    const handleDeleteQuiz = () => {
        const confirmDelete = window.confirm('🗑️ Are you sure you want to delete this quiz?');
        if (confirmDelete) {
            localStorage.removeItem('savedQuiz');
            alert('✅ Quiz deleted successfully!');
            navigate('/'); // Redirect to home
        }
    };

    if (!quiz) {
        return (
            <div className="text-center text-gray-500 mt-20 text-lg">
                ⚠️ No quiz found.
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-6 py-10">
            <Link to={'/TakeQuiz'} className="block mb-8">
                <div
                    className="relative bg-white border border-indigo-300 shadow-xl rounded-3xl p-8 cursor-pointer hover:shadow-2xl transition-all"


                >
                    {/* 🗑️ Delete Button */}
                    <button
                        className="absolute top-4 right-4 text-red-600 hover:text-red-800 text-2xl transition-transform hover:scale-110"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteQuiz();
                        }}
                        title="Delete Quiz"
                    >
                        🗑️
                    </button>

                    <h1 className="text-4xl font-bold text-indigo-800">{quiz.title}</h1>
                    <p className="text-gray-600 mt-2 text-lg">{quiz.description}</p>
                    <p className="mt-4 text-sm text-indigo-500 italic">
                        {showDetails ? 'Click to hide quiz details' : 'Click to show quiz details'}
                    </p>

                </div>
            </Link>

            {/* Expandable Quiz Details */}
            {
                showDetails && (
                    <div className="mt-8 space-y-6 animate-fade-in">
                        {quiz.questions.map((q, index) => (
                            <div
                                key={index}
                                className="bg-indigo-50 border border-indigo-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition"
                            >
                                <p className="text-lg font-semibold text-indigo-900 mb-2">
                                    {index + 1}. {q.question}
                                </p>
                                <ul className="space-y-2">
                                    {q.options.map((opt, i) => (
                                        <li
                                            key={i}
                                            className={`px-4 py-2 rounded-xl ${opt === q.correctAnswer
                                                ? 'bg-green-100 border border-green-400 text-green-800 font-semibold flex justify-between'
                                                : 'bg-white border border-gray-300 text-gray-700'
                                                }`}
                                        >
                                            {opt}
                                            {opt === q.correctAnswer && <span>✅</span>}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )
            }
        </div >
    );
};

export default ViewQuiz;

import React from 'react';
import { Link } from 'react-router';
import Buildquizz from '../Buildquizz/Buildquizz';

const Layout = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center space-y-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
                Create Your Quiz for Students
            </h2>

            <div className="flex flex-col sm:flex-row gap-6">
                <Link to="/Buildquizz">
                    <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full shadow transition duration-300 w-48 cursor-pointer">
                        ➕ Create Quiz
                    </button>
                </Link>

                <Link to="/ViewQuiz">
                    <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full shadow transition duration-300 w-48  cursor-pointer">
                        🎯 Attend Quiz
                    </button>
                </Link>
            </div>
        </div>

    );
};

export default Layout;
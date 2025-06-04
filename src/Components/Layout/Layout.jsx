import React from 'react';
import { Link } from 'react-router';
import Buildquizz from '../Buildquizz/Buildquizz';

const Layout = () => {
    return (
        <div className='flex-col justify-center text-center items-center min-h-full my-7'>
            <h2 className='text-3xl font-semibold font-sans '>Create Your Quizz For students </h2>

            <div>
                <Link to={'/'}><button className='btn  mt-11  min-h-full '>Create Quizz</button></Link>
            </div>
        </div>
    );
};

export default Layout;
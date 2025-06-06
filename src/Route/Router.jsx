import React from 'react';
import { createBrowserRouter } from 'react-router';
import Layout from '../Components/Layout/Layout';
import Buildquizz from '../Components/Buildquizz/Buildquizz';
import ViewQuiz from '../Components/ViewQuiz/ViewQuiz';
import TakeQuiz from '../Components/TakeQuiz/TakeQuiz';

const Router = createBrowserRouter([{
    path: '/',
    element: <Layout></Layout>,

},
{
    path: '/Buildquizz',
    element: <Buildquizz></Buildquizz>
},
{
    path: '/ViewQuiz',
    element: <ViewQuiz></ViewQuiz>
},
{
    path: '/TakeQuiz',
    element: <TakeQuiz></TakeQuiz>
}

])



export default Router;
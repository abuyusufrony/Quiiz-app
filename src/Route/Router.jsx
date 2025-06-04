import React from 'react';
import { createBrowserRouter } from 'react-router';
import Layout from '../Components/Layout/Layout';
import Buildquizz from '../Components/Buildquizz/Buildquizz';

const Router = createBrowserRouter([{
    path: '/',
    element: <Layout></Layout>,

},
{
    path: '/Buildquizz',
    element: <Buildquizz></Buildquizz>
}

])



export default Router;
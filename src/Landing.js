import React from 'react'
import './app.css';
import { Link } from 'react-router-dom';
import { useAuth } from './contexts/auth';
const Landing = () => {
    const {user} = useAuth();
  return (
    <div className=''>
        <section className="bg-white dark:bg-gray-900 bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]">
            <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 z-10 relative">
                <Link to={'/updates'} className="inline-flex justify-between items-center py-1 px-1 pe-4 mb-7 text-sm text-secondary bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800">
                    <span className="text-xs bg-secondary rounded-full text-white px-4 py-1.5 mr-3">New</span> <span className="text-sm font-medium">The notification feature was Launched! See what's new</span> 
                    <svg className="w-2.5 h-2.5 ml-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                    </svg>
                </Link>
                <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-primary md:text-5xl lg:text-6xl dark:text-white">Unlock your potential today!</h1>
                <p className="mb-8 text-lg font-normal text-gray-700 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-200">PathPioneer tackles interview nerves, career uncertainties, and more. We empower IT interns to ace interviews, navigate networking, and master time management, guiding them to confidently secure their ideal career in the dynamic IT landscape.</p>
                
                {
                    user ? <Link to={'/pioneer'} className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-secondary hover:bg-primary focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                    Continue on your path...
                    <svg className="w-3.5 h-3.5 ml-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </Link> :
                <Link to={'/pioneer'} className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-secondary hover:bg-primary focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                Get started
                <svg className="w-3.5 h-3.5 ml-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </Link>
                }
            </div>
            <div className="bg-gradient-to-b from-indigo-200 to-transparent dark:from-blue-900 w-full h-full absolute top-0 left-0 z-0"></div>
        </section>

        {/*  */}

        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
                <div className="bg-indigo-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12 mb-8 mr-2 z-30 relative">
                    <a href="https://www.pioneerapi.tangikuu.tech/" className="bg-blue-100 text-blue-800 text-xl font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-blue-400 mb-2">
                    🤙
                        API
                    </a>
                    <h1 className="text-primary dark:text-white text-3xl md:text-5xl font-extrabold mb-2">How to Use Our API for Custom Questions?</h1>
                    <p className="text-lg font-normal text-gray-600 dark:text-gray-400 mb-6">Explore the capabilities of our API, empowering you to craft custom questions and leverage its potential for various purposes within the IT landscape.</p>
                    <a href="https://www.pioneerapi.tangikuu.tech/" className="inline-flex justify-center items-center py-2.5 px-5 text-base font-medium text-center text-white rounded-lg bg-secondary hover:bg-primary focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                        Read more
                        <svg className="w-3.5 h-3.5 ml-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </a>
                </div>
            </div>
        </section>

    </div>
  )
}

export default Landing

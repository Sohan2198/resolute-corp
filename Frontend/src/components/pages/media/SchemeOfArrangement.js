import React from 'react';
import portfolioBg from '../../../assets/images/Resolute-UI-Portfolio.jpg';
import AnimatedTitle from '../../shared/AnimatedTitle';

function SchemeOfArrangement() {
    return (
        <section className="bg-[#F4F5F6] min-h-screen">
            <div
                className="mx-auto p-4 pt-6 md:p-6 lg:p-12 bg-[#0E4669] text-white flex flex-col justify-center items-center"
                style={{
                    backgroundImage: `url(${portfolioBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '250px',
                }}
            >
                <h2 className="text-4xl uppercase font-bold mb-3 text-center">
                    <AnimatedTitle>Scheme of Arrangement</AnimatedTitle>
                </h2>
                <h4 className="text-center text-xl mb-5 font-semibold">
                    Investors
                </h4>
            </div>

            <div className='max-w-[1300px] mx-auto py-16 px-4'>
                <div className="bg-white rounded-lg shadow-md p-8">
                    <h3 className="text-2xl font-bold text-[#0E4669] mb-6 border-b pb-4">
                        Documents for Download
                    </h3>
                    <ul className="space-y-4">
                        <li className="flex items-start">
                            <svg className="w-6 h-6 mr-3 text-red-500 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>
                            <a 
                                href="/documents/Notice_of_Meeting_of_Secured_Creditors.pdf" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-lg font-medium text-gray-800 hover:text-[#0E4669] hover:underline transition-colors"
                            >
                                Notice of Meeting of Secured Creditors of Resolute Corp Bharat Private Limited
                            </a>
                        </li>
                        <li className="flex items-start">
                            <svg className="w-6 h-6 mr-3 text-red-500 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>
                            <a 
                                href="/documents/Postal_Ballot_Form.pdf" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-lg font-medium text-gray-800 hover:text-[#0E4669] hover:underline transition-colors"
                            >
                                Postal ballot form
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}

export default SchemeOfArrangement;

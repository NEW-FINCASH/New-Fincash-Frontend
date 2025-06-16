import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { BarChart, Wallet, Target, Sparkles } from 'lucide-react';

export default function Welcome() {
    return (
        <>
            <Header />
            <div className="d-flex flex-column justify-content-center align-items-center vw-100" style={{ minHeight: "calc(100vh - 80px)" }}>
                <div className="d-flex flex-column justify-content-center align-items-center text-center" style={{ minHeight: "calc(100vh - 100px)" }}>
                    <h1 className="text-white" style={{ fontSize: "4rem" }}>Welcome to Fincash</h1>
                    <p className="text-secondary w-75 fs-5">The help you need to have good financial management. Use powerful AI tools to help you achieve financial freedom.</p>
                    <Link to="" className="text-decoration-none btn btn-light rounded-3 px-4 py-2">Get Started For Free</Link  >
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center text-center bg-dark p-5">
                    <h1 className="text-white mt-5" style={{ fontSize: "3rem" }}>Tools created for your success</h1>
                    <p className="text-secondary fs-5 w-75 mb-5">Everything you need to make brilliant financial decisions.</p>
                    <div className="d-flex flex-column justify-content-center align-items-center gap-5 p-2 w-75">
                        <div className="d-flex justify-content-center align-items-center gap-5"> 
                            <div className="border rounded p-3 w-50 d-flex flex-column justify-content-center align-items-center" style={{ height: "300px" }}>
                                <Wallet className="text-white"></Wallet>
                                <h2 className="text-white fs-4">AI-Powered Custom Budgeting</h2>
                                <p className="text-secondary fs-6">Forget spreadsheets. Based on your income and spending habits, we create a flexible, realistic budget plan that works for you.</p>
                            </div>
                            <div className="border rounded p-3 w-50 d-flex flex-column justify-content-center align-items-center" style={{ height: "300px" }}>
                                <BarChart className="text-white"></BarChart>
                                <h2 className="text-white fs-4">Smart Expense Analysis</h2>
                                <p className="text-secondary fs-6">Our AI automatically categorizes your spending. Find out where your money is going and get insights on how to save effortlessly.</p>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center align-items-center gap-5">
                            <div className="border rounded p-3 w-50 d-flex flex-column justify-content-center align-items-center" style={{ height: "300px" }}>
                                <Target className="text-white"></Target>
                                <h2 className="text-white fs-4">Financial Goals Assistant</h2>
                                <p className="text-secondary fs-6">Buying a home? Taking a trip? Set your goals and our AI creates a step-by-step plan to get you there faster.</p>
                            </div>
                            <div className="border rounded p-3 w-50 d-flex flex-column justify-content-center align-items-center" style={{ height: "300px" }}>
                                <Sparkles className="text-white"></Sparkles>
                                <h2 className="text-white fs-4">Investment Insights (Coming Soon!)</h2>
                                <p className="text-secondary fs-6">Receive simplified analysis of your profile and allocation suggestions to make your money work for you, even if you are not an expert.</p>
                            </div>
                        </div>
                    </div>
               </div>
            </div>
        </>
    );
}
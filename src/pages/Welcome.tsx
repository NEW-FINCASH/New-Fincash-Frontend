import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { BarChart, PiggyBank, Target, TrendingUp } from 'lucide-react';

export default function Welcome() {
    return (
        <>
            <Header />
            <div className="d-flex flex-column justify-content-center align-items-center vw-100" style={{ minHeight: "calc(100vh - 80px)" }}>
                <div className="d-flex flex-column justify-content-center align-items-center text-center">
                    <h1 className="text-white">Welcome to Fincash</h1>
                    <p className="text-secondary w-75">The help you need to have good financial management. Use powerful AI tools to help you achieve financial freedom.</p>
                    <Link to="" className="text-decoration-none btn btn-light rounded-3 px-4">Get Started For Free</Link  >
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center text-center">
                    <h1 className="text-white">Tools created for your success</h1>
                    <p className="text-secondary w-75">Everything you need to make brilliant financial decisions.</p>
                    <div className="">
                        <div className="">
                            <BarChart className=""></BarChart>
                            <h2 className="text-white">Smart Expense Analysis</h2>
                            <p className="text-secondary">Our AI automatically categorizes your spending. Find out where your money is going and get insights on how to save effortlessly.</p>
                        </div>
                        <div className="">
                            <PiggyBank className=""></PiggyBank>
                            <h2 className="text-white">AI-Powered Custom Budgeting</h2>
                            <p className="text-secondary">Forget spreadsheets. Based on your income and spending habits, we create a flexible, realistic budget plan that works for you.</p>
                        </div>
                        <div className="">
                            <Target className=""></Target>
                            <h2 className="text-white">Financial Goals Assistant</h2>
                            <p className="text-secondary">Buying a home? Taking a trip? Set your goals and our AI creates a step-by-step plan to get you there faster.</p>
                        </div>
                        <div className="">
                            <TrendingUp className=""></TrendingUp>
                            <h2 className="text-white">Investment Insights (Coming Soon!)</h2>
                            <p className="text-secondary">Receive simplified analysis of your profile and allocation suggestions to make your money work for you, even if you are not an expert.</p>
                        </div>
                    </div>
               </div>
            </div>
        </>
    );
}
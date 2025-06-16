import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default function Welcome() {
    return (
        <>
            <Header />
            <div className="d-flex flex-column justify-content-center align-items-center vw-100" style={{ minHeight: "calc(100vh - 80px)" }}>
                <div className="d-flex flex-column justify-content-center align-items-center text-center">
                    <h1 className="text-white fs-1">Welcome to Fincash</h1>
                    <p className="text-secondary w-75">The help you need to have good financial management. Use powerful AI tools to help you achieve financial freedom.</p>
                    <Link to="" className="text-decoration-none btn btn-light rounded-3 px-4">Get Started For Free</Link  >
                </div>
            </div>
        </>
    );
}
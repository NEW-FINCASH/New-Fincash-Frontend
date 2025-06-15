import Header from '../components/Header';

export default function Welcome() {
    return (
        <>
           <Header />
           <div className="d-flex flex-column justify-content-center align-items-center vw-100" style={{ minHeight: "calc(100vh - 80px)" }}>
               <h1 className="text-white">Welcome to Fincash</h1>
               <p className="text-secondary">Your financial journey starts here.</p>
           </div>
        </>
    );
}
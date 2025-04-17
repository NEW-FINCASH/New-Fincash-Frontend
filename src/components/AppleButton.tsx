export default function AppleButton(){
    return (
        <>
        <button
        id="appleButton"
        type="button"
        className="w-100 text-center bg-transparent border border-secondary py-3 px-2 rounded text-white fw-light d-flex align-items-center justify-content-center gap-2" >
        <img src="/assets/apple.png" alt="Apple" style={{ width: "20px" }} />
            Apple
        </button>
        </>
    )
};
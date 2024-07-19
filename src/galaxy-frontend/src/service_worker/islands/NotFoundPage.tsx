import error404Image from "@images/error-404.svg";

export async function GET() {
    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center">
            <img src={error404Image} alt="error" className="max-h-[400px]" />
            <a href="/" className="btn btn-primary mt-5">
                Go to Home
            </a>
        </div>
    );
}

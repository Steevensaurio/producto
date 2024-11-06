import LoginForm from "../Organisms/LoginForm"

const LoginPg = () =>{
    return(
        <div className="min-h-screen flex items-center justify-center bg-blue-300 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl w-full space-y-8 flex bg-white rounded-3xl shadow-md overflow-hidden">
                <LoginForm/>
            </div>
        </div>
    )
}

export default LoginPg
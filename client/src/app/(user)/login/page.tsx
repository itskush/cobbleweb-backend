import LoginForm from "../../../components/form/LoginForm";

const Login = () => {
  return (
    <div className="col-xs-12 col-sm-6 col-sm-offset-3 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4">
      <div className="flex items-center justify-center h-screen">
        <div className="main-page-wrapper flex min-w-[100%] items-center justify-center p0">
        <div className="bg-white px-10 py-8 rounded-lg w-full max-w-md">
          <h1 className="text-3xl font-medium text-center mb-4 text-black">Login</h1> 
          <LoginForm />
        </div>
        </div>
      </div>
    </div>
  );

}

export default Login;
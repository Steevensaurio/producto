import Form from "../components/Form";

function LoginPage() {
  return <Form route="/api/v1/user/token/" method="login" />;
}

export default LoginPage;
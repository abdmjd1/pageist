import AuthPageLayout from "../../components/AuthPageLayout/AuthPageLayout.tsx";
import AuthForm from "../../components/AuthForm/AuthForm.tsx";

function SignUpPage() {
  return (
    <AuthPageLayout>
      <AuthForm mode="signup" />
    </AuthPageLayout>
  );
}

export default SignUpPage;

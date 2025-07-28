import AuthForm from "../../components/AuthForm/AuthForm.tsx";
import AuthPageLayout from "../../components/AuthPageLayout/AuthPageLayout.tsx";

function SignInPage() {
  return (
    <AuthPageLayout>
      <AuthForm mode="signin" />
    </AuthPageLayout>
  );
}

export default SignInPage;

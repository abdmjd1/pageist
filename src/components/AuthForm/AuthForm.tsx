import { FirebaseError } from "firebase/app";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import logo from "../../assets/logo.svg";
import { FaGoogle } from "react-icons/fa6";
import { PiTestTubeFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import AltAuthMethodButton, {
  AltAuthMethodType,
} from "../AltAuthMethodButton/AltAuthMethodButton";
import PasswordInput from "../PasswordInput/PasswordInput";
import Button from "../ui/Button/Button";
import Input from "../ui/Input/Input";
import Loader from "../ui/Loader/Loader";
import styles from "./AuthForm.module.css";

type ModeType = "signup" | "signin";

type FormFields = {
  email: string;
  password: string;
};

function AuthForm({ mode = "signup" }: { mode: ModeType }) {
  const [loadingButton, setLoadingButton] = useState<AltAuthMethodType>(null);
  const methods = useForm<FormFields>();
  const {
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const { signUpWithEmail, signInWithEmail, signInWithGoogle } =
    useAuthContext();

  const onSubmit: SubmitHandler<FormFields> = async ({ email, password }) => {
    try {
      if (mode === "signup") await signUpWithEmail(email, password);
      if (mode === "signin") await signInWithEmail(email, password);
    } catch (error) {
      if (!(error instanceof FirebaseError)) {
        setError("root", {
          message: "Authentication failed. Please try again.",
        });
        return;
      }

      switch (error.code) {
        case "auth/email-already-in-use":
          setError("email", {
            message: "This email is already registered. Try signing in instead",
          });
          break;

        case "auth/invalid-credential":
          setError("email", {
            message: "Invalid email or password",
          });
          break;

        // for all other  firebase errors
        default:
          setError("root", {
            message: "Authentication failed. Please try again.",
          });
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <main className={styles.main}>
        <header>
          <img className={styles.logo} src={logo} alt="logo" />
          <h1 className={styles.title}>
            {mode === "signup" ? "Create an account" : "Welcome back"}
          </h1>
          <p>Please enter your details</p>
        </header>

        {errors.root && (
          <p className={styles["error"]}>{errors.root.message} </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Input
            name="email"
            type="email"
            label="Email"
            placeholder="Enter your email"
            required
            validationRules={{
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email format",
              },
            }}
          />

          <div>
            <div className={styles["password-info-container"]}>
              <label htmlFor="password-input">Password</label>
              <Link
                to="/password-reset"
                className={styles["forgot-password-link"]}
              >
                Forgot password
              </Link>
            </div>

            <PasswordInput includeLabel={false} />

            <p
              className={
                errors.password ? styles["error"] : styles["input-helper"]
              }
            >
              Must have at least 8 characters
            </p>
          </div>

          <Button
            variant="solid"
            size="lg"
            className={styles["submit-btn"]}
            disabled={loadingButton !== null || isSubmitting}
          >
            {isSubmitting ? (
              <Loader />
            ) : (
              `Sign ${mode === "signup" ? "up" : "in"}`
            )}
          </Button>
        </form>

        <p className={styles["separator"]}>
          <span>Or</span>
        </p>

        <AltAuthMethodButton
          method="google"
          authMethod={signInWithGoogle}
          loadingButton={loadingButton}
          setLoadingButton={setLoadingButton}
          className={styles["alt-auth-btn"]}
        >
          <FaGoogle /> Continue with Google
        </AltAuthMethodButton>

        <AltAuthMethodButton
          method="test-account"
          authMethod={() =>
            signInWithEmail("tester00610@gmail.com", "testAccountPassword")
          }
          loadingButton={loadingButton}
          setLoadingButton={setLoadingButton}
          className={styles["alt-auth-btn"]}
        >
          <PiTestTubeFill />
          Continue with test account
        </AltAuthMethodButton>

        <p className={styles.link}>
          {mode === "signup" ? (
            <>
              Already have an account? <Link to="/signin"> Sign in </Link>
            </>
          ) : (
            <>
              Don't have an account? <Link to="/signup"> Sign up </Link>
            </>
          )}
        </p>
      </main>
    </FormProvider>
  );
}

export default AuthForm;

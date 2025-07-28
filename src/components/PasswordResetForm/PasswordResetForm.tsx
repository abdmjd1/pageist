import styles from "./PasswordResetForm.module.css";
import { FaArrowLeft } from "react-icons/fa";
import { useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Input from "../ui/Input/Input";
import Button from "../ui/Button/Button";
import Loader from "../ui/Loader/Loader";

type FormFields = {
  email: string;
};

function PasswordResetForm() {
  const { resetPassword } = useAuthContext();
  const [successMessage, setSuccessMessage] = useState("");
  const methods = useForm<FormFields>();
  const {
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit: SubmitHandler<FormFields> = async ({ email }) => {
    try {
      await resetPassword(email);
      setSuccessMessage("Password reset email sent! Please check your email.");
    } catch {
      setError("root", {
        message: "Password reset failed. Please try again.",
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <main className={styles.main}>
        <header>
          <img className={styles.logo} src="/src/assets/logo.svg" alt="logo" />
          <h1>Forgot password?</h1>
          <p>No worries, we'll send you reset instructions</p>
        </header>

        {errors.root && (
          <p className={styles["error"]}>{errors.root.message} </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
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

          <Button
            variant="solid"
            size="lg"
            className={styles["submit-btn"]}
            disabled={isSubmitting}
          >
            {isSubmitting ? <Loader /> : "Reset password"}
          </Button>

          {successMessage && (
            <p className={styles["success-message"]}>{successMessage} </p>
          )}
        </form>

        <p className={styles.link}>
          <Link to="/signin" className={styles["back-to-login-link"]}>
            <FaArrowLeft /> Back to sign in
          </Link>
        </p>
      </main>
    </FormProvider>
  );
}

export default PasswordResetForm;

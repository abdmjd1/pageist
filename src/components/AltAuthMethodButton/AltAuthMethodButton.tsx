import { useFormContext } from "react-hook-form";
import Button from "../ui/Button/Button";
import Loader from "../ui/Loader/Loader";

export type AltAuthMethodType = "google" | "test-account" | null;

type AltAuthMethodButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    method: AltAuthMethodType;
    authMethod: () => void;
    loadingButton: AltAuthMethodType;
    setLoadingButton: React.Dispatch<React.SetStateAction<AltAuthMethodType>>;
  };

function AltAuthMethodButton({
  method,
  authMethod,
  loadingButton,
  setLoadingButton,
  className,
  children,
}: AltAuthMethodButtonProps) {
  const {
    setError,
    formState: { isSubmitting },
  } = useFormContext();

  const handleAuth = async () => {
    setLoadingButton(method);
    try {
      await authMethod();
    } catch {
      setError("root", {
        message: "Authentication failed. Please try again",
      });
    } finally {
      setLoadingButton(null);
    }
  };

  return (
    <Button
      variant="outline"
      size="lg"
      disabled={loadingButton !== null || isSubmitting}
      onClick={handleAuth}
      className={className}
    >
      {loadingButton === method ? <Loader /> : children}
    </Button>
  );
}

export default AltAuthMethodButton;

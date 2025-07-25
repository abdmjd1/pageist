import styles from "./PasswordInput.module.css";
import { useState } from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import Input from "../ui/Input/Input";
import Button from "../ui/Button/Button";

type PasswordInputPropsType = React.InputHTMLAttributes<HTMLInputElement> & {
  includeLabel?: boolean;
};

function PasswordInput({
  includeLabel = true,
  ...rest
}: PasswordInputPropsType) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div className={styles["password-input-container"]}>
      <Input
        name="password"
        type={isPasswordVisible ? "text" : "password"}
        label={includeLabel ? "Password" : undefined}
        placeholder="Enter your password"
        required
        validationRules={{
          minLength: 8,
        }}
        {...rest}
      />
      <Button
        type="button"
        variant="outline"
        size="xs"
        iconOnly
        tooltipContent="toggle password visibility"
        className={styles["toggle-password-visibility-btn"]}
        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
      >
        {isPasswordVisible ? <LuEye /> : <LuEyeClosed />}
      </Button>
    </div>
  );
}

export default PasswordInput;

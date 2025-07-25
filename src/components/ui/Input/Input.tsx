import styles from "./Input.module.css";
import { useFormContext } from "react-hook-form";

type InputPropsType = React.InputHTMLAttributes<HTMLInputElement> & {
  name?: string;
  type?: string;
  label?: string;
  validationRules?: object;
};

function Input({
  name = "input text",
  type = "text",
  label,
  placeholder,
  required,
  validationRules,
  ...rest
}: InputPropsType) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      {label && <label htmlFor={`${name}-input`}>{label}</label>}
      <input
        type={type}
        {...register(name, {
          required:
            required &&
            `${name.replace(name[0], name[0].toUpperCase())} can't be empty`,
          ...validationRules,
        })}
        placeholder={placeholder}
        id={`${name}-input`}
        className={styles.input}
        {...rest}
      />

      {errors[name] && (
        <p className={styles["error"]}>{errors[name]?.message as string} </p>
      )}
    </div>
  );
}

export default Input;

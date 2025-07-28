import styles from "./Loader.module.css";
import { LuLoaderCircle } from "react-icons/lu";

type LoaderPropsType = {
  size?: "sm" | "lg";
};

function Loader({ size = "sm" }: LoaderPropsType) {
  return (
    <LuLoaderCircle
      className={`${styles.loader} ${styles[`loader--${size}`]}`}
    />
  );
}

export default Loader;

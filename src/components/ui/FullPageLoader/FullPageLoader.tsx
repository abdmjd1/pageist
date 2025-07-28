import styles from "./FullPageLoader.module.css";
import Loader from "../Loader/Loader";

function FullPageLoader() {
  return (
    <div className={styles.loader}>
      <Loader size="lg" />
    </div>
  );
}

export default FullPageLoader;

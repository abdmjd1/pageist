import { ReactNode } from "react";
import styles from "./AuthPageLayout.module.css";

function AuthPageLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.container}>
      <div className={styles["bg-gradient"]}></div>
      {children}
    </div>
  );
}

export default AuthPageLayout;

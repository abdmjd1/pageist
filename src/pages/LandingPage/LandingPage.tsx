import styles from './LandingPage.module.css'
import { FaGithub } from "react-icons/fa";
import Logo from '../../assets/logo.svg?react'
import { useEffect, useState } from 'react';

function LandingPage() {
    return (
        <div className={styles.app}>
            <Logo className={styles.logo} />
            <a
                className={styles["github"]}
                href="https://github.com/abdmjd1/pageist"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub">
                <FaGithub />
            </a>

            <main className={styles["container"]}>
                <h1>Pageist</h1>
                <p>Ultra-fast, local-first note-taking app.</p>
                <p className={styles["shimmer-text"]}>Coming soon</p>
            </main>

            <Clock />
            <p className={styles["built-by"]}>Built by <a href="https://x.com/abdmjd_">abdmjd_</a></p>
        </div>
    );
}

export default LandingPage;




const Clock = () => {
    const [time, setTime] = useState(new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric' }).format(new Date()));

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric' }).format(new Date()))
        }, 1000);

        return () => clearInterval(intervalId)

    }, [])

    return <p className={styles["clock"]}>● {time}</p>
}
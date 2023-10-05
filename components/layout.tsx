import cx from "classnames";
import Link from "next/link";

import { Aleo } from "next/font/google";

import styles from "./layout.module.css";

const font = Aleo({
  subsets: ["latin"],
});

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={font.className}>
      <header className={cx(styles.header)}>
        <Link href="/" className={styles.mainLink}>
          Software kitchen
        </Link>
      </header>
      <main className={cx(styles.main)}>
        <div className={styles.mainDiv}>
          <div className={styles.mainContent}>{children}</div>
          <div className={styles.signatureRow}>
            {/* eslint-disable-next-line @next/next/no-img-element*/}
            <img
              alt="Florent Le Gall"
              src="//www.gravatar.com/avatar/fd5e5220fa103cc75e2f4f9fbe16ebb7?d=retro&amp;r=g&amp;s=100"
              srcSet="//www.gravatar.com/avatar/fd5e5220fa103cc75e2f4f9fbe16ebb7?d=retro&amp;r=g&amp;s=200 2x"
              height="100"
              width="100"
              className={styles.avatar}
            />
            <p className={styles.signatureText}>
              <b>Florent Le Gall&apos;s personal blog</b>
              <br />
              Notes on software development in english and sometimes in french.
            </p>
          </div>
          <div className={styles.links}>
            <span>
              <a href="https://twitter.com/flornt">twitter</a> •{" "}
              <a href="https://github.com/flegall">github</a> •{" "}
              <a href="https://www.linkedin.com/in/flegall/">linkedin</a>
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;

import cx from "classnames";
import { Inter } from "next/font/google";
import { Roboto } from "next/font/google";

import styles from "./layout.module.css";

const inter = Inter({ subsets: ["latin"] });

const robotoTitle = Roboto({
  weight: "700",
  subsets: ["latin"],
});

const roboto = Roboto({
  weight: "300",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={inter.className}>
      <header className={cx(robotoTitle.className, styles.header)}>
        Software kitchen
      </header>
      <main className={cx(roboto.className, styles.main)}>
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
            <b className={robotoTitle.className}>
              Florent Le Gall&apos;s personal blog
            </b>
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
      </main>
    </div>
  );
}

import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="icon"
          type="image/png"
          href="//www.gravatar.com/avatar/fd5e5220fa103cc75e2f4f9fbe16ebb7?d=retro&amp;r=g&amp;s=100"
        />
        <meta
          name="description"
          content={`Notes on software development in english and sometimes in french.`}
        />
      </Head>
      <body style={{ margin: 0 }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;

import Link from "next/link";

import { getSortedPostsData } from "../lib/posts";

import styles from "./index.module.css";

type HomeProps = {
  allPostsData: ReturnType<typeof getSortedPostsData>;
};

export async function getStaticProps(): Promise<{
  props: HomeProps;
}> {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

const Home = ({ allPostsData }: HomeProps) => {
  return allPostsData.map((post) => {
    return (
      <p key={post.id}>
        <Link href={"/posts/" + post.id}>{post.data.title}</Link>
        <br />
        <span className={styles.description}>
          "{post.data.description}" ({post.data.readingTimeEstimation})
        </span>
        <br />
        <span className={styles.description}>{post.data.date}</span>
      </p>
    );
  });
};

export default Home;

import { getSortedPostsData } from "../lib/posts";

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
    return <p key={post.id}>{post.data.description}</p>;
  });
};

export default Home;

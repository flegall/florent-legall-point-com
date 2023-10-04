import { getAllPostIds, getPostData } from "../../lib/posts";

export const getStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

type PostProps = {
  postData: ReturnType<typeof getPostData>;
};

export const getStaticProps = async ({
  params,
}: {
  params: { id: string };
}): Promise<{ props: PostProps }> => {
  const postData = getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
};

const Post = ({ postData }: PostProps) => {
  return postData.data.title;
};

export default Post;

import { getAllPostIds, getPostData } from "../../lib/posts";

export const getStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

type PostProps = {
  postData: Awaited<ReturnType<typeof getPostData>>;
};

export const getStaticProps = async ({
  params,
}: {
  params: { id: string };
}): Promise<{ props: PostProps }> => {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
};

const Post = ({ postData }: PostProps) => {
  return (
    <>
      <h2>{postData.data.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </>
  );
};

export default Post;

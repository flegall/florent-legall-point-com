import { getAllPostIds, getPostData } from "../../lib/posts";

import styles from "./[id].module.css";

export const getStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

type PostProps = {
  post: Awaited<ReturnType<typeof getPostData>>;
};

export const getStaticProps = async ({
  params,
}: {
  params: { id: string };
}): Promise<{ props: PostProps }> => {
  const postData = await getPostData(params.id);
  return {
    props: {
      post: postData,
    },
  };
};

const Post = ({ post }: PostProps) => {
  return (
    <>
      <h2>{post.data.title}</h2>
      <span className={styles.description}>
        "{post.data.description}" ({post.data.readingTimeEstimation})
      </span>{" "}
      <span className={styles.description}>{post.data.date}</span>
      {post.data.published === false && (
        <div className={styles.notPublishedWarning}>
          ⚠️ This article is still a draft.
        </div>
      )}
      <div
        className={styles.markdown}
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </>
  );
};

export default Post;

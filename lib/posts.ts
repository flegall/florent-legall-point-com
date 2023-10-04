import fs from "fs";
import path from "path";
import matter from "gray-matter";
import * as t from "typanion";
import yaml from "js-yaml";

const postsDirectory = path.join(process.cwd(), "posts");

const isPost = t.isObject({
  title: t.isString(),
  description: t.isString(),
  date: t.isString(),
  published: t.isBoolean(),
  author: t.isString(),
  tags: t.isArray(t.isString()),
});

type Post = t.InferType<typeof isPost>;

const readFileContents = (id: string) => {
  // Read markdown from string
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  return fileContents;
};

const parsePostMetaData = (id: string, fileContents: string) => {
  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents, {
    engines: {
      // @ts-ignore
      yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }),
    },
  });

  const data = matterResult.data;
  const errors: string[] = [];
  if (!isPost(data, { errors })) {
    throw new Error(
      "Invalid blog post: '" + id + "' : " + JSON.stringify(errors, null, 2)
    );
  }

  return data;
};

export const getAllPostIds = () => {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
};

export const getPostData = (id: string) => {
  const fileContents = readFileContents(id);
  const data = parsePostMetaData(id, fileContents);

  return {
    id,
    data,
  };
};

export const getSortedPostsData = (): { id: string; data: Post }[] => {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    const fileContents = readFileContents(id);
    const data = parsePostMetaData(id, fileContents);
    return {
      id,
      data,
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.data.date < b.data.date) {
      return 1;
    } else {
      return -1;
    }
  });
};

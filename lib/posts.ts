import fs from "fs";
import yaml from "js-yaml";
import matter, { GrayMatterFile } from "gray-matter";
import path from "path";
import { remark } from "remark";
import html from "remark-html";
import * as t from "typanion";

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

const parseMarkdown = (id: string) => {
  // Read markdown from string
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents, {
    engines: {
      // @ts-ignore
      yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }),
    },
  });

  return matterResult;
};

const parsePostMetaData = (id: string, markDown: GrayMatterFile<string>) => {
  const data = markDown.data;
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

export const getPostData = async (id: string) => {
  const markDown = parseMarkdown(id);
  const data = parsePostMetaData(id, markDown);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark().use(html).process(markDown.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    data,
    contentHtml,
  };
};

export const getSortedPostsData = (): { id: string; data: Post }[] => {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    const markDown = parseMarkdown(id);
    const data = parsePostMetaData(id, markDown);
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

import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';

import * as prismicHelper from '@prismicio/helpers';
import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import format from '../../utils/format';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: string;
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps) {
  return (
    <>
      <Head>
        <title>{`${`Título`} | ig.news`}</title>
      </Head>
      <main>
        <article className={styles.container}>
          <img src="/images/text-image.png" alt="" />
          <div className={styles.post}>
            <h1>{post.data.title}</h1>
            <div className={commonStyles.postDetails}>
              <span>
                <FiCalendar /> {post.first_publication_date}
              </span>
              <span>
                <FiUser /> {post.data.author}
              </span>
              <span>
                <FiClock /> 5 min
              </span>
            </div>
            <div className={styles.postContent}>
              {post.data.content.map(content => (
                <>
                  <h2 className="">{content.heading}</h2>
                  <div dangerouslySetInnerHTML={{ __html: content.body }}></div>
                </>
              ))}
            </div>
          </div>
        </article>
      </main>
    </>
  );
}

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;
  const prismic = getPrismicClient({});
  const response = await prismic.getByUID('post', String(slug), {});
  const post = {
    first_publication_date: format(response.first_publication_date),
    data: {
      title: response.data.title,
      banner: response.data.banner,
      author: response.data.author,
      content: response.data.content.map(content => ({
        heading: content.heading,
        body: prismicHelper.asHTML(content.body),
      })),
    },
  };

  return {
    props: { post },
    revalidate: 60 * 30, //30 minutes
  };
};

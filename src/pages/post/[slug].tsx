import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';

import * as prismicHelper from '@prismicio/helpers';
import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import format from '../../utils/format';
import { useRouter } from 'next/router';

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
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <div className={styles.post}>Carregando...</div>;
  }

  const getEstimatedTime = () => {
    let string = '';

    for (const { body, heading } of post.data.content) {
      string += heading + ' ';
      for (const { text } of body) {
        string += text + ' ';
      }
    }

    const wordCount = string.match(/(\w+)/g).length;
    return Math.ceil(wordCount / 200);
  };
  const estimatedReadingTime = getEstimatedTime();

  return (
    <>
      <Head>
        <title>{`${post.data.title} | ig.news`}</title>
      </Head>
      <main>
        <article className={styles.container}>
          <img src="/images/text-image.png" alt="" />
          <div className={styles.post}>
            <h1>{post.data.title}</h1>
            <div className={commonStyles.postDetails}>
              <span>
                <FiCalendar />
                {format(post.first_publication_date)}
              </span>
              <span>
                <FiUser /> {post.data.author}
              </span>
              <span>
                {/* TODO */}
                <FiClock /> {`${estimatedReadingTime} min`}
              </span>
            </div>
            <div className={styles.postContent}>
              {post.data.content.map(content => (
                <div key={content.heading}>
                  <h2 className="">{content.heading}</h2>
                  {content.body.map(body => (
                    <div
                      key={body.text}
                      dangerouslySetInnerHTML={{ __html: body.text }}
                    ></div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </article>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          slug: 'como-utilizar-hooks',
        },
      },
      {
        params: {
          slug: 'criando-um-app-cra-do-zero',
        },
      },
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;
  const prismic = getPrismicClient({});
  const response = await prismic.getByUID('post', String(slug), {});

  // const post = {
  //   first_publication_date: response.first_publication_date,
  //   data: {
  //     title: response.data.title,
  //     banner: response.data.banner,
  //     author: response.data.author,
  //     content: response.data.content.map(content => ({
  //       heading: content.heading,
  //       body: content.body.map(body => ({ text: prismicHelper.asHTML(body) })),
  //     })),
  //   },
  // };

  return {
    props: { post: response },
    revalidate: 60 * 30, //30 minutes
  };
};

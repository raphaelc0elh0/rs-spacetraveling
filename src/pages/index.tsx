import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { FiCalendar, FiUser } from 'react-icons/fi';
import { getPrismicClient } from '../services/prismic';
import format from '../utils/format';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';
import { useState } from 'react';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps) {
  const [nextPage, setNextPage] = useState<string>(postsPagination.next_page);
  const [posts, setPosts] = useState<Post[]>(postsPagination.results);

  const loadMorePosts = async () => {
    try {
      const response = await fetch(postsPagination.next_page);
      const data = await response.json();
      setNextPage(data.next_page);
      setPosts(prevPosts => [...prevPosts, ...data.results]);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <Head>
        <title>Home | spacetraveling</title>
      </Head>
      <main className={styles.postsContainer}>
        {posts.map(post => (
          <Link key={post.uid} href={`/post/${post.uid}`}>
            <a>
              <strong>{post.data.title}</strong>
              <p>{post.data.subtitle}</p>
              <div className={commonStyles.postDetails}>
                <span>
                  <FiCalendar /> {format(post.first_publication_date)}
                </span>
                <span>
                  <FiUser /> {post.data.author}
                </span>
              </div>
            </a>
          </Link>
        ))}
        {nextPage && (
          <button type="button" onClick={loadMorePosts}>
            Carregar mais posts
          </button>
        )}
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient({});
  const response = await prismic.getByType('post', {
    fetch: ['post.title', 'post.subtitle', , 'post.author'],
    pageSize: 2,
  });

  return {
    props: {
      postsPagination: response,
    },
  };
};

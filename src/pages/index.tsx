import Head from 'next/head';
import Link from 'next/link';
import { FiCalendar, FiUser } from 'react-icons/fi';

// import { getPrismicClient } from '../services/prismic';

// import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

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

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | spacetraveling</title>
      </Head>
      <main className={styles.postsContainer}>
        <Link href={`/`}>
          <a>
            <strong>Como utilizar Hooks</strong>
            <p>Pensando em sincronização em vez de cliclos de vida.</p>
            <div>
              <span>
                <FiCalendar /> 15 Mar 2021
              </span>
              <span>
                <FiUser /> Joseph Oliveira
              </span>
            </div>
          </a>
        </Link>
        <Link href={`/`}>
          <a>
            <strong>Como utilizar Hooks</strong>
            <p>Pensando em sincronização em vez de cliclos de vida.</p>
            <div>
              <span>
                <FiCalendar /> 15 Mar 2021
              </span>
              <span>
                <FiUser /> Joseph Oliveira
              </span>
            </div>
          </a>
        </Link>
        <Link href={`/`}>
          <a>
            <strong>Como utilizar Hooks</strong>
            <p>Pensando em sincronização em vez de cliclos de vida.</p>
            <div>
              <span>
                <FiCalendar /> 15 Mar 2021
              </span>
              <span>
                <FiUser /> Joseph Oliveira
              </span>
            </div>
          </a>
        </Link>
        <button type="button">Carregar mais posts</button>
      </main>
    </>
  );
}

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient({});
//   // const postsResponse = await prismic.getByType(TODO);

//   // TODO
// };

import Head from 'next/head';
import Link from 'next/link';

// import { getPrismicClient } from '../services/prismic';

// import commonStyles from '../styles/common.module.scss';
// import styles from './home.module.scss';

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
      <main>
        <div>
          <Link href={`/`}>
            <a>
              <strong>Como utilizar Hooks</strong>
              <p>Pensando em sincronização em vez de cliclos de vida.</p>
              <div>
                <time>15 Mar 2021</time>
                <span>Joseph Oliveira</span>
              </div>
            </a>
          </Link>
          <Link href={`/`}>
            <a>
              <time>15 Mar 2021</time>
              <strong>Como utilizar Hooks</strong>
              <div>
                <time>15 Mar 2021</time>
                <span>Joseph Oliveira</span>
              </div>
            </a>
          </Link>
          <Link href={`/`}>
            <a>
              <time>15 Mar 2021</time>
              <strong>Como utilizar Hooks</strong>
              <div>
                <time>15 Mar 2021</time>
                <span>Joseph Oliveira</span>
              </div>
            </a>
          </Link>
        </div>
      </main>
    </>
  );
}

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient({});
//   // const postsResponse = await prismic.getByType(TODO);

//   // TODO
// };

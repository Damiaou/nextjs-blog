import Head from "next/head";
import Layout, { siteTitle } from "./components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "./components/date";

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Hello ! My name is Damien, I'm a web developper and I like veg sushi &
          maki
        </p>
        <p>
          I will be posting about various subjects but I don't know them yet. So I'll come back and update this section ;).
        </p>
        <p>
          Comes from <a href="https://github.com/Damiaou/nextjs-blog">here</a>
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './index.module.css';

const avatars = [
  {
    name: '３＋１　｜　さん↑ぷらす→うの↑',
    image: '/img/3+1_main.webp',
    to: '/docs/intro',
  },
];

export default function Home() {
  return (
    <Layout title="アバタードキュメント | HINASAKI" description="HINASAKIアバタードキュメント">
      <main className={styles.main}>
        <h1 className={styles.title}>Avatar Documents</h1>
        <p className={styles.subtitle}>アバターを選ぶ：</p>
        <div className={styles.grid}>
          {avatars.map((avatar) => (
            <Link key={avatar.name} to={avatar.to} className={styles.card}>
              <p className={styles.avatarName}>{avatar.name}</p>
              <img
                src={avatar.image}
                alt={avatar.name}
                className={styles.avatarImage}
              />
            </Link>
          ))}
        </div>
      </main>
    </Layout>
  );
}

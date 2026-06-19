import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './index.module.css';

const avatars = [
  {
    name: '３＋１（さん↑ぷらす→うの↑）',
    reading: 'さん↑ぷらす→うの↑',
    logo: '/img/3+1_logo.svg',
    image: '/img/3+1_main.webp',
    modelNumber: 'T2404',
    to: '/docs/intro',
  },
];

export default function Home() {
  return (
    <Layout title="アバタードキュメント | HINASAKI" description="HINASAKIアバタードキュメント">
      <main className={styles.main}>
        <h1 className={styles.title}>Avatar Documents</h1>
        <p className={styles.subtitle}>アバターを選択してください。</p>
        <div className={styles.grid}>
          {avatars.map((avatar) => (
            <Link key={avatar.name} to={avatar.to} className={styles.card}>
              <div className={styles.avatarNameRow}>
                <img
                  src={avatar.logo}
                  alt={avatar.name}
                  className={styles.avatarLogo}
                />
                <span className={styles.avatarReading}>　｜　{avatar.reading}</span>
              </div>
              <img
                src={avatar.image}
                alt={avatar.name}
                className={styles.avatarImage}
              />
              <span className={styles.modelNumber}>({avatar.modelNumber})</span>
            </Link>
          ))}
        </div>
      </main>
    </Layout>
  );
}

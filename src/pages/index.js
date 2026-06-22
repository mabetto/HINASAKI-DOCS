import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Translate, {translate} from '@docusaurus/Translate';
import styles from './index.module.css';

const avatars = [
  {
    name: '３＋１（さん↑ぷらす→うの↑）',
    reading: 'さん↑ぷらす→うの↑',
    logo: '/img/3+1_logo.svg',
    image: '/img/3+1_main.webp',
    modelNumber: 'T2404',
    path: '/3plus1/overview/about',
  },
];

export default function Home() {
  const {i18n: {currentLocale, defaultLocale}} = useDocusaurusContext();
  const localePrefix = currentLocale === defaultLocale ? '' : `/${currentLocale}`;
  return (
    <Layout
      title={translate({id: 'homepage.title', message: 'アバタードキュメント'})}
      description={translate({id: 'homepage.description', message: 'HINASAKIアバタードキュメント'})}
    >
      <main className={styles.main}>
        <h1 className={styles.title}>Avatar Documents</h1>
        <p className={styles.subtitle}>
          <Translate id="homepage.selectAvatar">アバターを選択してください。</Translate>
        </p>
        <div className={styles.grid}>
          {avatars.map((avatar) => (
            <Link key={avatar.name} to={`${localePrefix}${avatar.path}`} className={styles.card}>
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

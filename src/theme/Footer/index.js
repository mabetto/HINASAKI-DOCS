import styles from './styles.module.css';

const links = [
  { label: 'BOOTH', href: 'https://hinasaki.booth.pm/' },
  { label: 'X', href: 'https://x.com/mbM0001_' },
  { label: 'VRChat Group', href: 'https://vrc.group/HNSK.5029' },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <a
          href="https://discord.gg/QcageYmsZM"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://img.shields.io/discord/1310456099069104138?style=for-the-badge&logo=discord&logoColor=white&label=Discord&color=5865F2"
            alt="Discord"
            className={styles.discordBadge}
          />
        </a>
        <nav className={styles.links}>
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              {link.label}
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.externalIcon}>
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          ))}
        </nav>
        <p className={styles.copyright}>
          Copyright © {new Date().getFullYear()} HINASAKI. All Rights Reserved.
        </p>
        <p className={styles.builtWith}>
          Built with{' '}
          <a href="https://docusaurus.io/" target="_blank" rel="noopener noreferrer">
            Docusaurus
          </a>
        </p>
      </div>
    </footer>
  );
}

import styles from './styles.module.css';

const links = [
  {
    label: 'BOOTH',
    href: 'https://hinasaki.booth.pm/',
    icon: <img src="/img/Booth_logo.svg" alt="BOOTH" className={styles.boothIcon} />,
  },
  {
    label: 'VRChat Group',
    href: 'https://vrc.group/HNSK.5029',
    icon: <img src="/img/VRChat_Logo.svg" alt="VRChat" className={styles.vrchatIcon} />,
  },
  {
    label: 'X',
    href: 'https://x.com/mbM0001_',
    icon: <img src="/img/X_logo.svg" alt="X" className={styles.xIcon} />,
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.topRow}>
          <nav className={styles.links}>
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconButton}
                aria-label={link.label}
                title={link.label}
              >
                {link.icon}
              </a>
            ))}
          </nav>
          <a
            href="https://discord.gg/QcageYmsZM"
            target="_blank"
            rel="noopener noreferrer"
            style={{display: 'flex', alignItems: 'center'}}
          >
            <img
              src="https://img.shields.io/discord/1310456099069104138?style=for-the-badge&logo=discord&logoColor=white&label=Discord&color=5865F2"
              alt="Discord"
              className={styles.discordBadge}
            />
          </a>
        </div>
        <div className={styles.bottomText}>
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
      </div>
    </footer>
  );
}

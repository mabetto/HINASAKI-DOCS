import {useThemeConfig} from '@docusaurus/theme-common';
import {
  splitNavbarItems,
  useNavbarMobileSidebar,
} from '@docusaurus/theme-common/internal';
import {useLocation} from '@docusaurus/router';
import NavbarItem from '@theme/NavbarItem';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import SearchBar from '@theme/SearchBar';
import NavbarMobileSidebarToggle from '@theme/Navbar/MobileSidebar/Toggle';
import NavbarLogo from '@theme/Navbar/Logo';
import NavbarSearch from '@theme/Navbar/Search';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useState, useRef, useEffect} from 'react';
import styles from './styles.module.css';

function useNavbarItems() {
  return useThemeConfig().navbar.items;
}

function NavbarItems({items}) {
  return (
    <>
      {items.map((item, i) => (
        <NavbarItem {...item} key={i} />
      ))}
    </>
  );
}

const LOCALE_LABELS = {ja: 'JP', en: 'EN', ko: 'KO'};

function MobileLocaleDropdown() {
  const {i18n: {currentLocale, locales, defaultLocale}} = useDocusaurusContext();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const getLocaleUrl = (locale) => {
    let path = location.pathname;
    if (currentLocale !== defaultLocale) {
      path = path.replace(new RegExp(`^/${currentLocale}`), '') || '/';
    }
    return locale === defaultLocale ? path : `/${locale}${path}`;
  };

  return (
    <div ref={ref} className={styles.mobileLocaleWrapper}>
      <button
        className={styles.mobileLocale}
        aria-label="言語切り替え"
        onClick={() => setOpen(o => !o)}
      >
        {LOCALE_LABELS[currentLocale] ?? currentLocale.toUpperCase()}
      </button>
      {open && (
        <ul className={styles.mobileLocaleMenu}>
          {locales.map(locale => (
            <li key={locale}>
              <a
                href={getLocaleUrl(locale)}
                lang={locale}
                className={locale === currentLocale ? styles.mobileLocaleActive : ''}
                onClick={() => setOpen(false)}
              >
                {LOCALE_LABELS[locale] ?? locale.toUpperCase()}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function NavbarContent() {
  const mobileSidebar = useNavbarMobileSidebar();
  const items = useNavbarItems();
  const [leftItems, rightItems] = splitNavbarItems(items);

  return (
    <div className={styles.navbarLayout}>
      {/* 左: ドキュメントタブ (PC) / ハンバーガー (モバイル) */}
      <div className={styles.navbarLeft}>
        <div className={styles.mobileOnly}>
          {!mobileSidebar.disabled && <NavbarMobileSidebarToggle />}
        </div>
        <div className={styles.desktopOnly}>
          <NavbarItems items={leftItems} />
        </div>
      </div>

      {/* 中央: ロゴ */}
      <div className={styles.navbarCenter}>
        <NavbarLogo />
      </div>

      {/* 右: ロケール等 (PC) + ロケールドロップダウン (モバイル) */}
      <div className={styles.navbarRight}>
        <div className={styles.desktopOnly}>
          <NavbarItems items={rightItems} />
        </div>
        <MobileLocaleDropdown />
        <NavbarColorModeToggle className={styles.colorModeToggle} />
        <NavbarSearch>
          <SearchBar />
        </NavbarSearch>
      </div>
    </div>
  );
}

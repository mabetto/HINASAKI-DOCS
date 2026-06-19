import {useThemeConfig} from '@docusaurus/theme-common';
import {
  splitNavbarItems,
  useNavbarMobileSidebar,
} from '@docusaurus/theme-common/internal';
import NavbarItem from '@theme/NavbarItem';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import SearchBar from '@theme/SearchBar';
import NavbarMobileSidebarToggle from '@theme/Navbar/MobileSidebar/Toggle';
import NavbarLogo from '@theme/Navbar/Logo';
import NavbarSearch from '@theme/Navbar/Search';
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

      {/* 右: ロケール等 (PC) + JPボタン (モバイル) */}
      <div className={styles.navbarRight}>
        <div className={styles.desktopOnly}>
          <NavbarItems items={rightItems} />
        </div>
        <button className={styles.mobileLocale} aria-label="言語切り替え">
          JP
        </button>
        <NavbarColorModeToggle className={styles.colorModeToggle} />
        <NavbarSearch>
          <SearchBar />
        </NavbarSearch>
      </div>
    </div>
  );
}

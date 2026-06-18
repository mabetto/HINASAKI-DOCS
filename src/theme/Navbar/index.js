import {useEffect} from 'react';
import OriginalNavbar from '@theme-original/Navbar';

function MobileLocaleButton() {
  useEffect(() => {
    const navbar = document.querySelector('.navbar__inner');
    if (!navbar) return;

    const existing = document.querySelector('.navbar-locale-mobile');
    if (existing) return;

    const btn = document.createElement('button');
    btn.className = 'navbar-locale-mobile';
    btn.textContent = 'JP';
    btn.setAttribute('aria-label', '言語切り替え');
    navbar.appendChild(btn);

    return () => {
      btn.remove();
    };
  }, []);

  return null;
}

export default function Navbar(props) {
  return (
    <>
      <OriginalNavbar {...props} />
      <MobileLocaleButton />
    </>
  );
}

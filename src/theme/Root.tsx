import React, { useEffect, useState } from 'react';
import { useLocation } from '@docusaurus/router';
import styles from '@site/src/components/AgeGate/styles.module.css';

const STORAGE_KEY = 'hinasaki_age_verified';
const R18_PATHS = ['/3plus1/se-extension'];

export default function Root({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isR18 = R18_PATHS.some(p => location.pathname.startsWith(p));
  const [verified, setVerified] = useState<boolean | null>(null);

  useEffect(() => {
    setVerified(localStorage.getItem(STORAGE_KEY) === 'true');
  }, []);

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setVerified(true);
  };

  const handleDecline = () => {
    history.back();
  };

  if (isR18 && verified !== true) {
    return (
      <div style={{
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--ifm-background-color, #fff)',
        padding: '2rem 1rem',
        boxSizing: 'border-box',
      }}>
        <div className={styles.dialog}>
          <h2 className={styles.title}>年齢確認</h2>
          <p className={styles.body}>
            このページには成人向けのコンテンツが含まれています。<br />
            あなたは18歳以上ですか？
          </p>
          <div className={styles.actions}>
            <button className={styles.accept} onClick={handleAccept}>
              はい、18歳以上です
            </button>
            <button className={styles.decline} onClick={handleDecline}>
              いいえ
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

import React from 'react';
import styles from './styles.module.css';

// 「表情」ページの Face と同じ構造：80px 角のサムネイル（角丸 12px）
export default function FtSample({ name, alt }: { name: string; alt: string }) {
  return (
    <div className={styles.thumb}>
      <img src={`/img/ft/${name}.webp`} alt={alt} loading="lazy" className={styles.img} />
    </div>
  );
}
import React from 'react';
import styles from './styles.module.css';

export default function FaqCard({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <div className={styles.card}>
      <div className={styles.question}>
        <span className={styles.badge}>Q</span>
        <span>{q}</span>
      </div>
      <div className={styles.answer}>
        <span className={styles.badgeA}>A</span>
        <div className={styles.answerBody}>{children}</div>
      </div>
    </div>
  );
}

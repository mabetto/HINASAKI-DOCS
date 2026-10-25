import React from 'react';
import styles from './styles.module.css';

type Item = { icon: string; label: string; desc: string };
type Center = { label: string; desc: string };

type Props = {
  up: Item;
  left: Item;
  center: Center;
  right: Item;
  down: Item;
};

function Cell({ visual, label, desc }: { visual: React.ReactNode; label: string; desc: string }) {
  return (
    <div className={styles.cell}>
      {visual}
      <strong className={styles.label}>{label}</strong>
      <span className={styles.desc}>{desc}</span>
    </div>
  );
}

function IconCell({ icon, label, desc }: Item) {
  return (
    <Cell
      visual={<img src={`/img/icons/${icon}.png`} alt={icon} className={styles.visual} />}
      label={label}
      desc={desc}
    />
  );
}

export default function DirectionPad({ up, left, center, right, down }: Props) {
  return (
    <div className={styles.pad}>
      <div />
      <IconCell {...up} />
      <div />
      <IconCell {...left} />
      <Cell
        visual={<span className={`${styles.visual} ${styles.neutral}`} aria-hidden="true" />}
        label={center.label}
        desc={center.desc}
      />
      <IconCell {...right} />
      <div />
      <IconCell {...down} />
      <div />
    </div>
  );
}

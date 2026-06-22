import React, { useState } from 'react';
import { translate } from '@docusaurus/Translate';
import styles from './styles.module.css';

function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToHex(h: number, s: number, l: number): string {
  const hN = h / 360, sN = s / 100, lN = l / 100;
  let r: number, g: number, b: number;
  if (s === 0) {
    r = g = b = lN;
  } else {
    const q = lN < 0.5 ? lN * (1 + sN) : lN + sN - lN * sN;
    const p = 2 * lN - q;
    const h2r = (t: number) => {
      if (t < 0) t += 1; if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    r = h2r(hN + 1/3); g = h2r(hN); b = h2r(hN - 1/3);
  }
  return '#' + [r, g, b].map(x => Math.round(x * 255).toString(16).padStart(2, '0')).join('');
}

function getLuma(hex: string): number {
  const r = parseInt(hex.slice(1,3),16)/255;
  const g = parseInt(hex.slice(3,5),16)/255;
  const b = parseInt(hex.slice(5,7),16)/255;
  return 0.2126*r + 0.7152*g + 0.0722*b;
}

function textOn(hex: string): string {
  return getLuma(hex) > 0.45 ? 'rgba(0,0,0,0.75)' : 'rgba(255,255,255,0.85)';
}

function hexToRgb(hex: string): [number, number, number] {
  return [
    parseInt(hex.slice(1,3),16)/255,
    parseInt(hex.slice(3,5),16)/255,
    parseInt(hex.slice(5,7),16)/255,
  ];
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r,g,b].map(x => Math.round(Math.min(1,x)*255).toString(16).padStart(2,'0')).join('');
}

function applyLight(baseHex: string, lightHex: string, monoAmount: number): string {
  const [br, bg, bb] = hexToRgb(baseHex);
  const [lr, lg, lb] = hexToRgb(lightHex);
  const luma = Math.max(0.2126*lr + 0.7152*lg + 0.0722*lb, 0.001);
  const er = lr + (luma - lr) * monoAmount;
  const eg = lg + (luma - lg) * monoAmount;
  const eb = lb + (luma - lb) * monoAmount;
  const tint = 0.55;
  const tr = Math.min(br * (er / luma), 1);
  const tg = Math.min(bg * (eg / luma), 1);
  const tb = Math.min(bb * (eb / luma), 1);
  return rgbToHex(br*(1-tint) + tr*tint, bg*(1-tint) + tg*tint, bb*(1-tint) + tb*tint);
}

function generatePalette(base: string) {
  const [h, s, l] = hexToHsl(base);
  return {
    base,
    sub: hslToHex(h, Math.max(s - 25, 8), Math.min(l + 12, 88)),
    accent: hslToHex((h + 180) % 360, Math.max(Math.min(s * 2 + 40, 100), 60), Math.max(l - 10, 30)),
    analogousM: hslToHex((h - 30 + 360) % 360, s, l),
    analogousP: hslToHex((h + 30) % 360, s, l),
    complementary: hslToHex((h + 180) % 360, s, l),
  };
}

function Swatch({ color, label, tall = false }: { color: string; label: string; tall?: boolean }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className={styles.swatch} onClick={() => { navigator.clipboard.writeText(color); setCopied(true); setTimeout(() => setCopied(false), 1200); }}>
      <div className={`${styles.swatchColor} ${tall ? styles.swatchLarge : ''}`} style={{ background: color }}>
        <span className={styles.swatchHex} style={{ color: textOn(color) }}>
          {copied ? '✓' : color}
        </span>
      </div>
      <div className={styles.swatchLabel}>{label}</div>
    </div>
  );
}

export default function ColorPalette() {
  const [base, setBase] = useState('#9fc6d6');
  const [light, setLight] = useState('#ffff99');
  const p = generatePalette(base);

  const t = {
    baseColor: translate({ id: 'colorPalette.baseColor', message: 'ベースカラー' }),
    ratioScheme: translate({ id: 'colorPalette.ratioScheme', message: '70 : 25 : 5 の配色' }),
    base70: translate({ id: 'colorPalette.base70', message: 'ベース（70%）' }),
    sub25: translate({ id: 'colorPalette.sub25', message: 'サブ（25%）' }),
    accent5: translate({ id: 'colorPalette.accent5', message: 'アクセント（5%）' }),
    analogousComp: translate({ id: 'colorPalette.analogousComp', message: '類似色・補色' }),
    analogousM: translate({ id: 'colorPalette.analogousM', message: '類似色 −30°' }),
    baseLabel: translate({ id: 'colorPalette.baseLabel', message: 'ベース' }),
    analogousP: translate({ id: 'colorPalette.analogousP', message: '類似色 +30°' }),
    complementary: translate({ id: 'colorPalette.complementary', message: '補色' }),
    monoSim: translate({ id: 'colorPalette.monoSim', message: '_MonochromeLighting シミュレーション' }),
    lightSource: translate({ id: 'colorPalette.lightSource', message: '光源カラー' }),
    noSetting: translate({ id: 'colorPalette.noSetting', message: '設定なし（= 0）' }),
    monoNote: translate({ id: 'colorPalette.monoNote', message: '有彩色ライトが当たったとき、設定ありだとライト色の影響が抑えられます' }),
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div>
          <div className={styles.pickerLabel}>{t.baseColor}</div>
          <div className={styles.pickerRow}>
            <input type="color" value={base} onChange={e => setBase(e.target.value)} className={styles.colorInput} />
            <span className={styles.pickerHex}>{base}</span>
          </div>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.section}>
          <div className={styles.sectionLabel}>{t.ratioScheme}</div>
          <div className={styles.ratioBar}>
            <div style={{ flex: 70, background: p.base }} />
            <div style={{ flex: 25, background: p.sub }} />
            <div style={{ flex: 5, background: p.accent }} />
          </div>
          <div className={styles.swatchRow}>
            <Swatch color={p.base} label={t.base70} tall />
            <Swatch color={p.sub} label={t.sub25} tall />
            <Swatch color={p.accent} label={t.accent5} tall />
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.section}>
          <div className={styles.sectionLabel}>{t.analogousComp}</div>
          <div className={styles.swatchRow}>
            <Swatch color={p.analogousM} label={t.analogousM} />
            <Swatch color={p.base} label={t.baseLabel} />
            <Swatch color={p.analogousP} label={t.analogousP} />
            <Swatch color={p.complementary} label={t.complementary} />
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.section}>
          <div className={styles.sectionLabel}>{t.monoSim}</div>
          <div className={styles.lightPickerRow}>
            <span className={styles.lightPickerLabel}>{t.lightSource}</span>
            <input type="color" value={light} onChange={e => setLight(e.target.value)} className={styles.colorInput} />
            <span className={styles.pickerHex}>{light}</span>
          </div>
          <div className={styles.simRow}>
            <div style={{ flex: 1 }}>
              <div className={styles.simSwatch} style={{ background: applyLight(p.base, light, 0) }} />
              <div className={styles.simLabel}>{t.noSetting}</div>
            </div>
            <div className={styles.simArrow}>→</div>
            <div style={{ flex: 1 }}>
              <div className={styles.simSwatch} style={{ background: applyLight(p.base, light, 0.5) }} />
              <div className={styles.simLabel}>_MonochromeLighting: 0.5</div>
            </div>
          </div>
          <div className={styles.simNote}>{t.monoNote}</div>
        </div>
      </div>
    </div>
  );
}

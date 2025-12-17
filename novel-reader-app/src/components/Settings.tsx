
import { useApp } from '../context/AppContext';
import styles from './Settings.module.css';

interface SettingsProps {
  onClose: () => void;
}

export function Settings({ onClose }: SettingsProps) {
  const { preferences, updatePreferences } = useApp();

  const fontSizes = [12, 14, 16, 18, 20, 24];
  const fontFamilies = [
    { name: 'Serif', value: 'Georgia, serif' },
    { name: 'Sans-serif', value: 'Arial, sans-serif' },
    { name: 'Monospace', value: 'Courier New, monospace' },
  ];

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Settings</h2>
          <button onClick={onClose} className={styles.closeButton}>
            ✕
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.section}>
            <h3>Theme</h3>
            <div className={styles.buttonGroup}>
              <button
                className={preferences.theme === 'light' ? styles.active : ''}
                onClick={() => updatePreferences({ theme: 'light' })}
              >
                ☀️ Light
              </button>
              <button
                className={preferences.theme === 'dark' ? styles.active : ''}
                onClick={() => updatePreferences({ theme: 'dark' })}
              >
                🌙 Dark
              </button>
            </div>
          </div>

          <div className={styles.section}>
            <h3>Font Size</h3>
            <div className={styles.fontSizeGrid}>
              {fontSizes.map(size => (
                <button
                  key={size}
                  className={preferences.fontSize === size ? styles.active : ''}
                  onClick={() => updatePreferences({ fontSize: size })}
                >
                  {size}px
                </button>
              ))}
            </div>
            <div className={styles.preview} style={{ fontSize: `${preferences.fontSize}px` }}>
              The quick brown fox jumps over the lazy dog
            </div>
          </div>

          <div className={styles.section}>
            <h3>Font Family</h3>
            <div className={styles.buttonGroup}>
              {fontFamilies.map(font => (
                <button
                  key={font.value}
                  className={preferences.fontFamily === font.value ? styles.active : ''}
                  onClick={() => updatePreferences({ fontFamily: font.value })}
                  style={{ fontFamily: font.value }}
                >
                  {font.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

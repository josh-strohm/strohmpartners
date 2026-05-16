import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.brand}>
            <Link to="/" className={styles.logo}>
              <img src="/strohm-partners-nobg.png" alt="Strohm Partners" width="260" />
            </Link>
            <p className={styles.tagline}>
              AI automation agency building the digital systems modern businesses depend on.
            </p>
          </div>

          <nav className={styles.nav} aria-label="Footer navigation">
            <div className={styles.navGroup}>
              <h4 className={styles.navTitle}>Site</h4>
              <ul className={styles.navList}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/what-we-build">What We Build</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>
          </nav>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            &copy; {currentYear} Strohm Partners LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
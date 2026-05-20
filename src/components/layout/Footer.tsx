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
              <img src="/StrohmPartnersLLC_Logo_Nobg.png" alt="Strohm Partners" width="260" />
            </Link>
            <p className={styles.tagline}>
              AI consulting and systems engineering. Helping businesses identify where AI fits and building the custom integrations to make it work.
            </p>
          </div>

          <nav className={styles.nav} aria-label="Footer navigation">
            <div className={styles.navGroup}>
              <h4 className={styles.navTitle}>Site</h4>
              <ul className={styles.navList}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/what-we-build">Services</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>
            <div className={styles.navGroup}>
              <h4 className={styles.navTitle}>Legal</h4>
              <ul className={styles.navList}>
                <li><Link to="/terms">Terms of Service</Link></li>
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/refund-policy">Refund Policy</Link></li>
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
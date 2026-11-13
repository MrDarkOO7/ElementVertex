import Link from "next/link";
import Container from "@/components/ui/Container";
import { navLinks, site } from "@/content/site";
import { services } from "@/content/services";
import Logo from "./Logo";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.top}>
          <div className={styles.about}>
            <Logo />
            <p className={styles.tagline}>
              Built on Fundamentals.
              <br />
              <span>Designed for the Next Level.</span>
            </p>
          </div>

          <nav className={styles.col} aria-label="Footer">
            <h2 className={styles.heading}>Explore</h2>
            <ul>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
              <li>
                <Link href="/#contact">Contact</Link>
              </li>
            </ul>
          </nav>

          <div className={styles.col}>
            <h2 className={styles.heading}>Services</h2>
            <ul>
              {services.map((service) => (
                <li key={service.id}>
                  <Link href="/#services">{service.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.col}>
            <h2 className={styles.heading}>Say hello</h2>
            <ul>
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li className={styles.muted}>Working with businesses wherever they are</li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} Element Vertex. All rights reserved.</p>
          <p>One team. Every function.</p>
        </div>
      </Container>
    </footer>
  );
}

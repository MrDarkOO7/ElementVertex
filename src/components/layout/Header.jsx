"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { getBookingHref, navLinks } from "@/content/site";
import Logo from "./Logo";
import styles from "./Header.module.css";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu with Escape, and lock page scroll while it is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);
  const bookingHref = getBookingHref();

  return (
    <header className={`${styles.header} ${scrolled || open ? styles.solid : ""}`}>
      <Container className={styles.bar}>
        <Link href="/" className={styles.brand} aria-label="Element Vertex, home" onClick={close}>
          <Logo />
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          <ul className={styles.links}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={styles.link}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <Button href={bookingHref} className={styles.cta}>
            Book a free call
          </Button>
          <button
            type="button"
            className={styles.toggle}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="visually-hidden">{open ? "Close menu" : "Open menu"}</span>
            <span className={styles.burger} aria-hidden="true" />
          </button>
        </div>
      </Container>

      <div id="mobile-menu" className={`${styles.drawer} ${open ? styles.drawerOpen : ""}`} hidden={!open}>
        <Container>
          <ul className={styles.drawerLinks}>
            {navLinks.map((link, i) => (
              <li key={link.href} style={{ "--i": i }}>
                <Link href={link.href} onClick={close}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button href={bookingHref} size="lg" onClick={close} className={styles.drawerCta}>
            Book a free call
          </Button>
        </Container>
      </div>
    </header>
  );
}

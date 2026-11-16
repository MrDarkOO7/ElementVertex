"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Link from "@/components/ui/NavLink";
import { getBookingHref, lightTopPages, navLinks, routes, site } from "@/content/site";
import Logo from "./Logo";
import styles from "./Header.module.css";

/** Must match the breakpoint in Header.module.css where the mobile menu takes over. */
const DESKTOP_QUERY = "(min-width: 62.0625rem)";

function Arrow() {
  return (
    <svg className={styles.menuArrow} width="22" height="22" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M3 9h11M10 4.5 14.5 9 10 13.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef(null);
  const firstLinkRef = useRef(null);
  const wasOpen = useRef(false);

  // Close the menu whenever the page changes (link, back button, anything).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // The booking button is pointless on the page it links to.
  const onContact = pathname === routes.contact;
  const lightTop = lightTopPages.includes(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While open: Escape closes, the page behind cannot scroll, and widening to desktop closes it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const onResize = (e) => e.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
      document.body.style.overflow = "";
    };
  }, [open]);

  // Focus moves into the menu when it opens and back to the toggle when it closes.
  useEffect(() => {
    if (open) firstLinkRef.current?.focus({ preventScroll: true });
    else if (wasOpen.current) toggleRef.current?.focus({ preventScroll: true });
    wasOpen.current = open;
  }, [open]);

  const close = () => setOpen(false);
  const bookingHref = getBookingHref();

  return (
    <>
      <header className={`${styles.header} ${scrolled || open || lightTop ? styles.solid : ""}`}>
        <Container className={styles.bar}>
          <Link href={routes.home} className={styles.brand} aria-label="Element Vertex, home" onClick={close}>
            <Logo />
          </Link>

          <nav className={styles.nav} aria-label="Primary">
            <ul className={styles.links}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`${styles.link} ${pathname === link.href ? styles.active : ""}`}
                    aria-current={pathname === link.href ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.actions}>
            {onContact ? null : (
              <Button href={bookingHref} className={styles.cta}>
                Book a free call
              </Button>
            )}
            <button
              ref={toggleRef}
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
      </header>

      {/*
        The mobile menu lives outside <header> on purpose: the solid header uses
        backdrop-filter, which would otherwise trap this fixed panel inside the
        header's own small box.
      */}
      <div id="mobile-menu" className={styles.drawer} hidden={!open}>
        <Container className={styles.drawerInner}>
          <nav aria-label="Mobile">
            <ul className={styles.drawerLinks}>
              {navLinks.map((link, i) => {
                const current = pathname === link.href;
                return (
                  <li key={link.href} style={{ "--i": i }}>
                    <Link
                      ref={i === 0 ? firstLinkRef : undefined}
                      href={link.href}
                      onClick={close}
                      className={`${styles.menuLink} ${current ? styles.menuActive : ""}`}
                      aria-current={current ? "page" : undefined}
                    >
                      <span className={styles.menuNum} aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className={styles.menuLabel}>{link.label}</span>
                      <Arrow />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className={styles.drawerFoot} style={{ "--i": navLinks.length }}>
            {onContact ? null : (
              <Button href={bookingHref} size="lg" arrow onClick={close} className={styles.drawerCta}>
                Book a free call
              </Button>
            )}
            <p className={styles.drawerNote}>
              Free intro call. Clear written quote after.
              <br />
              Or email <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          </div>
        </Container>
      </div>
    </>
  );
}

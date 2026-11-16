import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { getBookingHref, site } from "@/content/site";
import styles from "./CtaBand.module.css";

/** Closing call-to-action that ends every page except Contact. */
export default function CtaBand() {
  return (
    <Section tone="dark" grain labelledBy="cta-title" className={styles.band}>
      <div className={styles.glow} aria-hidden="true" />
      <Container className={styles.inner}>
        <h2 id="cta-title" className={`${styles.title} reveal`}>
          Ready for one team to handle it?
        </h2>
        <p className={`${styles.text} reveal`} style={{ "--i": 1 }}>
          A free intro call, then a clear written quote. No pressure.
        </p>
        <div className={`${styles.actions} reveal`} style={{ "--i": 2 }}>
          <Button href={getBookingHref()} size="lg" arrow>
            Book a free call
          </Button>
          <p className={styles.alt}>
            or email{" "}
            <a className={styles.email} href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </p>
        </div>
      </Container>
    </Section>
  );
}

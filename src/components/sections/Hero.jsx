import { LogoMark } from "@/components/layout/Logo";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { getBookingHref } from "@/content/site";
import styles from "./Hero.module.css";

/** Labels that orbit the logo. Angles are spread evenly around the ring. */
const orbiters = ["Marketing", "Accounting", "CRM", "Software", "Operations", "E-commerce"];

export default function Hero() {
  return (
    <Section tone="dark" grain labelledBy="hero-title" className={styles.hero}>
      <div className={styles.glow} aria-hidden="true" />
      <Container className={styles.inner}>
        <div className={styles.copy}>
          <p className={`${styles.kicker} reveal`}>
            <span className={styles.dot} aria-hidden="true" />
            One team for every business function
          </p>

          <h1 id="hero-title" className={styles.title}>
            Stop managing vendors.
            <span className={styles.titleAccent}> Start running your business.</span>
          </h1>

          <p className={styles.lede}>
            Marketing, bookkeeping, CRM, software and virtual assistance from one team. We learn how your business
            works, build what is missing, and keep it running.
          </p>

          <div className={styles.actions}>
            <Button href={getBookingHref()} size="lg" arrow>
              Book a free call
            </Button>
            <Button href="/#services" variant="outline" size="lg">
              See what we do
            </Button>
          </div>

          <p className={styles.note}>Free intro call. Clear written quote after. No pressure.</p>
        </div>

        <div className={styles.stage} aria-hidden="true">
          <svg className={styles.ring} viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="49" fill="none" stroke="currentColor" strokeWidth="0.25" strokeDasharray="0.1 1.6" strokeLinecap="round" />
          </svg>
          <div className={styles.sun}>
            <LogoMark className={styles.mark} />
          </div>
          <ul className={styles.orbit}>
            {orbiters.map((label, i) => (
              <li key={label} className={styles.slot} style={{ "--a": `${(360 / orbiters.length) * i - 20}deg` }}>
                <span className={styles.chip}>{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}

"use client";

import Link from "@/components/ui/NavLink";
import { useInterest } from "@/components/providers/InterestProvider";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import { services } from "@/content/services";
import { routes } from "@/content/site";
import styles from "./ServicesOverview.module.css";

/**
 * Homepage teaser for the Services page. Choosing a card opens the Services
 * page on that service (the explorer reads the same shared "interest").
 */
export default function ServicesOverview() {
  const { setInterest } = useInterest();

  return (
    <Section tone="light" labelledBy="services-overview-title">
      <Container>
        <SectionHeader
          index="03"
          label="What we do"
          id="services-overview-title"
          title="Services that cover the whole business."
          intro="Take one service on its own or combine several. Most clients start with one area and add others as the relationship grows."
        />

        <ul className={styles.grid}>
          {services.map((service, i) => (
            <li key={service.id} className="reveal" style={{ "--i": i % 3 }}>
              <Link href={routes.services} className={styles.card} onClick={() => setInterest(service.id)}>
                <span className={styles.number}>{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.tagline}</p>
                <span className={styles.more} aria-hidden="true">
                  Explore
                  <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                    <path d="M3 9h11M10 4.5 14.5 9 10 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className={`${styles.all} reveal`}>
          <Button href={routes.services} arrow>
            See all services
          </Button>
        </div>
      </Container>
    </Section>
  );
}

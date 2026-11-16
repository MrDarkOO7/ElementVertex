import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import ServiceLink from "@/components/ui/ServiceLink";
import { services } from "@/content/services";
import { routes } from "@/content/site";
import styles from "./ServicesOverview.module.css";

/** Homepage teaser for the Services page. Each card opens /services on that service. */
export default function ServicesOverview() {
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
              <ServiceLink serviceId={service.id} className={styles.card}>
                <span className={styles.number}>{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.tagline}</p>
                <span className={styles.more} aria-hidden="true">
                  Explore
                  <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                    <path d="M3 9h11M10 4.5 14.5 9 10 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </ServiceLink>
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

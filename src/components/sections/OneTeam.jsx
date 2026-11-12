import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import { pillars } from "@/content/copy";
import VendorDiagram from "./VendorDiagram";
import styles from "./OneTeam.module.css";

export default function OneTeam() {
  return (
    <Section tone="dark" grain labelledBy="one-team-title">
      <Container>
        <SectionHeader
          index="02"
          label="Why one team"
          id="one-team-title"
          title="One team instead of a dozen vendors."
          intro="Most growing businesses end up with a freelancer for design, an agency for ads, a bookkeeper somewhere else and a developer who is hard to reach. Each works in isolation, and the owner becomes the coordinator. We exist to take that job off you."
        />

        <div className={styles.compare}>
          <figure className={`${styles.panel} reveal`}>
            <VendorDiagram variant="scattered" />
            <figcaption>
              <h3>Today</h3>
              <p>You brief, chase and reconnect every vendor yourself.</p>
            </figcaption>
          </figure>

          <figure className={`${styles.panel} ${styles.featured} reveal`} style={{ "--i": 2 }}>
            <VendorDiagram variant="unified" />
            <figcaption>
              <h3>With Element Vertex</h3>
              <p>You talk to one team. Everything behind it stays connected.</p>
            </figcaption>
          </figure>
        </div>

        <ul className={styles.pillars}>
          {pillars.map((pillar, i) => (
            <li key={pillar.title} className={`${styles.pillar} reveal`} style={{ "--i": i }}>
              <h3>{pillar.title}</h3>
              <p>{pillar.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

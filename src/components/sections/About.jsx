import Image from "next/image";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import { founders, team, values } from "@/content/copy";
import styles from "./About.module.css";

function Avatar({ founder }) {
  return (
    <span className={styles.avatar}>
      {founder.photo ? (
        <Image
          src={founder.photo}
          alt={founder.name}
          width={400}
          height={400}
          sizes="(max-width: 40rem) 72px, 144px"
          className={styles.photo}
        />
      ) : (
        <span aria-hidden="true">{founder.initials}</span>
      )}
    </span>
  );
}

export default function About() {
  return (
    <Section id="about" tone="dark" grain first labelledBy="about-title">
      <Container>
        <SectionHeader
          level={1}
          index="01"
          label="About us"
          id="about-title"
          title={
            <>
              Built on fundamentals. <span className={styles.accent}>Designed for the next level.</span>
            </>
          }
        />

        <div className={styles.story}>
          <div className={`${styles.philosophy} reveal`}>
            <p className={styles.lead}>We believe every great achievement begins with the right foundation.</p>
            <p>
              <strong>Element</strong> stands for the fundamental components that build something meaningful.{" "}
              <strong>Vertex</strong> is the point where different forces, ideas and capabilities converge.
            </p>
            <p>
              Together they describe what we do: bring the essential pieces of business, technology and innovation
              together into solutions that move organizations forward. We simplify complexity, unlock opportunities and
              build lasting value through clear thinking and purposeful execution.
            </p>
            <p className={styles.mission}>
              Our mission is to give every business a single partner it can rely on: one that understands the objective,
              builds what is needed and keeps it running.
            </p>
          </div>

          <ol className={styles.values}>
            {values.map((value, i) => (
              <li key={value.title} className="reveal" style={{ "--i": i % 2 }}>
                <span className={styles.valueNum}>{String(i + 1).padStart(2, "0")}</span>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className={styles.team}>
          <p className={`${styles.teamLabel} reveal`}>The people behind Element Vertex</p>
          <h3 className={`${styles.teamTitle} reveal`}>{team.title}</h3>
          <p className={`${styles.teamNote} reveal`}>{team.text}</p>
          <ul className={styles.founders}>
            {founders.map((founder, i) => (
              <li key={founder.name} className={`${styles.founder} reveal`} style={{ "--i": i }}>
                <Avatar founder={founder} />
                <p className={styles.name}>{founder.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}

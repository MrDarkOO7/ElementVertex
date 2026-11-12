import Image from "next/image";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import { founders, values } from "@/content/copy";
import styles from "./About.module.css";

function Avatar({ founder }) {
  return (
    <span className={styles.avatar}>
      {founder.photo ? (
        <Image src={founder.photo} alt={founder.name} width={160} height={160} className={styles.photo} />
      ) : (
        <span aria-hidden="true">{founder.initials}</span>
      )}
    </span>
  );
}

export default function About() {
  return (
    <Section id="about" tone="dark" grain labelledBy="about-title">
      <Container>
        <SectionHeader
          index="07"
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
          <h3 className={`${styles.teamTitle} reveal`}>The people behind Element Vertex</h3>
          <ul className={styles.founders}>
            {founders.map((founder, i) => (
              <li key={founder.name} className={`${styles.founder} reveal`} style={{ "--i": i }}>
                <Avatar founder={founder} />
                <p className={styles.name}>{founder.name}</p>
                <p className={styles.role}>Co-founder</p>
              </li>
            ))}
          </ul>
          <p className={`${styles.teamNote} reveal`}>
            Three co-founders with one shared goal: giving businesses a single partner they can rely on. We keep every
            engagement focused on clear objectives, quality delivery and results that last.
          </p>
        </div>
      </Container>
    </Section>
  );
}

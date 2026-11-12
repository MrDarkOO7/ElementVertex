import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import { problems } from "@/content/copy";
import styles from "./Problem.module.css";

export default function Problem() {
  return (
    <Section tone="light" labelledBy="problem-title">
      <Container>
        <SectionHeader
          index="01"
          label="Sound familiar?"
          id="problem-title"
          title="Growing a business shouldn’t mean running a vendor office."
        />

        <ol className={styles.list}>
          {problems.map((item, i) => (
            <li key={item.tag} className={`${styles.row} reveal`} style={{ "--i": 0 }}>
              <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
              <p className={styles.text}>{item.text}</p>
              <span className={styles.tag}>{item.tag}</span>
            </li>
          ))}
        </ol>

        <p className={`${styles.close} reveal`}>
          If one of these is yours, the others are usually close behind. That is why one team that sees the whole
          picture helps.
        </p>
      </Container>
    </Section>
  );
}

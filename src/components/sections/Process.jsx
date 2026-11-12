import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import { processSteps } from "@/content/copy";
import styles from "./Process.module.css";

export default function Process() {
  return (
    <Section id="approach" tone="dark" grain labelledBy="process-title">
      <Container className={styles.inner}>
        <div className={styles.aside}>
          <SectionHeader
            index="05"
            label="Our approach"
            id="process-title"
            title="Understand the objective. Build what is needed. Keep it running."
            intro="Whether you need one service or several, the same steps apply. You can engage us for a defined project, a recurring service or both, and adjust as your needs change."
          />
          <blockquote className={`${styles.quote} reveal`}>
            Because one team handles every stage, nothing is lost in hand-offs between vendors. Marketing knows what
            the CRM is capturing, the CRM feeds the reporting, and the reporting informs the next decision.
          </blockquote>
        </div>

        <ol className={styles.timeline}>
          {processSteps.map((step, i) => (
            <li key={step.title} className={`${styles.step} reveal`}>
              <span className={styles.badge} aria-hidden="true">
                {i + 1}
              </span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

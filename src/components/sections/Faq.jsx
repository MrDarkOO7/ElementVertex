import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import { faqs } from "@/content/copy";
import styles from "./Faq.module.css";

/**
 * Native <details> accordion: accessible and works without JavaScript.
 * Giving every <details> the same `name` makes opening one close the others.
 */
export default function Faq() {
  return (
    <Section id="faq" tone="light" labelledBy="faq-title">
      <Container className={styles.inner}>
        <div className={styles.aside}>
          <SectionHeader
            index="08"
            label="FAQ"
            id="faq-title"
            title="Questions people ask before they call."
            intro="Not here? Send us a message and we will answer it properly."
          />
        </div>

        <div className={styles.list}>
          {faqs.map((item) => (
            <details key={item.q} name="faq" className={`${styles.item} reveal`}>
              <summary>
                <span>{item.q}</span>
                <span className={styles.icon} aria-hidden="true" />
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  );
}

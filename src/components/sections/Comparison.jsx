import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import { comparison } from "@/content/copy";
import styles from "./Comparison.module.css";

export default function Comparison() {
  const [beforeLabel, afterLabel] = comparison.columns;

  return (
    <Section tone="light" labelledBy="comparison-title">
      <Container>
        <SectionHeader
          index="06"
          label="Why Element Vertex"
          id="comparison-title"
          title="Clarity in place of complexity."
          intro="You can keep stitching vendors together, or you can work with one team that understands the whole business."
        />

        <div className={`${styles.wrap} reveal`}>
          <table className={styles.table}>
            <caption className="visually-hidden">Juggling several vendors compared with working with Element Vertex</caption>
            <thead>
              <tr>
                <td />
                <th scope="col">{beforeLabel}</th>
                <th scope="col" className={styles.us}>
                  {afterLabel}
                </th>
              </tr>
            </thead>
            <tbody>
              {comparison.rows.map((row) => (
                <tr key={row.topic}>
                  <th scope="row">{row.topic}</th>
                  <td data-label={beforeLabel}>{row.before}</td>
                  <td data-label={afterLabel} className={styles.us}>
                    {row.after}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </Section>
  );
}

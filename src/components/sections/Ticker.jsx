import Section from "@/components/ui/Section";
import styles from "./Ticker.module.css";

const items = [
  "Marketing",
  "Branding",
  "Accounting",
  "Tax services",
  "CRM management",
  "Automation",
  "Software development",
  "Websites",
  "Virtual assistance",
  "E-commerce",
  "Process support",
];

/** Slow-moving band of everything we do. Decorative, so hidden from screen readers. */
export default function Ticker() {
  return (
    <Section tone="indigo" flush>
      <div className={styles.band} aria-hidden="true">
        {/* The list is rendered twice so the loop is seamless. */}
        {[0, 1].map((copy) => (
          <ul key={copy} className={styles.track}>
            {items.map((item) => (
              <li key={item} className={styles.item}>
                {item}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </Section>
  );
}

import styles from "./SectionHeader.module.css";

/**
 * Numbered eyebrow + heading + optional intro, echoing the
 * "02 / ABOUT US" labels in the company profile.
 */
export default function SectionHeader({ index, label, id, title, intro, level = 2, align = "left", className = "" }) {
  // Each page has exactly one h1: pass level={1} for the page's opening section.
  const Heading = level === 1 ? "h1" : "h2";
  return (
    <header className={`${styles.header} ${align === "center" ? styles.center : ""} ${className}`.trim()}>
      <p className={`${styles.eyebrow} reveal`}>
        <span className={styles.dash} aria-hidden="true" />
        <span>{index}</span>
        <span aria-hidden="true">/</span>
        <span>{label}</span>
      </p>
      <Heading id={id} className={`${styles.title} reveal`} style={{ "--i": 1 }}>
        {title}
      </Heading>
      {intro ? (
        <p className={`${styles.intro} reveal`} style={{ "--i": 2 }}>
          {intro}
        </p>
      ) : null}
    </header>
  );
}

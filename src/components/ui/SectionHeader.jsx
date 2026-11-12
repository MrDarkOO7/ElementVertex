import styles from "./SectionHeader.module.css";

/**
 * Numbered eyebrow + heading + optional intro, echoing the
 * "02 / ABOUT US" labels in the company profile.
 */
export default function SectionHeader({ index, label, id, title, intro, align = "left", className = "" }) {
  return (
    <header className={`${styles.header} ${align === "center" ? styles.center : ""} ${className}`.trim()}>
      <p className={`${styles.eyebrow} reveal`}>
        <span className={styles.dash} aria-hidden="true" />
        <span>{index}</span>
        <span aria-hidden="true">/</span>
        <span>{label}</span>
      </p>
      <h2 id={id} className={`${styles.title} reveal`} style={{ "--i": 1 }}>
        {title}
      </h2>
      {intro ? (
        <p className={`${styles.intro} reveal`} style={{ "--i": 2 }}>
          {intro}
        </p>
      ) : null}
    </header>
  );
}

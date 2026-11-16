import styles from "./Section.module.css";

/**
 * A full-width page section.
 *
 * `tone` sets the colour context. Everything inside reads --fg, --fg-muted,
 * --line, --accent, --on-accent and --surface, so child components never
 * need to know which background they sit on.
 *
 * `first` adds top padding for the fixed header; use it on the opening section of a sub-page.
 *
 * @param {{ tone?: "dark" | "light" | "indigo", grain?: boolean, flush?: boolean, first?: boolean }} props
 */
export default function Section({
  tone = "light",
  grain = false,
  flush = false,
  first = false,
  id,
  labelledBy,
  className = "",
  children,
}) {
  const classes = [
    styles.section,
    styles[tone],
    grain ? styles.grain : "",
    flush ? styles.flush : "",
    first ? styles.first : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section id={id} aria-labelledby={labelledBy} className={classes}>
      {children}
    </section>
  );
}

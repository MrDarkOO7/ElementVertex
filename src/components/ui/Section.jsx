import styles from "./Section.module.css";

/**
 * A full-width page section.
 *
 * `tone` sets the colour context. Everything inside reads --fg, --fg-muted,
 * --line, --accent, --on-accent and --surface, so child components never
 * need to know which background they sit on.
 *
 * @param {{ tone?: "dark" | "light" | "indigo", grain?: boolean, flush?: boolean }} props
 */
export default function Section({
  tone = "light",
  grain = false,
  flush = false,
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

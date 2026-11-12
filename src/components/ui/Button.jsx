import Link from "next/link";
import styles from "./Button.module.css";

function Arrow() {
  return (
    <svg className={styles.arrow} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M3 9h11M10 4.5 14.5 9 10 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Pill button that renders the right element for the job:
 * external URL -> <a target="_blank">, internal path -> next/link,
 * no href -> <button>.
 *
 * @param {{ variant?: "primary" | "outline", size?: "md" | "lg", arrow?: boolean }} props
 */
export default function Button({
  href,
  variant = "primary",
  size = "md",
  arrow = false,
  className = "",
  children,
  ...rest
}) {
  const classes = `${styles.button} ${styles[variant]} ${styles[size]} ${className}`.trim();
  const content = (
    <>
      <span>{children}</span>
      {arrow ? <Arrow /> : null}
    </>
  );

  if (!href) {
    return (
      <button type="button" className={classes} {...rest}>
        {content}
      </button>
    );
  }

  if (/^https?:\/\//.test(href)) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...rest}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {content}
    </Link>
  );
}

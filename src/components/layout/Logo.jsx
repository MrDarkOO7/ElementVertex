import { MARK_PATH, MARK_VIEWBOX } from "./logoMarkPath";
import styles from "./Logo.module.css";

/**
 * Official Element Vertex mark, taken from public/brand/element-vertex-logo-*.svg
 * (path generated into logoMarkPath.js). Inherits colour via currentColor.
 */
export function LogoMark({ className = "", title, ...rest }) {
  return (
    <svg
      className={className}
      viewBox={MARK_VIEWBOX}
      fill="currentColor"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : "true"}
      {...rest}
    >
      <path fillRule="evenodd" d={MARK_PATH} />
    </svg>
  );
}

/** Mark + letter-spaced wordmark. */
export default function Logo({ stacked = false, className = "" }) {
  return (
    <span className={`${styles.logo} ${stacked ? styles.stacked : ""} ${className}`.trim()}>
      <LogoMark className={styles.mark} />
      <span className={styles.word}>Element Vertex</span>
    </span>
  );
}

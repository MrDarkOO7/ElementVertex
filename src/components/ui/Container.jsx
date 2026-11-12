import styles from "./Container.module.css";

/** Centres content and applies the site-wide max width and side gutters. */
export default function Container({ as: Tag = "div", className = "", children, ...rest }) {
  return (
    <Tag className={`${styles.container} ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}

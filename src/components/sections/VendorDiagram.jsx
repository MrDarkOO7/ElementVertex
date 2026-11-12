import { LogoMark } from "@/components/layout/Logo";
import styles from "./VendorDiagram.module.css";

const OWNER = { x: 58, y: 180 };
const HUB = { x: 188, y: 180 };
const NODE = { x: 282, w: 112, h: 36 };
const ROWS = [52, 116, 180, 244, 308];

const scattered = ["Designer", "Ad agency", "Bookkeeper", "Developer", "Assistant"];
const unified = ["Marketing", "Books", "CRM", "Software", "Operations"];

/** Pairs of vendors that end up needing to talk to each other (and don't). */
const crossLinks = [
  [0, 2, 46],
  [1, 3, 62],
  [2, 4, 46],
  [0, 4, 84],
  [1, 4, 30],
];

const curve = (x1, y1, x2, y2) => {
  const mid = (x1 + x2) / 2;
  return `M${x1} ${y1} C${mid} ${y1} ${mid} ${y2} ${x2} ${y2}`;
};

/**
 * Two versions of the same picture.
 *  - "scattered": the owner is wired to five separate vendors that don't talk.
 *  - "unified": the owner talks to one team that already connects everything.
 *
 * @param {{ variant: "scattered" | "unified" }} props
 */
export default function VendorDiagram({ variant }) {
  const isUnified = variant === "unified";
  const labels = isUnified ? unified : scattered;
  const description = isUnified
    ? "Diagram: the business owner talks to one Element Vertex team, which connects marketing, books, CRM, software and operations."
    : "Diagram: the business owner is individually connected to five separate vendors that do not talk to each other.";

  return (
    <svg className={`${styles.svg} ${isUnified ? styles.unified : styles.scattered}`} viewBox="0 0 420 360" role="img" aria-label={description}>
      {isUnified ? (
        <rect className={styles.team} x={NODE.x - 14} y="20" width={NODE.w + 28} height="320" rx="20" />
      ) : null}

      {/* Cross-links: the mess you end up coordinating */}
      {!isUnified &&
        crossLinks.map(([a, b, bulge]) => {
          const x = NODE.x;
          return (
            <path
              key={`${a}-${b}`}
              className={styles.cross}
              d={`M${x} ${ROWS[a]} C${x - bulge} ${ROWS[a]} ${x - bulge} ${ROWS[b]} ${x} ${ROWS[b]}`}
            />
          );
        })}

      {/* Main connections */}
      {ROWS.map((y, i) => (
        <path
          key={y}
          className={isUnified ? styles.flow : styles.link}
          d={isUnified ? curve(HUB.x + 34, HUB.y, NODE.x, y) : curve(OWNER.x + 28, OWNER.y, NODE.x, y)}
          style={isUnified ? { animationDelay: `${i * -0.4}s` } : undefined}
        />
      ))}
      {isUnified ? <path className={styles.flow} d={`M${OWNER.x + 28} ${OWNER.y} H${HUB.x - 34}`} /> : null}

      {/* Vendor / service nodes */}
      {ROWS.map((y, i) => (
        <g key={labels[i]}>
          <rect className={styles.node} x={NODE.x} y={y - NODE.h / 2} width={NODE.w} height={NODE.h} rx={NODE.h / 2} />
          <text className={styles.label} x={NODE.x + NODE.w / 2} y={y} textAnchor="middle" dominantBaseline="central">
            {labels[i]}
          </text>
        </g>
      ))}

      {/* Hub (unified only) */}
      {isUnified ? (
        <g>
          <circle className={styles.hubGlow} cx={HUB.x} cy={HUB.y} r="46" />
          <circle className={styles.hub} cx={HUB.x} cy={HUB.y} r="34" />
          <LogoMark x={HUB.x - 20} y={HUB.y - 8.6} width="40" height="17.2" />
        </g>
      ) : null}

      {/* The business owner */}
      <g>
        <circle className={styles.owner} cx={OWNER.x} cy={OWNER.y} r="28" />
        <text className={styles.ownerLabel} x={OWNER.x} y={OWNER.y} textAnchor="middle" dominantBaseline="central">
          You
        </text>
      </g>
    </svg>
  );
}

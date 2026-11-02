import styles from "./Tooltip.module.css";

export type TooltipPositionType = "top" | "bottom" | "left" | "right";

type TooltipPropsType = React.HTMLAttributes<HTMLDivElement> & {
  position?: TooltipPositionType;
};

function Tooltip({ children, position = "bottom" }: TooltipPropsType) {
  // TODO: use portals here to avoid z-index issues. (example: make sidebar and braindump panels max size then hover the 'logout' button)
  return (
    <div
      className={`${styles.tooltip} ${styles[`tooltip--${position}`]}`}
      aria-hidden="true"
    >
      {children}
    </div>
  );
}

export default Tooltip;

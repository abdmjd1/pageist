import styles from "./Tooltip.module.css";

export type TooltipPositionType = "top" | "bottom" | "left" | "right";

type TooltipPropsType = React.HTMLAttributes<HTMLDivElement> & {
  position?: TooltipPositionType;
};

function Tooltip({ children, position = "bottom" }: TooltipPropsType) {
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

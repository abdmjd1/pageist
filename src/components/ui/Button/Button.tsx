import Tooltip, { TooltipPositionType } from "../Tooltip/Tooltip";
import styles from "./Button.module.css";

type ButtonPropsType = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "ghost" | "outline" | "solid" | "danger" | "ghost-danger";
  size?: "lg" | "md" | "sm" | "xs";
  iconOnly?: boolean;
  tooltipContent?: string;
  tooltipPosition?: TooltipPositionType;
};

function Button({
  variant = "ghost",
  size = "md",
  iconOnly,
  className,
  tooltipContent,
  tooltipPosition,
  children,
  ...rest
}: ButtonPropsType) {
  return (
    <button
      className={[
        styles.button,
        styles[`button--${variant}`],
        styles[`button--${size}`],
        iconOnly && styles[`button--icon-${size}`],
        className,
      ].join(" ")}
      aria-label={tooltipContent}
      {...rest}
    >
      {children}
      {tooltipContent && (
        <Tooltip position={tooltipPosition}>{tooltipContent}</Tooltip>
      )}
    </button>
  );
}

export default Button;

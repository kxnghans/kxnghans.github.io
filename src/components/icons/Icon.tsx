/**
 * @file Icon.tsx
 * @description Centralized Icon Component for Hanson-Tube.
 * Consumes semantic ICONS tokens from iconRegistry.ts.
 */
import type { ComponentProps, CSSProperties } from "react";
import { ICON_MAP, type IconName } from "./iconRegistry";

export interface IconProps extends ComponentProps<"svg"> {
  name: IconName;
  className?: string;
  size?: number | string;
  style?: CSSProperties;
}

export const Icon = ({
  name,
  className = "",
  size,
  style,
  ...rest
}: IconProps) => {
  const IconComponent = ICON_MAP[name];

  if (!IconComponent) {
    if (import.meta.env.DEV) {
      console.warn(`[Icon] Unknown icon name: "${name}"`);
    }
    return null;
  }

  return (
    <IconComponent
      className={className}
      size={size ? Number(size) : undefined}
      style={style}
      aria-hidden="true"
      {...rest}
    />
  );
};

export default Icon;

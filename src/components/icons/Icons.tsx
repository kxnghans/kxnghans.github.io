/**
 * @file Icons.tsx
 * @description Compound icon convenience exports built upon the centralized Icon component.
 */
import { Icon } from "./Icon";
import { ICONS } from "./iconRegistry";

export const ChevronLeftIcon = () => (
  <Icon name={ICONS.CHEVRON_LEFT} className="h-6 w-6" />
);

export const ChevronRightIcon = () => (
  <Icon name={ICONS.CHEVRON_RIGHT} className="h-6 w-6" />
);

export const CloseIcon = () => (
  <Icon name={ICONS.CLOSE} className="h-6 w-6 text-red-600 dark:text-red-500" />
);

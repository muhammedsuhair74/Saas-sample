import { BadgeType } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getBadgeValue = (badgeType: BadgeType) => {
  switch (badgeType) {
    case BadgeType.DAILY:
      return 0;
    case BadgeType.WEEKLY:
      return 1;
    case BadgeType.MONTHLY:
      return 2;
    case BadgeType.WEEKLY_STREAK:
      return 3;
    case BadgeType.MONTHLY_STREAK:
      return 4;
  }
};

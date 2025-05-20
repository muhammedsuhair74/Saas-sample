import { Badge } from "@prisma/client";

const getBadgeType = (badge: Badge) => {
  return badge?.badgeType && badge?.workoutType ? `/badges/${badge?.badgeType}/${badge?.workoutType}.png` : null;
};


export const getBadgeName = (badge: Badge) => {
  return badge?.badgeType && badge?.workoutType ? `${badge?.badgeType} ${badge?.workoutType} Topper` : null;
};

export const getHighestBadge = (badges: Badge[]) => {
  const highestBadge =
    badges?.reduce((max, badge) => {
      return badge.value > max.value ? badge : max;
    }, badges[0]) || null;

  return {
    image: getBadgeType(highestBadge),
    name: getBadgeName(highestBadge),
  };
};


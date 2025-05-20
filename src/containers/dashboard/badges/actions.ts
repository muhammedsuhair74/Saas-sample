import prisma from "@/lib/prisma";

const getBadges = async (userId: string) => {
  const badges = await prisma.badge.findMany({
    where: {
      userId,
    },
  });

  return badges;
};

export { getBadges };
    
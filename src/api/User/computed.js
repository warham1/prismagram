import { prisma } from "../../../generated/prisma-client";

export default {
  User: {
    fullName: parent => {
      return `${parent.firstName} ${parent.lastName}`;
    },
    isFollowing: async (parent, __, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      try {
        return prisma.$exists.user({
          AND: [{ id: parent.id }, { followers_some: { id: user.id } }]
        });
      } catch (error) {
        console.log(error);
        return false;
      }

      return;
    },
    isSelf: async (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      return user.id === parent.id;
    }
  }
};

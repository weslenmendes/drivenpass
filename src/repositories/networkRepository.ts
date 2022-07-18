import prisma from "./../config/database.js";

import { CreateNetworkData } from "./../services/networkService.js";

const networkSelect = {
  id: true,
  userId: true,
  title: true,
  name: true,
  password: true,
  type: true,
};

async function getNetworksByUserId(userId: number) {
  const networks = await prisma.wirellesNetwork.findMany({
    where: {
      userId,
    },
    select: networkSelect,
  });

  return networks;
}

async function getNetworkById(id: number) {
  const network = await prisma.wirellesNetwork.findUnique({
    where: {
      id,
    },
    select: networkSelect,
  });

  return network;
}

async function getNetworkByTitleAndUserId(title: string, userId: number) {
  const network = await prisma.wirellesNetwork.findFirst({
    where: {
      title,
      userId,
    },
    select: networkSelect,
  });

  return network;
}

async function createNetwork(networkData: CreateNetworkData) {
  await prisma.wirellesNetwork.create({
    data: networkData,
  });
}

async function deleteNetwork(id: number) {
  await prisma.wirellesNetwork.delete({
    where: {
      id,
    },
  });
}

export default {
  getNetworksByUserId,
  getNetworkById,
  getNetworkByTitleAndUserId,
  createNetwork,
  deleteNetwork,
};

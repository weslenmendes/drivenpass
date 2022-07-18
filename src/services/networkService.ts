import { WirellesNetwork } from "@prisma/client";

import networkRepository from "./../repositories/networkRepository.js";
import encryptUtils from "./../utils/encryptUtils.js";
import { generateError } from "./../errors/errorGenerator.js";

export type CreateNetworkData = Omit<WirellesNetwork, "id">;
type OptionalNetworkData = Partial<CreateNetworkData>;

async function createNetwork(networkData: CreateNetworkData, userId: number) {
  const { password } = networkData;

  const passwordEncrypted = encryptUtils.encryptByCryptr(password);

  const newNetwork = networkData;
  newNetwork.userId = userId;
  newNetwork.password = passwordEncrypted;

  await networkRepository.createNetwork(newNetwork);
}

async function getNetwork(id: number, userId: number) {
  const network = await networkExists(id);

  isOwnerOfThatNetwork(userId, network.userId);

  const networkData = decryptNetwork(network);

  return networkData;
}

async function getNetworks(userId: number) {
  const networks = await networkRepository.getNetworksByUserId(userId);

  const networksDecrypted = networks.map((card) => decryptNetwork(card));

  return networksDecrypted;
}

async function deleteNetwork(id: number, userId: number) {
  const network = await networkExists(id);

  isOwnerOfThatNetwork(userId, network.userId);

  await networkRepository.deleteNetwork(id);
}

function isOwnerOfThatNetwork(userId: number, ownerId: number) {
  if (userId !== ownerId) {
    throw generateError({
      type: "UnauthorizedError",
      message: "You are not authorized to access this network.",
    });
  }
}

async function networkExists(id: number) {
  const network = await networkRepository.getNetworkById(id);

  if (!network) {
    throw generateError({
      type: "NotFoundError",
      message: "Network not found.",
    });
  }

  return network;
}

function decryptNetwork(network: OptionalNetworkData) {
  const networkDecrypted = network;

  networkDecrypted.password = encryptUtils.decryptByCryptr(network.password);

  return networkDecrypted;
}

export default {
  createNetwork,
  getNetwork,
  getNetworks,
  deleteNetwork,
};

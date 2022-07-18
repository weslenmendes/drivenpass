import { Request, Response } from "express";

import networkService, {
  CreateNetworkData,
} from "./../services/networkService.js";

export async function getWifis(req: Request, res: Response) {
  const userId = +res.locals.user.id;

  const networks = await networkService.getNetworks(userId);

  res.send(networks);
}

export async function getWifi(req: Request, res: Response) {
  const userId = +res.locals.user.id;
  const id = +req.params.id;

  const network = await networkService.getNetwork(id, userId);

  res.send(network);
}

export async function addWifi(req: Request, res: Response) {
  const userId = +res.locals.user.id;
  const networkData: CreateNetworkData = req.body;

  await networkService.createNetwork(networkData, userId);

  res.status(201).send({ message: "Wifi created." });
}

export async function removeWifi(req: Request, res: Response) {
  const userId = +res.locals.user.id;
  const id = +req.params.id;

  await networkService.deleteNetwork(id, userId);

  res.send({ message: "Wifi deleted." });
}

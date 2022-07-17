import { Request, Response } from "express";

import noteService from "./../services/noteService.js";

export async function getNote(req: Request, res: Response) {
  const userId = +res.locals.user.id;
  const id = +req.params.id;

  const note = await noteService.getNote(id, userId);

  res.send(note);
}

export async function getNotes(req: Request, res: Response) {
  const userId = +res.locals.user.id;

  const notes = await noteService.getNotes(userId);

  res.send(notes);
}

export async function createNote(req: Request, res: Response) {
  const userId = +res.locals.user.id;
  const noteData = req.body;

  await noteService.createNote(noteData, userId);

  res.status(201).send({ message: "Note created." });
}

export async function deleteNote(req: Request, res: Response) {
  const userId = +res.locals.user.id;
  const id = +req.params.id;

  await noteService.deleteNote(id, userId);

  res.send({ message: "Note deleted." });
}

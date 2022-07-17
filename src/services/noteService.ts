import { Note } from "@prisma/client";

import noteRepository from "./../repositories/noteRepository.js";
import { generateError } from "./../errors/errorGenerator.js";

export type CreateNoteData = Omit<Note, "id">;

async function createNote(noteData: CreateNoteData, userId: number) {
  const { title } = noteData;

  const titleExists = await noteRepository.getNoteByTitleAndUserId(
    title,
    userId,
  );

  if (titleExists && titleExists?.userId === userId) {
    throw generateError({
      type: "UnprocessableEntityError",
      message: "This title already exists.",
    });
  }

  const newNote = noteData;
  newNote.userId = userId;

  await noteRepository.createNote(newNote);
}

async function getNotes(userId: number) {
  const notes = await noteRepository.getNotesByUserId(userId);
  return notes;
}

async function getNote(id: number, userId: number) {
  const note = await noteRepository.getNoteById(id);

  isOwnerOfThatNote(userId, note.userId);

  return note;
}

async function deleteNote(id: number, userId: number) {
  const note = await noteExists(id);

  isOwnerOfThatNote(userId, note.userId);

  await noteRepository.deleteNote(id);
}

function isOwnerOfThatNote(userId: number, ownerId: number) {
  if (userId !== ownerId) {
    throw generateError({
      type: "UnauthorizedError",
      message: "You are not authorized to access this note.",
    });
  }
}

async function noteExists(id: number) {
  const note = await noteRepository.getNoteById(id);

  if (!note) {
    throw generateError({
      type: "NotFoundError",
      message: "Note not found.",
    });
  }

  return note;
}

export default {
  getNote,
  getNotes,
  createNote,
  deleteNote,
};

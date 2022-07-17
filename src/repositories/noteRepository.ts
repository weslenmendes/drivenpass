import prisma from "./../config/database.js";

import { CreateNoteData } from "./../services/noteService.js";

async function getNotesByUserId(userId: number) {
  const notes = await prisma.note.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      userId: true,
      title: true,
      content: true,
    },
  });

  return notes;
}

async function getNoteById(id: number) {
  const note = await prisma.note.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      userId: true,
      title: true,
      content: true,
    },
  });

  return note;
}

async function getNoteByTitleAndUserId(title: string, userId: number) {
  const note = await prisma.note.findFirst({
    where: {
      title,
      userId,
    },
    select: {
      id: true,
      userId: true,
      title: true,
      content: true,
    },
  });

  return note;
}

async function createNote(noteData: CreateNoteData) {
  await prisma.note.create({
    data: noteData,
  });
}

async function deleteNote(id: number) {
  await prisma.note.delete({
    where: {
      id,
    },
  });
}

export default {
  getNoteById,
  getNoteByTitleAndUserId,
  getNotesByUserId,
  createNote,
  deleteNote,
};

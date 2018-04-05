import uuid from 'uuid';

// Export Constants
export const CREATE_NOTE = 'CREATE_NOTE';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const EDIT_NOTE = 'EDIT_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';

// Export Actions
export function createNote(note, laneId) {
  return {
    type: CREATE_NOTE,
    laneId,
    note: {
      id: uuid(),
      ...note,
    },
  };
}

export function updateNote(note) {
  return {
    type: UPDATE_NOTE,
    note,
  };
}

// is it ok?
export function editNote(note, noteId) {
  return {
    type: EDIT_NOTE,
    noteId,
    note: {
      editing: true,
      ...note,
    },
  };
}

export function deleteNote(noteId, laneId) {
  return {
    type: DELETE_NOTE,
    noteId,
    laneId,
  };
}

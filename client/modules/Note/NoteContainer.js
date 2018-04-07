import { connect } from 'react-redux';
import Notes from './Notes';
import { updateNoteRequest, deleteNoteRequest, editNote } from '../Note/NoteActions';

const mapDispatchToProps = {
  updateNote: updateNoteRequest,
  deleteNote: deleteNoteRequest,
  editNote,
};

export default connect(
  null,
  mapDispatchToProps
)(Notes);
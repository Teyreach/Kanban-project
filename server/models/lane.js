import mongoose from 'mongoose';
import Note from '../models/note';
const Schema = mongoose.Schema;

const laneSchema = new Schema({
  name: { type: 'String', required: true },
  notes: [{ type: Schema.ObjectId, ref: 'Note', required: true}],
  id: { type: 'String', required: true, unique: true },
}, { usePushEach: true });

function populateNotes(next) {
  this.populate('notes');
  next();
}

function deleteNotes(next) {
  this.notes.forEach(note => {
    Note.remove({ id: note.id }).exec();
  });
  next();
}

laneSchema.pre('find', populateNotes);
laneSchema.pre('findOne', populateNotes);
laneSchema.pre('remove', deleteNotes);

export default mongoose.model('Lane', laneSchema);

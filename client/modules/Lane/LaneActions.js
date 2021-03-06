import callApi from '../../util/apiCaller';
import { lanes } from '../../util/schema';
import { normalize } from 'normalizr';
import { createNotes } from '../Note/NoteActions';

// Export Constants
export const CREATE_LANE = 'CREATE_LANE';
export const UPDATE_LANE = 'UPDATE_LANE';
export const DELETE_LANE = 'DELETE_LANE';
export const EDIT_LANE = 'EDIT_LANE';
export const CREATE_LANES = 'CREATE_LANES';
export const FETCH_LANES = 'FETCH_LANES';
export const MOVE_BETWEEN_LANES = 'MOVE_BETWEEN_LANES';
export const CLEAR_LANES_CHANGES = 'CLEAR_LANES_CHANGES';
export const UPDATE_LANES_NOTES = 'UPDATE_LANES_NOTES';

// Export Actions
export function createLane(lane) {
  return {
    type: CREATE_LANE,
    lane: {
      notes: lane.notes || [],
      ...lane,
    }
  };
}

export function createLanes(lanesData) {
  return {
    type: CREATE_LANES,
    lanes: lanesData,
  };
}

export function createLaneRequest(lane) {
  return (dispatch) => {  
    return callApi('lanes', 'post', lane).then(res => {
      dispatch(createLane(res));
    })
  };
}

export function updateLane(lane) {
  return {
    type: UPDATE_LANE,
    lane,
  };
}

export function updateLaneRequest(lane) {
  return (dispatch) => {
      return callApi(`lanes/${lane.id}/name`, 'post', lane).then(resLane => {
        dispatch(updateLane(lane));
      })
  }
}

export function deleteLane(laneId) {
  return {
    type: DELETE_LANE,
    laneId
  };
}

export function deleteLaneRequest(lane) {
  return (dispatch) => {
    return callApi('lanes/' + lane.id, 'delete').then(resLane => {
      dispatch(deleteLane(resLane.id));
    })
  };
}

export function editLane(laneId) {
    return {
        type: EDIT_LANE,
        id: laneId
    }
}

export function fetchLanes() {
  return (dispatch) => {
    return callApi('lanes').then(res => {
      const normalized = normalize(res.lanes, lanes);
      const { lanes: normalizedLanes, notes } = normalized.entities;
      dispatch(createLanes(normalizedLanes));
      dispatch(createNotes(notes));
    });
  };
}

export function moveBetweenLanes(targetLaneId, sourceLaneId, sourceNoteId, targetNoteId) {
  return {
    type: MOVE_BETWEEN_LANES,
    sourceLaneId,
    targetLaneId,
    sourceNoteId,
    targetNoteId
  };
}

export function updateLanesNotes(updatedLanes) {
  return (dispatch) => {
    return callApi('lanes/update', 'post', updatedLanes).then(res => {
        console.log(5);
        console.log(res)
    })
  }
}

export function clearLanesChanges() {
  return {
    type: CLEAR_LANES_CHANGES,
  }
}
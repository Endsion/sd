import { handleActions } from 'redux-actions';
import {
    FETCH_UPLOADIOSFILE_STATE_SUCCESS,

    FETCH_UPLOAD_ISO_FILE_SUCCESS,
} from '../constants/uploadISOFile';

let INITIAL_STATE = {
  image: {},
  isUpload: false,
  isVisible: false,
  uploadSuccess: false,
};

export default handleActions({
  [FETCH_UPLOADIOSFILE_STATE_SUCCESS]: (state, action) => {
    INITIAL_STATE = {
      ...INITIAL_STATE,
      image: action.payload.hasOwnProperty('image') ? action.payload.image : state.image,
      isUpload: action.payload.hasOwnProperty('isUpload') ? action.payload.isUpload : state.isUpload,
      isVisible: action.payload.hasOwnProperty('isVisible') ? action.payload.isVisible : state.isVisible,
    }
    return (INITIAL_STATE)
  },

  [FETCH_UPLOAD_ISO_FILE_SUCCESS]: (state, action) => {
    INITIAL_STATE = {
      ...INITIAL_STATE,
      uploadSuccess: action.payload.hasOwnProperty('uploadSuccess') ? action.payload.uploadSuccess : state.uploadSuccess,
    }
    return (INITIAL_STATE);
  },
}, INITIAL_STATE);

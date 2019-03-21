import {
    FETCH_UPLOADIOSFILE_STATE_SUCCESS,

    FETCH_UPLOAD_ISO_FILE_SUCCESS,
} from '../constants/uploadISOFile';

export function fetchUploadISOFileState(params = {}) {
    return dispatch => dispatch({
        type: FETCH_UPLOADIOSFILE_STATE_SUCCESS,
        payload: params,
    });
}

export function fetchUploadISOFile(params = {}) {
    return dispatch => dispatch({
      type: FETCH_UPLOAD_ISO_FILE_SUCCESS,
      payload: params,
    });
}

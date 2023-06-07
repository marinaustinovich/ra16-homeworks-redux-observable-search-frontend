import {
  CHANGE_SEARCH_FIELD,
  SEARCH_SKILLS_REQUEST,
  SEARCH_SKILLS_FAILURE,
  SEARCH_SKILLS_SUCCESS,
  RESET_SEARCH_FIELD,
  CANCEL_SEARCH_SKILLS_REQUEST,
} from './actionTypes';


export const searchSkillsRequest = search => ({
  type: SEARCH_SKILLS_REQUEST,
  payload: {search},
});

export const searchSkillsFailure = error => ({
  type: SEARCH_SKILLS_FAILURE,
  payload: {error},
});

export const searchSkillsSuccess = items => ({
  type: SEARCH_SKILLS_SUCCESS,
  payload: {items},
});

export const changeSearchField = search => ({
  type: CHANGE_SEARCH_FIELD,
  payload: {search},
});

export const resetSearchField = () => ({
  type: RESET_SEARCH_FIELD,
});

export const cancelSearchSkillsRequest = () => ({
  type: CANCEL_SEARCH_SKILLS_REQUEST,
})
import { PROFILE_LOAD } from '../actions/profile';
import { profile } from '../helpers/profileData';

const initialState = {
  entries: [],
  loading: false,
};

// метод который будет менять состояние
export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_LOAD:
      console.log('state', state)
      return {
        ...state,
        entries: profile,
      }

    default:
      return state;
  }
}
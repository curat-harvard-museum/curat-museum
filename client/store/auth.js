import axios from "axios";

const TOKEN = "token";

/**
 * ACTION TYPES
 */
const SET_AUTH = "SET_AUTH";

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });


/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const res = await axios.get("/auth/me", {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setAuth(res.data));
  }
};

export const authenticate =
  (username, email, password, method) => async (dispatch) => {
    try {
      const res = await axios.post(`/auth/${method}`, {
        username,
        email,
        password,
      });
      window.localStorage.setItem(TOKEN, res.data.token);
      dispatch(me());
    } catch (authError) {
      return dispatch(setAuth({ error: authError }));
    }
  };

export const updateUser = (artwork) => {
  return async (dispatch, getState) => {
    const {data} = await axios.put(`/api/users/${getState().auth.id}`, 
      artwork
    );
    return dispatch(setAuth(data))
  }
}

export const logout = (navigate) => {
  window.localStorage.removeItem(TOKEN);
  navigate("/home");
  return {
    type: SET_AUTH,
    auth: {},
  };
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth; 
    default:
      return state;
  }
}

// export const favoritesReducer = (state = [], action) => {
//  switch(action.type){
//    case UPDATE_USER:
//      return state.concat(action.user);
//   default: 
//     return state;
//  }
// }

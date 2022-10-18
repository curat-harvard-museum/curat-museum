import axios, { AxiosError } from "axios";

const TOKEN = "token";

/**
 * ACTION TYPES
 */
const SET_AUTH = "SET_AUTH";
const DELETE_ARTWORK = "DELETE_ARTWORK";

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });

const _deleteArtwork = (artwork) => ({
  type: DELETE_ARTWORK,
  artwork
})


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

export const deleteArtwork = (artwork) => {
  return async(dispatch, getState) => {
    const {data} = await axios.delete(`/api/users/${getState().auth.id}`)
    return dispatch(_deleteArtwork(artwork))
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
    // case DELETE_ARTWORK:
    //   return  
    default:
      return state;
  }
}

export function favoritesReducer(favorites = [], action) {
  switch (action.type){
    case DELETE_ARTWORK:
      return favorites.filter((favorite) => favorite.id !== action.favorite.id);
    default: 
      return favorites;
  }
}

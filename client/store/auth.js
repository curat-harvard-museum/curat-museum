import axios from "axios";

const TOKEN = "token";

/**
 * ACTION TYPES
 */
const SET_AUTH = "SET_AUTH";
const UPDATE_USER = "UPDATE_USER";

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });

const _updateUser = (user) => {
  return {
    type: UPDATE_USER,
    user
  }
}

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

// export const updateUser = (id) = async (dispatch) => {
//   const {data} = await axios.put(`/auth/:id/favorite`, 
//   id
//   );
//   return async (dispatch(me()))
// }

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
    // case UPDATE_USER:
    //   return action.user;  
    default:
      return state;
  }
}

export const favoritesReducer = (state = [], action) => {
 switch(action.type){
   case UPDATE_USER:
     return state.concat(action.user);
  default: 
    return state;
 }
}
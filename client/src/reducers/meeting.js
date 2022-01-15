import {
  GET_MEETING,
  GET_MEETINGS,
  MEET_ERROR,
  DELETE_MEET,
  BOOK_MEET,
} from '../actions/types';
const initialState = {
  meetings: [],
  meeting: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_MEETINGS:
      return {
        ...state,
        meetings: payload,
        loading: false,
      };
    case GET_MEETING:
      return {
        ...state,
        meeting: payload,
        loading: false,
      };
    case BOOK_MEET:
      return {
        ...state,
        loading: false,
      };
    //   case ADD_POST:
    //     return {
    //       ...state,
    //       posts: [payload, ...state.posts],
    //       loading: false,
    //     };
    case DELETE_MEET:
      return {
        ...state,
        meetings: state.meetings.filter((meet) => meet._id !== payload),
        loading: false,
      };
    case MEET_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    //   case UPDATE_LIKES:
    //     return {
    //       ...state,
    //       posts: state.posts.map((post) =>
    //         post._id === payload.id ? { ...post, likes: payload.likes } : post
    //       ),
    //     };
    //   case ADD_COMMENT:
    //     return {
    //       ...state,
    //       post: { ...state.post, comments: payload },
    //       loading: false,
    //     };
    //   case REMOVE_COMMENT:
    //     return {
    //       ...state,
    //       post: {
    //         ...state.post,
    //         comments: state.post.comments.filter(
    //           (comment) => comment._id !== payload
    //         ),
    //       },
    //       loading: false,
    //     };
    default:
      return state;
  }
}

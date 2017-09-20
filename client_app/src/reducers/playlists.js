const initialState = [
  {
    idx: 0,
    name: 'Home',
  },
  {
    idx: 1,
    name: 'Work',
  },
];

export default function playlists(state = initialState, action) {
  if (action.type === 'ADD_PLAYLIST') {
    return [...state, action.payload];
  } else if (action.type === 'DELETE_PLAYLIST') {
    return [
      ...state.filter(playlist => {
        return playlist.idx !== action.payload;
      }),
    ];
  }
  return state;
}

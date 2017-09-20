const initialState = [
  {
    idx: 0,
    name: 'Track #1',
  },
  {
    idx: 1,
    name: 'Track #2',
  },
];

export default function playlist(state = initialState, action) {
  if (action.type === 'ADD_TRACK') {
    return [...state, action.payload];
  } else if (action.type === 'DELETE_TRACK') {
    return [
      ...state.filter(track => {
        return track.idx !== action.payload;
      }),
    ];
  }
  return state;
}

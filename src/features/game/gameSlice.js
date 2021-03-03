import {createAsyncThunk, createSlice, current} from '@reduxjs/toolkit';

export const fetchTiles = createAsyncThunk(
  'tiles/getTiles',
  async (userId, thunkAPI) => {
    const response = await fetch('data.json', {
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    return await response.json();
  }
)

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    position: 0,
    entities: [],
    solved: false
  },
  reducers: {
    changePosition: (state, action) => {
      const {payload} = action;
      const {position, entities } = current(state);
      const { move } = entities[position];
      
      let newPosition = position;
      if(payload === 37 && move.left) {
        newPosition = position - 1;
      }
      if(payload === 38 && move.top) {
        newPosition = position - 10;
      }
      if(payload === 39 && move.right) {
        newPosition = position + 1;
      }
      if(payload === 40 && move.bottom) {
        newPosition = position + 10;
      }
      const { isPit } = entities[newPosition].settings;
      
      return {
        ...state,
        position: newPosition,
        solved: isPit
      }
    },
    setPosition: (state, action) => {
      const {payload} = action;
      const {entities } = current(state);
      let solved = false;
      if (entities[payload]) {
        solved = entities[payload].settings.isPit;
      }
      return {
        ...state,
        position: payload,
        solved
      }
    },
    
  },
  extraReducers: {
    [fetchTiles.fulfilled]: (state, action) => {
      state.entities = action.payload;
      state.position = action.payload.findIndex(item => item.settings.isStart);
    }
  }
});

export const { changePosition, setPosition } = gameSlice.actions;

export const getPosition = state => state.game.position;
export const getEntities = state => state.game.entities;
export const isSolved = state => state.game.solved;

export default gameSlice.reducer;

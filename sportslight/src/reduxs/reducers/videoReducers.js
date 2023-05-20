
import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    videoList : [],
    recommendList :[],
    shortsList : [],
    hitsList : [],
    highlightList : [],
    searchList : []
};

const videoSlice = createSlice({
    name : 'video', initialState,

    reducers : {
        getVideoList(state, action){
            state.videoList = action.payload.data.leagueList;
            state.recommendList = action.payload.data.recommendList;
            state.shortsList = action.payload.data.shortsList;
            state.hitsList = action.payload.data.hitsList;
            state.highlightList = action.payload.data.highlightList;
        },

        getSearchList(state, action){
            console.log(action);
            state.searchList = action.payload.data.searchList;
        },

        getLeagueVideoList(state, action){
            console.log(action);
            state.premierList = action.payload.data.premierList;
            state.championsList = action.payload.data.championsList;
            state.laligaList = action.payload.data.laligaList;
            state.bundesligaList = action.payload.data.bundesligaList;
            state.serieList = action.payload.data.serieList;
            state.europaList = action.payload.data.europaList;
            state.league1List = action.payload.data.league1List;
            state.kOneList = action.payload.data.kOneList;
            state.kTwoList = action.payload.data.kTwoList;
        }
    }
});

export const videoReducers = videoSlice.actions;
export default videoSlice.reducer;
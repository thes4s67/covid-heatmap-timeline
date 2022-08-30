import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/API";
import { hashmap } from "../../utils/hashmap";
import { getUniqueDates } from "../../utils/helpers";

export const getMoreData = createAsyncThunk(
  "mapData/getMoreData",
  async (arg, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${baseUrl}/api/data?sort=${arg.sort}&start=${arg.start}&end=${arg.end}`
      );
      return data;
    } catch (err) {
      console.log("error", err);
      rejectWithValue(err.response.data);
    }
  }
);

export const mapDataSlice = createSlice({
  name: "mapData",
  initialState: {
    drawerOpen: true,
    selectedCountry: "",
    settings: {
      filter: "total_cases",
      orderBy: "asc",
      sortBy: "daily",
      timelineIdx: 0,
      currDate: "",
    },
    data: {
      lastDate: "2020-02-20",
      total: 0,
      rawData: [],
      timeline: [],
    },
  },
  reducers: {
    updateDrawerOpen: (state, param) => {
      state.drawerOpen = param.payload;
    },
    updateCountry: (state, param) => {
      state.selectedCountry = param.payload;
    },
    updateCurrDate: (state, param) => {
      state.settings.currDate = param.payload;
      console.log(param.payload, "updated");
    },
    updateSettings: (state, param) => {},
    updateTimeline: (state, param) => {
      state.settings.timelineIdx = param.payload.idx;
      state.settings.currDate = param.payload.date;
    },
    updateData: (state, param) => {
      const t = getUniqueDates(param.payload);
      if (state.settings.currDate === "") {
        state.settings.currDate = t[0];
      }
      state.data = {
        rawData: hashmap(param.payload),
        timeline: t,
        lastDate: t[t.length - 1],
      };
    },
  },
  extraReducers: {
    [getMoreData.pending]: (state, { payload }) => {
      //do something /w state
    },
    [getMoreData.fulfilled]: (state, { payload, meta }) => {
      //TODO: need to work on sort
      // console.log(meta, "meta");
      state.data.lastDate = meta.arg.end;
      state.data.rawData = hashmap(payload.results, state.data.rawData);
      state.data.timeline = [].concat.apply(
        [],
        [...state.data.timeline, getUniqueDates(payload.results)]
      );
      console.log("its fulfilled!");
    },
    [getMoreData.rejected]: (state, { payload }) => {
      //do something /w state
    },
  },
});

export const {
  updateDrawerOpen,
  updateCountry,
  updateSettings,
  updateData,
  updateTimeline,
  updateCurrDate,
} = mapDataSlice.actions;

export default mapDataSlice.reducer;

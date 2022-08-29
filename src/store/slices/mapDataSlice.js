import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../utils/API";
import { formatDate, getUniqueDates } from "../../utils/helpers";

export const getMoreData = createAsyncThunk(
  "mapData/getMoreData",
  async (arg, { rejectWithValue }) => {
    try {
      console.log("this hits");
      const { data } = await axios.get(
        `${baseUrl}/api/data?sort=${arg.sort}&start=${arg.start}&end=${arg.end}`
      );
      console.log("this wont hit");
      return data;
    } catch (err) {
      console.log("some erorr");
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
      filter: "cases",
      orderBy: "asc",
      sortBy: "daily",
      lastMonth: "",
      timelineIdx: 0,
      currDate: "",
      rawDate: "",
    },
    data: {
      lastDate: "2020-02-20",
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
    updateSettings: (state, param) => {},
    updateTimeline: (state, param) => {
      state.settings.timelineIdx = param.payload.idx;
      state.settings.currDate = param.payload.date;
      state.settings.rawDate = param.payload.raw;
    },
    updateData: (state, param) => {
      const t = getUniqueDates(param.payload);
      if (state.settings.currDate === "") {
        state.settings.currDate = formatDate(t[0]);
        state.settings.rawDate = t[0];
      }
      state.data = {
        rawData: param.payload,
        timeline: t,
        lastDate: formatDate(t[t.length - 1]),
      };
    },
  },
  extraReducers: {
    [getMoreData.pending]: (state, { payload }) => {
      //do something /w state
    },
    [getMoreData.fulfilled]: (state, { payload }) => {
      state.data.rawData = payload;
      state.data.timeline = getUniqueDates(payload);
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
} = mapDataSlice.actions;

export default mapDataSlice.reducer;

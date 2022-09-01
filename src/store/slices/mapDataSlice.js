import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/API";
import { hashmap } from "../../utils/hashmap";
import { getUniqueDates, getNextDate } from "../../utils/helpers";
import moment from "moment";

export const getMoreData = createAsyncThunk(
  "mapData/getMoreData",
  async (arg, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${baseUrl}/api/data?sort=${arg.sort}&start=${arg.start}&end=${arg.end}&orderBy=${arg.orderBy}`
      );
      return data;
    } catch (err) {
      rejectWithValue(err.response.data);
    }
  }
);

export const mapDataSlice = createSlice({
  name: "mapData",
  initialState: {
    drawerOpen: true,
    selectedCountry: "United States",
    settings: {
      filter: "total_cases",
      orderBy: "asc",
      sortBy: "daily",
    },
    data: {
      daily: {
        asc: {
          nextDate: "2020-02-20",
          rawData: {},
          //all remaining values are fixed since our dataset is fixed
          remaining: 931,
          timeline: [],
          currDate: "",
          timelineIdx: null,
        },
        desc: {
          nextDate: "",
          rawData: {},
          remaining: 931,
          timeline: [],
          currDate: "",
          timelineIdx: null,
        },
      },
      monthly: {
        asc: {
          nextDate: "",
          rawData: {},
          remaining: 32,
          timeline: [],
          currDate: "",
          timelineIdx: null,
        },
        desc: {
          nextDate: "",
          rawData: {},
          remaining: 32,
          timeline: [],
          currDate: "",
          timelineIdx: null,
        },
      },
    },
  },
  reducers: {
    updateDrawerOpen: (state, param) => {
      state.drawerOpen = param.payload;
    },
    updateCountry: (state, param) => {
      state.selectedCountry = param.payload;
    },
    updateSettings: (state, param) => {
      if (param.payload.filter) state.settings.filter = param.payload.filter;
      if (param.payload.timelineIdx !== null && param.payload.currDate) {
        state.data = {
          ...state.data,
          [state.settings.sortBy]: {
            ...state.data[state.settings.sortBy],
            [state.settings.orderBy]: {
              ...state.data[state.settings.sortBy][state.settings.orderBy],
              timelineIdx: param.payload.timelineIdx,
              currDate: param.payload.currDate,
            },
          },
        };
      }
      if (param.payload.orderBy && param.payload.sortBy) {
        state.settings.orderBy = param.payload.orderBy;
        state.settings.sortBy = param.payload.sortBy;
        state.selectedCountry = "";
      }
    },
    updateData: (state, param) => {
      const t = getUniqueDates(param.payload);
      state.data = {
        ...state.data,
        daily: {
          ...state.data.daily,
          asc: {
            rawData: hashmap(param.payload),
            timeline: t,
            nextDate: moment(t[t.length - 1])
              .add(1, "d")
              .format("YYYY-MM-DD"),
            timelineIdx: 0,
            currDate: t[0],
            remaining: 931 - t.length,
          },
        },
      };
    },
  },
  extraReducers: {
    [getMoreData.pending]: (state, { payload }) => {
      //do something /w state
    },
    [getMoreData.fulfilled]: (state, { payload, meta }) => {
      const { sort, start, end, orderBy } = meta.arg;
      const uniqueDates = getUniqueDates(payload.results);
      state.data = {
        ...state.data,
        [sort]: {
          ...state.data[sort],
          [orderBy]: {
            ...state.data[sort][orderBy],
            remaining: state.data[sort][orderBy].remaining - uniqueDates.length,
            nextDate: getNextDate(sort, orderBy, payload.results),
            rawData: hashmap(
              payload.results,
              state.data[sort][orderBy].rawData
            ),
            timeline: [].concat.apply(
              [],
              [...state.data[sort][orderBy].timeline, uniqueDates]
            ),
            currDate:
              state.data[sort][orderBy].currDate === ""
                ? payload.results[0].fdate
                : state.data[sort][orderBy].currDate,
            timelineIdx:
              state.data[sort][orderBy].timelineIdx === null
                ? 0
                : state.data[sort][orderBy].timelineIdx,
          },
        },
      };
    },
    [getMoreData.rejected]: (state, { payload }) => {
      //do something /w state
    },
  },
});

export const { updateDrawerOpen, updateCountry, updateSettings, updateData } =
  mapDataSlice.actions;

export default mapDataSlice.reducer;

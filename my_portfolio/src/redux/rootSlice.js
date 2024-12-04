import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const rootSlice = createSlice({
  name: "root",
  initialState: {
    loading: false,
    portfolioData: null,
  },
  reducers: {
    ShowLoading: (state) => {
      state.loading = true;
    },
    HideLoading: (state) => {
      state.loading = false;
    },
    SetPortfolioData: (state, action) => {
      state.portfolioData = action.payload;
    },
  },
});

export const { ShowLoading, HideLoading, SetPortfolioData } = rootSlice.actions;

// Async action to fetch portfolio data
export const fetchPortfolioData = () => async (dispatch) => {
  try {
    dispatch(ShowLoading());
    const response = await axios.get("/api/portfolio/get-portfolio-data");
    if (response.status === 200) {
      dispatch(SetPortfolioData(response.data)); // Update Redux store with fetched data
    }
    dispatch(HideLoading());
  } catch (error) {
    console.error("Error fetching portfolio data:", error);
    dispatch(HideLoading());
  }
};

export default rootSlice.reducer;

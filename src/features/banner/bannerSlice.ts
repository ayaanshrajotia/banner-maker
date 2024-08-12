import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createBannerApi = createAsyncThunk(
    "banner/createBanner",
    async (
        {
            title,
            description,
            linkTitle,
            link,
            expirationTime,
            color,
            showBanner,
        }: {
            title: string;
            description: string;
            linkTitle: string;
            link: string;
            expirationTime: string;
            color: string;
            showBanner: boolean;
        },
        { rejectWithValue }
    ) => {
        try {
            const response = await axios.post(
                `http://localhost:8000/api/banner/create-banner`,
                {
                    title,
                    description,
                    linkTitle,
                    link,
                    expirationTime,
                    color,
                    showBanner,
                }
            );

            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error);
        }
    }
);

export const getBannersApi = createAsyncThunk(
    "banner/getBanners",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `http://localhost:8000/api/banner/get-banners`
            );

            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error);
        }
    }
);

// Define a type for the slice state
interface BannerState {
    title: string;
    description: string;
    linkTitle: string;
    link: string;
    time: {
        h: number;
        m: number;
        s: number;
    };
    datetime: string;
    color: {
        hex: string;
        rgb: {
            r: number;
            g: number;
            b: number;
        };
    };
    showBanner: boolean;
    showMenu: boolean;
    banners: [];
}

// Define the initial state using that type
const initialState: BannerState = {
    title: "",
    description: "",
    linkTitle: "",
    link: "",
    time: {
        h: 0,
        m: 0,
        s: 0,
    },
    color: {
        hex: "#6cdaed",
        rgb: {
            r: 250,
            g: 250,
            b: 250,
        },
    },
    showBanner: false,
    showMenu: true,
    datetime: "",
    banners: [],
};

export const bannerSlice = createSlice({
    name: "banner",
    initialState,
    reducers: {
        setDetails: (state, action) => {
            state.title = action.payload.title;
            state.description = action.payload.description;
            state.link = action.payload.link;
            state.linkTitle = action.payload.linkTitle;
        },

        setTime: (state, action) => {
            state.time.h = action.payload.hours;
            state.time.m = action.payload.minutes;
            state.time.s = action.payload.seconds;
        },

        setDateTime: (state, action) => {
            state.datetime = action.payload;
        },
        setBannerColor: (state, action) => {
            state.color = action.payload.color;
        },

        setShowBanner: (state, action) => {
            state.showBanner = action.payload;
        },
        setShowMenu: (state, action) => {
            state.showMenu = action.payload;
        },
    },
    extraReducers: (builder) => {
        // builder.addCase(createBannerApi.fulfilled, (state, action) => {
        //     state.banners = action.payload;
        // });

        builder.addCase(getBannersApi.fulfilled, (state, action) => {
            state.banners = action.payload;
        });
    },
});

export const {
    setDetails,
    setTime,
    setBannerColor,
    setShowBanner,
    setShowMenu,
    setDateTime,
} = bannerSlice.actions;

export default bannerSlice.reducer;

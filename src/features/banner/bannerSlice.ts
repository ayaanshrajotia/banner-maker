import { createSlice } from "@reduxjs/toolkit";

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

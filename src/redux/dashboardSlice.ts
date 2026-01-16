import { createSlice } from '@reduxjs/toolkit';
import type { Category, Crop } from '../types';

interface CategoryOption {
    label: string;
    value: string;
    name?: string;
    _id?: string;
}

interface HomeState {
    isloading: boolean;
    categoryData: Category[] | null;
    requirements: unknown[];
    categoryList: Category[];
    categoryArray: CategoryOption[];
    cropName: CategoryOption[];
    activeScreen: string;
    uplaodMedia: Record<string, unknown>;
    userDetails: unknown;
    favourite: unknown[];
    isChanged: boolean;
    cropType: Category[];
}

const initialState: HomeState = {
    isloading: false,
    categoryData: null,
    requirements: [],
    categoryList: [],
    categoryArray: [],
    cropName: [],
    activeScreen: '',
    uplaodMedia: {},
    userDetails: '',
    favourite: [],
    isChanged: false,
    cropType: [],
};

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        loadigData(state, action) {
            state.isloading = action.payload;
        },
        fetchCategory(state, action) {
            const cropData: CategoryOption[] = [];
            if (Array.isArray(action.payload)) {
                action.payload.forEach((item: Category) => {
                    cropData.push({
                        label: item.name,
                        value: item._id,
                    });
                });
                state.categoryArray = cropData;
                state.categoryData = action.payload;
            }
        },
        fetchHomeCategory(state, action) {
            const cropData: CategoryOption[] = [];
            if (Array.isArray(action.payload)) {
                action.payload.forEach((item: Category) => {
                    cropData.push({
                        label: item.name,
                        value: item._id,
                    });
                });
                state.categoryArray = cropData;
                state.categoryList = action.payload;
            }
        },
        fetchRequirements(state, action) {
            state.requirements = action.payload;
        },
        fetchCropType(state, action) {
            state.cropType = action.payload;
        },
        uploadMedia(state, action) {
            state.uplaodMedia = action.payload;
        },
        fetchCropname(state, action) {
            const allData: CategoryOption[] = [];
            if (Array.isArray(action.payload)) {
                action.payload.forEach((item: Crop) => {
                    allData.push({
                        label: item.name || '',
                        name: item.name || '',
                        _id: item._id,
                        value: item._id || '',
                    });
                });
                state.cropName = allData;
            }
        },
        setActiveScreen(state, action) {
            state.activeScreen = action.payload;
        },
        setUserDetails(state, action) {
            state.userDetails = action.payload;
        },
        setFavourite(state, action) {
            state.favourite = action.payload;
        },
        setAnyChange(state, action) {
            state.isChanged = action.payload;
        },
    },
});

export const homeAction = homeSlice.actions;
export default homeSlice.reducer;

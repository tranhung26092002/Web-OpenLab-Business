import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { http } from "../../util/config";

export interface MyProductItem {
    id: number,
    title: string,
    thumbnail: string,
    isCompleted: boolean,
    createdBy: string,
    typeProduct: string,
    isPublish: boolean,
    originalPrice: number,
    createdAt: Date,
    updatedAt: Date,
    startDate: Date | null
}

export interface lessonItem {
    id: number,
    titleLesson: string,
    urlVideo: string,
    isCompleted: boolean,
}

export interface MyProductDetailItem {
    id: number,
    title: string,
    thumbnail: string,
    isCompleted: boolean,
    startDate: Date,
    createdBy: string,
    typeProduct: string,
    isPublish: string,
    description: string,
    originalPrice: number,
    lessons: lessonItem[]
}

export interface MyProductState {
    items: MyProductItem[];
    searchResult: SearchResponse;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    currentItem: MyProductDetailItem | null;
}

export interface SearchResponse {
    status: number;
    message: string;
    data: MyProductItem[];
}

const initialState: MyProductState = {
    items: [],
    searchResult: {
        status: 0,
        message: '',
        data: []
    },
    status: 'idle',
    error: null,
    currentPage: 1,
    totalItems: 0,
    itemsPerPage: 2,
    currentItem: null
};

export const fetchAllMyProduct = createAsyncThunk(
    'myProduct/fetchAll',
    async (userId: number | null) => {
        const response = await http.get(`/api/user/${userId}/courses`);
        return response.data;
    }
);

export const addCourse = createAsyncThunk(
    'myProduct/addCourse',
    async (data: { userId: number | null, deviceId: string }, thunkAPI) => {
        try {
            const response = await http.post(`/api/user/${data.userId}/coursesById/${data.deviceId}`);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const fetchMyProductDetail = createAsyncThunk(
    'myProduct/fetchDetail',
    async (id: number) => {
        const response = await http.get(`/api/course/${id}`);
        return response.data;
    }
)

export const searchMyProduct = createAsyncThunk(
    'myProduct/search',
    async (searchItem: string) => {
        const response = await http.get(`/api/course/search?search=${encodeURIComponent(searchItem)}`);
        return response.data;
    }
);

const MyProductSlice = createSlice({
    name: 'myProduct',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //Fetch all baiIoT
        builder.addCase(fetchAllMyProduct.fulfilled, (state, action) => {
            if (Array.isArray(action.payload.data)) {
                state.items = action.payload.data;
            }
        });

        builder.addCase(addCourse.fulfilled, (state, action) => {
            state.status = action.payload.status;
            state.items.push(action.payload.data);
        })

        builder.addCase(fetchMyProductDetail.fulfilled, (state, action) => {
            state.status = action.payload.status;
            state.currentItem = action.payload.data;
        })

        // search baiIoT
        builder.addCase(searchMyProduct.fulfilled, (state, action) => {
            state.searchResult = action.payload;
        })
    }
})

export default MyProductSlice.reducer;

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { history, http } from "../../util/config";

export interface ProductItem {
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

export interface lessonItem{
    id: number,
    titleLesson: string,
    urlVideo: string,
    isCompleted: boolean,
}

export interface ProductDetailItem{
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

export interface ProductState {
    items: ProductItem[];
    searchResult: SearchResponse;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    currentItem: ProductDetailItem | null;
}

export interface SearchResponse {
    status: number;
    message: string;
    data: ProductItem[];
}

const initialState: ProductState = {
    items: [],
    searchResult: {
        status: 0,
        message: '',
        data: []
    },
    status: 'idle',
    error: null || "Unknown",
    currentPage: 1,
    totalItems: 0,
    itemsPerPage: 2,
    currentItem: null
};

export const fetchAllProduct = createAsyncThunk(
    'product/fetchAll',
    async () => {
        const response = await http.get('/api/course/all');
        console.log("allcourse", response);
        return response.data.data;
    }
);

export const fetchProductPaginated = createAsyncThunk(
    'product/fetchPaginated',
    async (params: { page: number, size: number }) => {
        const response = await http.get(`/api/course`, { params });
        return response.data;
    }
);

export const searchProduct = createAsyncThunk(
    'product/search',
    async (searchItem: string) => {
        const response = await http.get(`/api/course/search?search=${encodeURIComponent(searchItem)}`);
        return response.data;
    }
);

export const fetchProductDetail = createAsyncThunk(
    'product/fetchDetail',
    async (id: number) => {
        const response = await http.get(`/api/course/${id}`);
        return response.data;
    }
)

const ProductSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Fetch product
        builder.addCase(fetchProductPaginated.fulfilled, (state, action) => {
            state.items = action.payload.data;
            state.totalItems = action.payload.total;
        });

        //Fetch all baiIoT
        builder.addCase(fetchAllProduct.fulfilled, (state, action) => {
            state.items = action.payload;
        });

        // search baiIoT
        builder.addCase(searchProduct.fulfilled, (state, action) => {
            state.searchResult = action.payload;
        })

        builder.addCase(fetchProductDetail.fulfilled, (state, action) => {
            state.status = action.payload.status;
            state.currentItem = action.payload.data;
        })

    }
})

export default ProductSlice.reducer;

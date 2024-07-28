import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { history, http } from "../../util/config";

export interface CourseItem {
    id: number,
    title: string,
    thumbnail: string,
    isCompleted: boolean,
    createdBy: string,
    typeCourse: string,
    isPublish: boolean,
    description: string,
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

export interface CourseDetailItem {
    id: number,
    title: string,
    thumbnail: string,
    isCompleted: boolean,
    startDate: Date,
    createdBy: string,
    typeCourse: string,
    isPublish: string,
    description: string,
    originalPrice: number,
    lessons: lessonItem[]
}

export interface dataCourse {
    subId: string,
    title: string,
    thumbnail: File,
    createdBy: string,
    typeCourse: string,
    isPublish: boolean,
    description: string,
    originalPrice: number
}
export interface UpdatePayload {
    id: string,
    data: {
        subId: string,
        title: string,
        thumbnail: File,
        createdBy: string,
        typeCourse: string,
        isPublish: boolean,
        description: string,
        originalPrice: number
    }
}
export interface CourseState {
    items: CourseItem[];
    searchResult: SearchResponse;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    currentItem: CourseDetailItem | null;
}

export interface SearchResponse {
    status: number;
    message: string;
    data: CourseItem[];
}

const initialState: CourseState = {
    items: [],
    searchResult: {
        status: 0,
        message: '',
        data: []
    },
    status: 'idle',
    error: null ,
    currentPage: 1,
    totalItems: 0,
    itemsPerPage: 2,
    currentItem: null
};

export const createCourse = createAsyncThunk(
    'course/create',
    async (data: dataCourse, thunkAPI) => {
        console.log("file image", data.thumbnail);

        const formData = new FormData();
        formData.append('subId', data.subId);
        formData.append('title', data.title);
        formData.append('thumbnail', data.thumbnail);
        formData.append('createdBy', data.createdBy);
        formData.append('typeCourse', data.typeCourse);
        formData.append('isPublish', data.isPublish ? 'true' : 'false');
        formData.append('description', data.description);
        formData.append('originalPrice', data.originalPrice.toString());

        try {
            const response = await http.post(`/admin/course/create`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.message || 'Something went wrong!');
        }
    }
);

export const updateCourse = createAsyncThunk(
    'course/update',
    async ({ id, data: dataUpdate }: UpdatePayload, thunkAPI) => {

        const formData = new FormData();
        formData.append('subId', dataUpdate.subId);
        formData.append('title', dataUpdate.title);
        formData.append('thumbnail', dataUpdate.thumbnail);
        formData.append('createdBy', dataUpdate.createdBy);
        formData.append('typeCourse', dataUpdate.typeCourse);
        formData.append('isPublish', dataUpdate.isPublish ? 'true' : 'false');
        formData.append('description', dataUpdate.description);
        formData.append('originalPrice', dataUpdate.originalPrice.toString());

        try {
            const response = await http.put(`/admin/course/update/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.message || 'Something went wrong!');
        }
    }
);

export const deleteCourse = createAsyncThunk<string, string>(
    'course/delete',
    async (id: string) => {
        await http.delete(`/admin/course/delete/${id}`);
        return id;
    }
);

export const fetchAllCourse = createAsyncThunk(
    'course/fetchAll',
    async () => {
        const response = await http.get('/api/course/all');
        console.log("allcourse", response);
        return response.data.data;
    }
);

export const fetchCoursePaginated = createAsyncThunk(
    'course/fetchPaginated',
    async (params: { page: number, size: number }) => {
        const response = await http.get(`/api/course`, { params });
        return response.data;
    }
);

export const searchCourse = createAsyncThunk(
    'course/search',
    async (searchItem: string) => {
        const response = await http.get(`/api/course/search?search=${encodeURIComponent(searchItem)}`);
        return response.data;
    }
);

export const fetchCourseDetail = createAsyncThunk(
    'course/fetchDetail',
    async (id: number) => {
        const response = await http.get(`/api/course/${id}`);
        return response.data;
    }
)

const CourseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Create baiIoT
        builder.addCase(createCourse.fulfilled, (state, action) => {
            if (!Array.isArray(state.items)) {
                state.items = [];
            }
            state.items.push(action.payload);
            history.push("/admin");
        });

        builder.addCase(createCourse.rejected, (state, action) => {
            state.error = action.error.message || 'Unknown error';
            history.push("/admin");
        });

        // Update baiIoT
        builder.addCase(updateCourse.fulfilled, (state, action) => {
            const index = state.items.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        });
        builder.addCase(updateCourse.rejected, (state, action) => {
            if (action.error.message) {
                state.error = action.error.message;
            } else {
                state.error = 'Unknown error';
            }
        });

        // Delete baiIoT
        builder.addCase(deleteCourse.fulfilled, (state, action) => {
            state.items = state.items.filter(item => item.id !== parseInt(action.payload));
        })
        builder.addCase(deleteCourse.rejected, (state, action) => {
            state.error = action.error.message || 'Unknown error';
        });

        // Fetch course
        builder.addCase(fetchCoursePaginated.fulfilled, (state, action) => {
            state.items = action.payload.data;
            state.totalItems = action.payload.total;
        });

        //Fetch all baiIoT
        builder.addCase(fetchAllCourse.fulfilled, (state, action) => {
            state.items = action.payload;
        });

        // search baiIoT
        builder.addCase(searchCourse.fulfilled, (state, action) => {
            state.searchResult = action.payload;
        })

        builder.addCase(fetchCourseDetail.fulfilled, (state, action) => {
            state.status = action.payload.status;
            state.currentItem = action.payload.data;
        })

    }
})

export default CourseSlice.reducer;

import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { http } from "../../util/config";

export interface Lesson {
    id: number;
    titleLesson: string;
    urlVideo: string;
    isCompleted: boolean;
    createdAt: string;
    updatedAt: string | null;
}

export interface LessonListState {
    lessons: Lesson[] | null;
    loading: boolean;
    error: string | null;
}

const initialListState: LessonListState = {
    lessons: null,
    loading: false,
    error: null
};

export const fetchAllLesson = createAsyncThunk(
    'lesson/fetchAllLesson',
    async () => {
        const response = await http.get('/api/lesson/all');
        return response.data.data;
    }
);

export const getAllLessonOfCourse = createAsyncThunk(
    'lesson/getAllLessonOfCourse',
    async (courseId: number, thunkAPI) => {
        try {
            const response = await http.get(`/api/lesson/all/${courseId}`);
            return response.data.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
);

export const addLessonToCourse = createAsyncThunk(
    'lesson/addLessonToCourse',
    async (data: { title: string; courseId: number; file: File }, thunkAPI) => {
        const formData = new FormData();
        formData.append('file', data.file);
        formData.append('title', data.title);
        formData.append('courseId', String(data.courseId));

        try {
            const response = await http.post('/admin/lesson/create', formData);
            return response.data; // Giả sử phản hồi chứa bài học mới
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.message || 'Something went wrong!');
        }
    }
);

export const updateLesson = createAsyncThunk(
    'lesson/updateLesson',
    async (payload: { file?: File; title: string; lessonId: number; courseId: number }, thunkAPI) => {
        const formData = new FormData();
        if (payload.file) {
            formData.append('file', payload.file);
        }
        formData.append('title', payload.title);
        formData.append('lessonId', payload.lessonId.toString());
        formData.append('courseId', payload.courseId.toString());

        try {
            const response = await http.put(`/admin/lesson/update/${payload.lessonId}/${payload.courseId}`, formData);
            return response.data; // Giả sử phản hồi chứa bài học đã cập nhật
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.message || 'Something went wrong!');
        }
    }
);

export const deleteLesson = createAsyncThunk(
    'lesson/deleteLesson',
    async (payload: { lessonId: number }, thunkAPI) => {
        try {
            await http.delete(`/admin/lesson/delete/${payload.lessonId}`);
            return { lessonId: payload.lessonId }; // Trả về ID của bài học đã xóa
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.message || 'Something went wrong!');
        }
    }
);

const LessonSlice = createSlice({
    name: 'lesson',
    initialState: initialListState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch all lessons
            .addCase(fetchAllLesson.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllLesson.fulfilled, (state, action: PayloadAction<Lesson[]>) => {
                state.loading = false;
                state.lessons = action.payload;
            })
            .addCase(fetchAllLesson.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get all lessons of a specific course
            .addCase(getAllLessonOfCourse.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllLessonOfCourse.fulfilled, (state, action) => {
                state.loading = false;
                state.lessons = action.payload;
            })
            .addCase(getAllLessonOfCourse.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Add lesson to course
            .addCase(addLessonToCourse.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addLessonToCourse.fulfilled, (state, action: PayloadAction<Lesson>) => {
                state.loading = false;
                if (state.lessons) {
                    state.lessons.push(action.payload); // Thêm bài học mới vào danh sách
                }
            })
            .addCase(addLessonToCourse.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Update lesson
            .addCase(updateLesson.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateLesson.fulfilled, (state, action: PayloadAction<Lesson>) => {
                state.loading = false;
                if (state.lessons) {
                    state.lessons = state.lessons.map((lesson) =>
                        lesson.id === action.payload.id ? action.payload : lesson
                    ); // Cập nhật bài học trong danh sách
                }
            })
            .addCase(updateLesson.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Delete lesson
            .addCase(deleteLesson.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteLesson.fulfilled, (state, action: PayloadAction<{ lessonId: number }>) => {
                state.loading = false;
                if (state.lessons) {
                    state.lessons = state.lessons.filter((lesson) => lesson.id !== action.payload.lessonId); // Xóa bài học khỏi danh sách
                }
            })
            .addCase(deleteLesson.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default LessonSlice.reducer;

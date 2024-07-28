import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { ACCESS_TOKEN, USER_LOGIN, history, http, settings } from "../../util/config";


export interface LoginRequestPayload {
    email: string;
    password: string;
}

export interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null | undefined;
    userId: number | null;
    name: string | null;
    email: string | null;
    roles: string[] | null;
    users: User[];
}

export interface LoginResponse {
    token: string;
    userId: number | null;
    name: string | null;
    roles: string[] | null;
    email: string | null;
    message: string;
    status: number;
}

export interface BaseResponse {
    status: number;
    message: string;
    data: any;
}

export interface RejectedValue {
    message: string;
}

export interface ApiResponse {
    status: number;
    message: string;
    data: User;
}

export interface User {
    id: number;
    name: string,
    email: string;
    password: string;
    role: string;
}

export interface newUser {
    name: string,
    email: string;
    password: string;
    role: string;
}

const userLoginData = settings.getStorageJson(USER_LOGIN);

const initialState: AuthState = {
    token: localStorage.getItem('accessToken'),
    isAuthenticated: localStorage.getItem('accessToken') ? true : false,
    loading: false,
    error: "",
    userId: userLoginData && userLoginData.userId ? Number(userLoginData.userId) : null,
    name: userLoginData && userLoginData.name ? userLoginData.name : '',
    email: userLoginData && userLoginData.email ? userLoginData.email : '',
    roles: userLoginData && Array.isArray(userLoginData.roles) ? userLoginData.roles : [], // xử lý role là mảng
    users: []
};

export const loginUser = createAsyncThunk<LoginResponse, LoginRequestPayload, { rejectValue: RejectedValue }>(
    'auth/loginUser',
    async (data: LoginRequestPayload, thunkAPI) => {
        try {
            const response: AxiosResponse<BaseResponse> = await http.post('/auth/login', data);
            console.log("Response from server:", response.data);
            if (response.data.status === 200) {
                return {
                    token: response.data.data.token,
                    userId: response.data.data.id,
                    name: response.data.data.name,
                    roles: response.data.data.roles,
                    email: response.data.data.email,
                    message: response.data.message,
                    status: response.data.status
                };
            } else {
                return thunkAPI.rejectWithValue({ message: response.data.message });
            }
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ message: error.message });
        }
    }
);

export const registerUser = createAsyncThunk<ApiResponse, newUser, { rejectValue: string }>(
    'auth/registerUser',
    async (userData, thunkAPI) => {
        try {
            const response = await http.post('/auth/register', userData);
            console.log(response);
            return {
                status: response.status,
                message: "Success", 
                data: response.data
            };
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const addUser = createAsyncThunk<ApiResponse, User, { rejectValue: string }>(
    'auth/addUser',
    async (userData, thunkAPI) => {
        try {
            const response = await http.post<ApiResponse>('/auth/register', userData);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const editUser = createAsyncThunk<ApiResponse, { userId: number, userData: User }, { rejectValue: string }>(
    'auth/editUser',
    async ({ userId, userData }, thunkAPI) => {
        try {
            const params = new URLSearchParams();
            params.append('username', userData.name);
            params.append('email', userData.email);
            params.append('password', userData.password);
            params.append('role', userData.role);

            const response = await http.put<ApiResponse>(`/auth/${userId}`, params);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const getAllUsers = createAsyncThunk<ApiResponse, void, { rejectValue: string }>(
    'auth/getAllUsers',
    async (_, thunkAPI) => {
        try {
            const response = await http.get<ApiResponse>('/auth');
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const deleteUser = createAsyncThunk<{ userId: number }, number, { rejectValue: string }>(
    'auth/deleteUser',
    async (userId, thunkAPI) => {
        try {
            await http.delete(`/auth/${userId}`);
            return { userId }; // Return an object with userId only
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);


const userReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state: AuthState) => {
            state.token = null;
            state.isAuthenticated = false;
            state.userId = null;
            state.name = null;
            state.email = null;
            state.roles = null;
            localStorage.removeItem('token');
            settings.clearStorage(ACCESS_TOKEN);
            settings.clearStorage(USER_LOGIN);
            window.location.reload();
            history.push("/login");
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.token = action.payload.token;
                state.userId = action.payload.userId;
                state.roles = action.payload.roles;
                state.name = action.payload.name;
                state.email = action.payload.email;
                settings.setStorage(ACCESS_TOKEN, action.payload.token);
                settings.setStorageJson(USER_LOGIN, {
                    token: action.payload.token,
                    userId: action.payload.userId,
                    name: action.payload.name,
                    roles: action.payload.roles,
                    email: action.payload.email,
                });
                history.push("/admin");
            })

            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || action.error.message;
            })

            .addCase(registerUser.fulfilled, (state, action: PayloadAction<ApiResponse>) => {
                if (action.payload.status === 200) {
                    state.users.push(action.payload.data);
                }
            })

            .addCase(addUser.fulfilled, (state, action: PayloadAction<ApiResponse>) => {
                state.users.push(action.payload.data);
            })

            .addCase(editUser.fulfilled, (state, action: PayloadAction<ApiResponse>) => {
                const index = state.users.findIndex(user => user.id === action.payload.data.id);
                if (index !== -1) {
                    state.users[index] = action.payload.data;
                }
                state.loading = false;
            })

            .addCase(getAllUsers.fulfilled, (state, action: PayloadAction<ApiResponse>) => {
                if (Array.isArray(action.payload.data)) {
                    state.users = action.payload.data;
                }
            })

            .addCase(deleteUser.fulfilled, (state, action: PayloadAction<{ userId: number }>) => {
                if (state.users) {
                    // Update the users state by filtering out the user with the given userId
                    state.users = state.users.filter(user => user.id !== action.payload.userId);
                }
            });
            
    },
});

export const { logout } = userReducer.actions;
export default userReducer.reducer;
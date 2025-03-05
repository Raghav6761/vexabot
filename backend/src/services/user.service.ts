import axios, { AxiosError, AxiosInstance } from 'axios';
import { IUser } from '../interfaces/user.interface';
import User from '../models/user.model';
// import { ValidationError } from 'express-validator';

interface ValidationError {
    loc: (string | number)[];
    msg: string;
    type: string;
}

interface HTTPValidationError {
    detail: ValidationError[];
}

export class UserService {
    private api: AxiosInstance;

    constructor(baseURL: string, token?: string) {
        // console.log('token : ', token)
        this.api = axios.create({
            baseURL,
            headers: {
                // 'Content-Type': 'application/json'
                'Accept': 'application/json'
            }
        });

        if (token) {
            this.api.defaults.headers.common['Authorization'] = `Bearer ${token.trim()}`;
        }
    }

    //#region User
    async createUser(userData: Partial<IUser>): Promise<IUser> {
        // const user = new User(userData);
        // return await user.save();

        // const user = new User({
        //     name: userData.username || 'Test User',
        // });

        // return Promise.resolve(user);
        try {
            const response = await this.api.post<any>(`/users`, userData);
            // console.log('response : ', response)
            return response.data;
        } catch (error) {
            console.log('error : ', error)
            throw this.handleError(error as AxiosError<HTTPValidationError>);
        }
    }

    async getAllUsers(): Promise<IUser[]> {
        // return await User.find().sort({ createdAt: -1 });

        // const mockUsers = [
        //     new User({
        //         name: 'User 1',
        //         description: 'Description for org 1',
        //         type: 'Business',
        //         clientKey: 'client-key-1',
        //         secretKey: 'secret-key-1'
        //     }),
        //     new User({
        //         name: 'User 2',
        //         description: 'Description for org 2',
        //         type: 'Enterprise',
        //         clientKey: 'client-key-2',
        //         secretKey: 'secret-key-2'
        //     }),
        //     new User({
        //         name: 'User 3',
        //         description: 'Description for org 3',
        //         type: 'Startup',
        //         clientKey: 'client-key-3',
        //         secretKey: 'secret-key-3'
        //     })
        // ];

        // return Promise.resolve(mockUsers);
        try {
            // console.log('data : ', data);
            // const options = await axios.options('https://dev.vexabot.ai/projects');
            // console.log('OPTIONS response:', options.headers);
            console.log('Request headers:', this.api.defaults.headers);
            const response = await this.api.get<any>(`/users?query=&limit=150`);
            console.log('response : ', response)
            return response.data;
        } catch (error) {
            console.log('error : ', error)
            throw this.handleError(error as AxiosError<HTTPValidationError>);
        }
    }

    async getUserById(id: string): Promise<IUser | null> {
        return await User.findById(id);
    }

    async updateUser(id: string, updateData: Partial<IUser>): Promise<IUser | null> {
        return await User.findByIdAndUpdate(id, updateData, { new: true });
    }

    async deleteUser(id: string): Promise<IUser | null> {
        try {
            console.log('Request headers:', this.api.defaults.headers);
            const response = await this.api.delete<any>(`/users/${id}`);
            console.log('response : ', response)
            return response.data;
        } catch (error) {
            console.log('error : ', error)
            throw this.handleError(error as AxiosError<HTTPValidationError>);
        }
    }

    //#region UserGroups
    async createUserGroup(userData: Partial<IUser>): Promise<IUser> {
        try {
            const response = await this.api.post<any>(`/user-groups`, userData);
            return response.data;
        } catch (error) {
            console.log('error : ', error)
            throw this.handleError(error as AxiosError<HTTPValidationError>);
        }
    }

    async getAllUserGroups(): Promise<IUser[]> {
        try {
            // console.log('data : ', data);
            // const options = await axios.options('https://dev.vexabot.ai/projects');
            // console.log('OPTIONS response:', options.headers);
            console.log('Request headers:', this.api.defaults.headers);
            const response = await this.api.get<any>(`/user-groups`);
            console.log('response : ', response)
            return response.data;
        } catch (error) {
            console.log('error : ', error)
            throw this.handleError(error as AxiosError<HTTPValidationError>);
        }
    }

    async getUserGroupById(id: string): Promise<IUser | null> {
        return await User.findById(id);
    }

    async updateUserGroup(id: string, updateData: Partial<IUser>): Promise<IUser | null> {
        return await User.findByIdAndUpdate(id, updateData, { new: true });
    }

    async deleteUserGroup(id: string): Promise<IUser | null> {
        try {
            console.log('Request headers:', this.api.defaults.headers);
            const response = await this.api.delete<any>(`/user-groups/${id}`);
            console.log('response : ', response)
            return response.data;
        } catch (error) {
            console.log('error : ', error)
            throw this.handleError(error as AxiosError<HTTPValidationError>);
        }
    }

    private handleError(error: AxiosError<HTTPValidationError>): Error {
        console.log('Error response:', error.response?.data);

        if (error.response?.data?.detail) {
            const validationErrors = error.response.data.detail
                .map(err => `${err.loc.join('.')}: ${err.msg}`)
                .join('; ');
            return new Error(validationErrors);
        }
        return error as Error;
    }
}
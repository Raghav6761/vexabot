// types.ts
interface UserSignup {
    email: string;
    username?: string | null;
    password: string;
}

interface UserLogin {
    email: string;
    password: string;
}

interface UserResponse {
    id: string;
    email: string;
    username?: string | null;
}

interface OTPVerify {
    email: string;
    otp: string;
}

interface Token {
    access_token: string;
    token_type: string;
}

interface ForgotPasswordRequest {
    email: string;
}

interface ResetPasswordRequest {
    token: string;
    new_password: string;
}

interface ValidationError {
    loc: (string | number)[];
    msg: string;
    type: string;
}

interface HTTPValidationError {
    detail: ValidationError[];
}

import axios, { AxiosInstance, AxiosError } from 'axios';

class AuthService {
    private api: AxiosInstance;

    constructor(baseURL: string) {
        this.api = axios.create({
            baseURL,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    async signup(data: UserSignup): Promise<UserResponse> {
        try {
            console.log('data : ', data);
            const response = await this.api.post<UserResponse>('/auth/signup', data);
            console.log('response : ', response)
            return response.data;
        } catch (error) {
            console.log('error : ', error)
            throw this.handleError(error as AxiosError<HTTPValidationError>);
        }
    }

    async login(data: UserLogin): Promise<void> {
        try {
            console.log('data in user login : ', data);
            const response = await this.api.post('/auth/login', data);
            console.log('response : ', response.data);
        } catch (error) {
            console.log('in the error : ', error)
            throw this.handleError(error as AxiosError<HTTPValidationError>);
        }
    }

    async verifyOTP(data: OTPVerify): Promise<Token> {
        try {
            const response = await this.api.post<Token>('/auth/verify-otp', data);
            return response.data;
        } catch (error) {
            throw this.handleError(error as AxiosError<HTTPValidationError>);
        }
    }

    async forgotPassword(data: ForgotPasswordRequest): Promise<void> {
        try {
            await this.api.post('/auth/forgot-password', data);
        } catch (error) {
            throw this.handleError(error as AxiosError<HTTPValidationError>);
        }
    }

    async resetPassword(data: ResetPasswordRequest): Promise<void> {
        try {
            await this.api.post('/auth/reset-password', data);
        } catch (error) {
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

// Example usage in Express with TypeScript
import express, { Request, Response, NextFunction, response } from 'express';

const app = express();
const authService = new AuthService('https://dev.vexabot.ai');

app.use(express.json());

app.post('/api/signup', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await authService.signup(req.body);
        res.json(user);
    } catch (error) {
        next(error);
    }
});

// Custom error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(400).json({ error: err.message });
});

export { AuthService, UserSignup, UserLogin, UserResponse, Token, OTPVerify };
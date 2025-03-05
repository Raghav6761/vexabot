import axios, { AxiosError, AxiosInstance } from 'axios';
import { IProject } from '../interfaces/project.interface';
import Project from '../models/project.model';

interface ValidationError {
    loc: (string | number)[];
    msg: string;
    type: string;
}

interface HTTPValidationError {
    detail: ValidationError[];
}

export class ProjectService {
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

    async createProject(projectData: Partial<IProject>, orgId: string): Promise<IProject> {
        // const project = new Project(projectData);
        // return await project.save();

        try {
            const response = await this.api.post<any>(`/organizations/${orgId}/projects`, projectData);
            // console.log('response : ', response)
            return response.data;
        } catch (error) {
            console.log('error : ', error)
            throw this.handleError(error as AxiosError<HTTPValidationError>);
        }
    }

    async getAllProjects(orgId: string): Promise<IProject[]> {
        try {
            // console.log('data : ', data);
            // const options = await axios.options('https://dev.vexabot.ai/projects');
            // console.log('OPTIONS response:', options.headers);
            console.log('Request headers:', this.api.defaults.headers);
            const response = await this.api.get<any>(`/organizations/${orgId}/projects`);
            console.log('response : ', response)
            return response.data;
        } catch (error) {
            console.log('error : ', error)
            throw this.handleError(error as AxiosError<HTTPValidationError>);
        }
    }

    async getProjectById(id: string): Promise<IProject | null> {
        // return await Project.findById(id);
        try {
            const response = await this.api.get<any>(`/projects/${id}/`);
            return response.data;
        } catch (error) {
            console.log('error : ', error)
            throw this.handleError(error as AxiosError<HTTPValidationError>);
        }
    }

    async updateProject(id: string, updateData: Partial<IProject>): Promise<IProject | null> {
        // return await Project.findByIdAndUpdate(id, updateData, { new: true });
        try {
            const response = await this.api.put<any>(`/projects/${id}/`, updateData);
            return response.data;
        } catch (error) {
            console.log('error : ', error)
            throw this.handleError(error as AxiosError<HTTPValidationError>);
        }
    }

    async deleteProject(oId: string, pId:string): Promise<IProject | null> {
        // return await Project.findByIdAndDelete(id);
        try {
            const response = await this.api.delete<any>(`/organizations/${oId}/projects/${pId}`);
            return response.data;
        } catch (error) {
            console.log('error : ', error)
            throw this.handleError(error as AxiosError<HTTPValidationError>);
        }
    }

    async addUsersToProject(id: string): Promise<IProject | null> {
        // return await Project.findByIdAndDelete(id);
        try {
            const response = await this.api.delete<any>(`/projects/${id}`);
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
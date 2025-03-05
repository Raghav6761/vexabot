import axios, { AxiosError, AxiosInstance } from 'axios';
import { IOrganization } from '../interfaces/organization.interface';
import Organization from '../models/organization.model';
import { IProject } from '@/interfaces/project.interface';

interface ValidationError {
    loc: (string | number)[];
    msg: string;
    type: string;
}

interface HTTPValidationError {
    detail: ValidationError[];
}

export class OrganizationService {
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

    async createOrganization(organizationData: Partial<IOrganization>): Promise<IOrganization> {
        // const organization = new Organization(organizationData);
        // return await organization.save();

        try {
            // console.log('data : ', data);
            // const options = await axios.options('https://dev.vexabot.ai/organizations');
            // console.log('OPTIONS response:', options.headers);
            // console.log('Request headers:', this.api.defaults.headers);
            const response = await this.api.post<any>('/organizations', organizationData);
            // console.log('response : ', response)
            return response.data;
        } catch (error) {
            console.log('error : ', error)
            throw this.handleError(error as AxiosError<HTTPValidationError>);
        }
    }

    async getAllOrganizations(): Promise<IOrganization[]> {
        try {
            // console.log('data : ', data);
            // const options = await axios.options('https://dev.vexabot.ai/organizations');
            // console.log('OPTIONS response:', options.headers);
            console.log('Request headers:', this.api.defaults.headers);
            const response = await this.api.get<any>('/organizations');
            // console.log('response : ', response)
            return response.data;
        } catch (error) {
            console.log('error : ', error)
            throw this.handleError(error as AxiosError<HTTPValidationError>);
        }
    }

    async getOrganizationById(id: string): Promise<IOrganization | null> {
        // return await Organization.findById(id);
        try {
            const response = await this.api.get<any>(`/organizations/${id}`);
            return response.data;
        } catch (error) {
            console.log('error : ', error)
            throw this.handleError(error as AxiosError<HTTPValidationError>);
        }
    }

    async updateOrganization(id: string, updateData: Partial<IOrganization>): Promise<IOrganization | null> {
        // return await Organization.findByIdAndUpdate(id, updateData, { new: true });
        try {
            const response = await this.api.put<any>(`/organizations/${id}`, updateData);
            return response.data;
        } catch (error) {
            console.log('error : ', error)
            throw this.handleError(error as AxiosError<HTTPValidationError>);
        }
    }

    async deleteOrganization(id: string): Promise<IOrganization | null> {
        // return await Organization.findByIdAndDelete(id);
        try {
            const response = await this.api.delete<any>(`/organizations/${id}`);
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

    // async getAllProjects(orgId: string): Promise<IProject[]> {
    //     try {
    //         // console.log('data : ', data);
    //         // const options = await axios.options('https://dev.vexabot.ai/projects');
    //         // console.log('OPTIONS response:', options.headers);
    //         console.log('Request headers:', this.api.defaults.headers);
    //         const response = await this.api.get<any>(`/organizations/${orgId}/projects`
    //             // , {
    //             //     headers: {
    //             //         'Authorization': this.api.defaults.headers.common['Authorization'],
    //             //         // 'Content-Type': 'application/json'
    //             //         // 'Authorization': `Bearer ${(this.api.defaults.headers.common['Authorization'] || '').replace('Bearer ', '')}`,
    //             //         'Content-Type': 'application/json',
    //             //         'Accept': 'application/json'
    //             //     }
    //             // }
    //         );
    //         console.log('response : ', response)
    //         return response.data;
    //     } catch (error) {
    //         console.log('error : ', error)
    //         throw this.handleError(error as AxiosError<HTTPValidationError>);
    //     }
    //     // try {
    //     //     // console.log('data : ', data);
    //     //     // const options = await axios.options('https://dev.vexabot.ai/organizations');
    //     //     // console.log('OPTIONS response:', options.headers);
    //     //     console.log('Request headers:', this.api.defaults.headers);
    //     //     const response = await this.api.get<any>('/organizations/'+orgId+'/projects');
    //     //     // const response = await this.api.get<any>('/organizations/'+orgId+'/projects');
    //     //     // console.log('response : ', response)
    //     //     return response.data;
    //     // } catch (error) {
    //     //     console.log('error : ', error)
    //     //     throw this.handleError(error as AxiosError<HTTPValidationError>);
    //     // }
    // }
}
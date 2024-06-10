import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

type IResponse<T, R> = AxiosResponse<T, R> & {
    success: boolean;
    errors?: any;
};

const httpRequest = {
    post: async <T = any, R = AxiosResponse<T>, D = any>(
        url: string,
        data?: D,
        config?: AxiosRequestConfig<D>,
    ): Promise<IResponse<T, R>> => {
        try {
            const response = await axios.post<T, R, D>(url, data, config);
            return {
                success: true,
                ...(response as AxiosResponse<T, R>),
            };
        } catch (e: any) {
            return {
                success: false,
                ...(e.response as AxiosResponse<T, R>),
                errors: e.response.data.errors,
            };
        }
    },
};

export default httpRequest;

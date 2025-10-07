import { axiosInstance } from "./axios";

export const createNode = async (data: {name: string, parentId?: string | null}) => {
    try {
        const response = await axiosInstance.post('/', data);
        return response.data;
    } catch (error) {
        console.error("Create node error:", error);
        throw error;
    }
};


export const getTree = async () => {
    try {
        const response = await axiosInstance.get('/tree');
        return response.data;
    } catch (error) {
        console.error("Get tree error:", error);
        throw error;
    }
};

export const deleteNode = async (id: string) => {
    try {
        const response = await axiosInstance.delete(`/${id}`);
        return response.data;
    } catch (error) {
        console.error("Delete node error:", error);
        throw error;
    }
};
import { get, post, put, del } from "./apiService";

const CATEGORY_ENDPOINT = "/categories";

export const getCategories = async () => {
  return await get(CATEGORY_ENDPOINT);
};

export const createCategory = async (data: any) => {
  return await post(CATEGORY_ENDPOINT, data);
};

export const updateCategory = async (id: string, data: any) => {
  return await put(`${CATEGORY_ENDPOINT}/${id}`, data);
};

export const deleteCategory = async (id: string) => {
  return await del(`${CATEGORY_ENDPOINT}/${id}`);
};

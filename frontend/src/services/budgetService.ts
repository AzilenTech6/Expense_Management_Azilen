import { get, post, put, del } from "./apiService";

const BUDGET_ENDPOINT = "/budget";

export const getBudgets = async () => {
  return await get(BUDGET_ENDPOINT);
};

export const createBudget = async (data: any) => {
  return await post(BUDGET_ENDPOINT, data);
};

export const updateBudget = async (id: string, data: any) => {
  return await put(`${BUDGET_ENDPOINT}/${id}`, data);
};

export const deleteBudget = async (id: string) => {
  return await del(`${BUDGET_ENDPOINT}/${id}`);
};

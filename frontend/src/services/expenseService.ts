import { get, post, put, del } from "./apiService";

const EXPENSE_ENDPOINT = "/expense";

export const getExpenses = async () => {
  return await get(EXPENSE_ENDPOINT);
};

export const createExpense = async (data: any) => {
  return await post(EXPENSE_ENDPOINT, data);
};

export const updateExpense = async (id: string, data: any) => {
  return await put(`${EXPENSE_ENDPOINT}/${id}`, data);
};

export const deleteExpense = async (id: string) => {
  return await del(`${EXPENSE_ENDPOINT}/${id}`);
};

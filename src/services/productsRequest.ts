import { API_URL } from "./index";

export const getProductsAll = async (): Promise<string> => {
  const response = await fetch(`${API_URL}/product`);
  if (!response.ok) throw new Error("no se pudo comunicar con el back");
  return "todo salio bien";
};

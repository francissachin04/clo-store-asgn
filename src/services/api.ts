import type { StoreItem } from "../types";

export class StoreService {
  private static readonly API_URL =
    "https://closet-recruiting-api.azurewebsites.net/api/data";

  static async fetchStoreItems(): Promise<StoreItem[]> {
    try {
      const response = await fetch(this.API_URL);
      if (!response.ok) {
        throw new Error(`Failed to fetch items: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Store API error:", error);
      throw error;
    }
  }
}

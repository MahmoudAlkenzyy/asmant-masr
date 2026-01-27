export interface TraderCategory {
  id: string;
  name: string;
}

export interface TraderCategoriesResponse {
  traderCategories: TraderCategory[];
}

export interface Trader {
  id: string;
  name: string;
  imagePath?: string;
  // Add other fields as needed
}

export interface TraderCategoryDetails {
  id: string;
  name: string;
  traders?: Trader[];
  // Add other fields from the detailed response as needed
}

const API_BASE_URL = "https://cement.northeurope.cloudapp.azure.com:5000/api";
const AUTH_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJDZW1lbnRFZ3lwdCIsImp0aSI6Ijg4NjgyMThiLWNmYzktNGQyYi04N2UwLWFmYWNhMzM0N2FmNiIsImVtYWlsIjoiQ2VtZW50RWd5cHRAY2VtZW50RWd5cHQuY29tIiwidXNlclR5cGUiOiJTdXBlckFkbWluIiwidXVpZCI6IjA0MGU0OTUwLWRiNzgtNDQ5OC1hZWMyLWQ2ZTA4OWU4NDI2MSIsInJvbGVzIjoiU3VwZXJBZG1pbiIsImV4cCI6MTc4NzM4NDUwNiwiaXNzIjoiQ2VtZW50RWd5cHRJc3N1ZXIiLCJhdWQiOiJDZW1lbnRFZ3lwdEFQSVVzZXIifQ.PlCmTYWj0H7hwJy8igitExwCJ3SjtwMx-Lxsqyhj6rQ";

/**
 * Fetch all trader categories
 */
export async function getAllTraderCategories(): Promise<TraderCategory[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/TraderCategory/GetAllTraderCategoryList`, {
      method: "GET",
      headers: {
        accept: "text/plain",
        Authorization: AUTH_TOKEN,
      },
      // Revalidate every 5 minutes
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: Failed to fetch trader categories`);
    }

    const json: TraderCategoriesResponse = await res.json();
    return json.traderCategories || [];
  } catch (error) {
    console.error("Failed to fetch trader categories:", error);
    return [];
  }
}

/**
 * Fetch trader category details by ID
 */
export async function getTraderCategoryById(id: string): Promise<TraderCategoryDetails | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/Trader/GetAllTraderList?Id=${id}`, {
      method: "GET",
      headers: {
        accept: "text/plain",
        Authorization: AUTH_TOKEN,
      },
      // Revalidate every 5 minutes
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: Failed to fetch trader category details`);
    }

    const json: TraderCategoryDetails = await res.json();
    return json;
  } catch (error) {
    console.error("Failed to fetch trader category details:", error);
    return null;
  }
}

"use client";
import { prodactType } from "@/app/page";
import { fetchWithLanguage } from "../fetchWithLanguage";

export interface StoreApiResponse {
  storeDetails: prodactType[];
}
export interface ProductStoreType {
  id: string;
  productName: string;
  productTypeName: string;
  storeImageFilePath: string;
}
export interface ProductTypesApiResponse {
  productTypes: ProductStoreType[];
}

export interface CompanyOption {
  id: string;
  name: string;
}
export interface CompaniesApiResponse {
  companies: CompanyOption[];
}

export interface TradeNameOption {
  id: string;
  name: string;
}
export interface TradeNamesApiResponse {
  tradeNames: TradeNameOption[];
}

export async function getStoreProducts(): Promise<prodactType[]> {
  try {
    const res = await fetchWithLanguage(
      "https://cement.northeurope.cloudapp.azure.com:5000/api/Home/GetHomePageData?ProductId=7e722b96-6e53-4860-39e5-08de155db96d",
      {
        method: "GET",
        headers: {
          accept: "text/plain",
        },
      },
    );

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: Failed to fetch store products`);
    }

    const json: StoreApiResponse = await res.json();
    return json.storeDetails || [];
  } catch (error) {
    console.error("Failed to fetch store products:", error);
    return [];
  }
}

export async function getProductTypes(id?: string): Promise<ProductStoreType[]> {
  try {
    const res = await fetchWithLanguage(
      `https://cement.northeurope.cloudapp.azure.com:5000/api/Store/GetProductTypes?id=${id}`,
      {
        method: "GET",
        headers: {
          accept: "text/plain",
        },
      },
    );

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: Failed to fetch store product`);
    }

    const json: ProductTypesApiResponse = await res.json();
    return json.productTypes || [];
  } catch (error) {
    console.error("Failed to fetch store product:", error);
    return [];
  }
}

export async function getCompanies(productTypeId: string, cityId: string): Promise<CompanyOption[]> {
  try {
    const res = await fetchWithLanguage(
      `https://cement.northeurope.cloudapp.azure.com:5000/api/Store/GetCompanies?ProductTypeId=${productTypeId}&CityId=${cityId}`,
      { method: "GET", headers: { accept: "text/plain" } },
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch companies`);
    const json: CompaniesApiResponse = await res.json();
    return json.companies || [];
  } catch (error) {
    console.error("Failed to fetch companies:", error);
    return [];
  }
}

export async function getTradeNames(companyId: string, productTypeId: string): Promise<TradeNameOption[]> {
  try {
    const res = await fetchWithLanguage(
      `https://cement.northeurope.cloudapp.azure.com:5000/api/Store/GetTradeNames?CompanyId=${companyId}&ProductTypeId=${productTypeId}`,
      { method: "GET", headers: { accept: "text/plain" } },
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch trade names`);
    const json: TradeNamesApiResponse = await res.json();
    return json.tradeNames || [];
  } catch (error) {
    console.error("Failed to fetch trade names:", error);
    return [];
  }
}

// ── Account ───────────────────────────────────────────────────────────────────
export interface AccountMe {
  name: string;
  email: string;
  phoneNumber: string;
  roles: string[];
}

export async function getAccountMe(token: string): Promise<AccountMe | null> {
  try {
    const res = await fetch("https://cement.northeurope.cloudapp.azure.com:5000/api/Account/me", {
      method: "GET",
      headers: {
        accept: "text/plain",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch account`);
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch account:", error);
    return null;
  }
}

// ── Request Deal ──────────────────────────────────────────────────────────────
export interface RequestDealPayload {
  productId: string;
  productTypeId: string;
  cityId: string;
  companyId: string;
  tradeNameId: string;
  customerName: string;
  phone: string;
  shippingAddress: string;
  quantity: number;
  unit: string;
}

export async function requestDeal(payload: RequestDealPayload, token: string): Promise<boolean> {
  try {
    const res = await fetch("https://cement.northeurope.cloudapp.azure.com:5000/api/Store/RequestDeal", {
      method: "POST",
      headers: {
        accept: "text/plain",
        "Content-Type": "application/json-patch+json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to request deal`);
    return true;
  } catch (error) {
    console.error("Failed to request deal:", error);
    return false;
  }
}

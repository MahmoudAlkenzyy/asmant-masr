"use client";
import { useEffect, useState } from "react";
import { Hero } from "../../components/pages/News/Hero";

interface Partner {
  id: string;
  name: string;
  imagePath?: string;
}

interface PartnerResponse {
  partners: Partner[];
}

interface PartnerCategoryResponse {
  categories: { name: string; id: string }[];
}

export default function Page() {
  const [TABS, setTABS] = useState<{ name: string; id: string }[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("319444dc-fb60-4e68-52d7-08de3affd247");

  useEffect(() => {
    async function fetchTabs() {
      try {
        const res = await fetch(
          "https://cement.northeurope.cloudapp.azure.com:5000/api/PartnerCategory/GetAllPartnerCategoryList",
          {
            headers: {
              accept: "text/plain",
            },
          },
        );

        if (!res.ok) throw new Error("Failed to fetch partners");

        const data: PartnerCategoryResponse = await res.json();
        setTABS(data.categories || []);
        console.log({ data: data.categories });
      } catch (error) {
        console.error("Error fetching partners:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTabs();
  }, []);

  useEffect(() => {
    async function fetchPartners() {
      try {
        const res = await fetch(
          `https://cement.northeurope.cloudapp.azure.com:5000/api/Partner/GetAllPartnerList?CategoryId=${activeTab}`,
          {
            headers: {
              accept: "text/plain",
            },
          },
        );

        if (!res.ok) throw new Error("Failed to fetch partners");

        const data: PartnerResponse = await res.json();
        setPartners(data.partners || []);
      } catch (error) {
        console.error("Error fetching partners:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPartners();
  }, [activeTab]);
  return (
    <div className="bg-white">
      <Hero />

      <div className="w-[90%] mx-auto py-12">
        <div dir="rtl" className="flex flex-wrap gap-4 justify-start mb-10">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2 transition
                ${activeTab === tab.id ? " text-[#51E482]  border-b-[#51E482] border-b-2 " : "bg-white "}`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div dir="rtl" className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-8 p-4 py-8 pb-14">
            {partners.length > 0 ? (
              partners.map((partner) => (
                <div key={partner.id} className="rounded-xl overflow-hidden border border-gray-300">
                  <img
                    src={
                      partner.imagePath
                        ? `https://cement.northeurope.cloudapp.azure.com:5000${partner.imagePath}`
                        : "/placeholder.png"
                    }
                    alt={partner.name || "Partner"}
                    className="w-full h-full object-contain "
                  />
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center w-full col-span-full">لا يوجد شركاء متاحين.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

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

export default function Page() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPartners() {
      try {
        const res = await fetch("https://cement.runasp.net/api/Partner/GetAllPartnerList", {
          headers: {
            accept: "text/plain",
          },
        });

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
  }, []);

  return (
    <div className="bg-[#FFFFFF]">
      <Hero />

      {/* Partners Grid */}
      <div className="w-[90%] mx-auto py-12">
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
                    src={partner.imagePath ? `https://cement.runasp.net${partner.imagePath}` : "/placeholder.png"}
                    alt={partner.name || "Partner"}
                    className="w-full h-full object-contain bg-black"
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

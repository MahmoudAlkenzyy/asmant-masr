"use client";
import React, { useEffect, useState } from "react";

interface ProducerTabProps {
  id?: string;
}

export const PartenerTab = ({ id = "" }: ProducerTabProps) => {
  const [producers, setProducers] = useState({ partners: [] });
  console.log(id);

  const getProducers = async () => {
    const res = await fetch(
      `https://cement.northeurope.cloudapp.azure.com:5000/api/Partner/GetAllPartnerList?CategoryId=${id}`,
      {
        cache: "no-store",
      },
    );

    const producers = await res.json();
    setProducers(producers);
  };
  useEffect(() => {
    getProducers();
  }, []);
  return (
    <div className="flex flex-wrap gap-8 p-4 py-8 pb-14">
      {producers?.partners?.length > 0 ? (
        producers.partners.map((pro: any) => (
          <div key={pro.id} className="md:w-[25%] w-[30%] rounded-xl overflow-hidden border border-gray-300">
            <img
              src={pro.imagePath || "/placeholder.png"}
              alt={pro.name || "Producer"}
              className="w-full h-full object-contain bg-black"
            />
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center">No producers found.</p>
      )}
    </div>
  );
};

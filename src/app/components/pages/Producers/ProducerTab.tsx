"use client";
import React, { useEffect, useState } from "react";

interface ProducerTabProps {
  id?: string;
}

export const ProducerTab = ({ id = "" }: ProducerTabProps) => {
  const [producers, setProducers] = useState({ producers: [] });

  const getProducers = async () => {
    const res = await fetch(`https://cement.runasp.net/api/Producer/GetAllProducerList?CategoryId=${id}`, {
      cache: "no-store",
    });

    const producers = await res.json();
    setProducers(producers);
  };
  useEffect(() => {
    getProducers();
  }, []);
  return (
    <div className="flex flex-wrap gap-2 md:gap-8 p-4 py-8 pb-14">
      {producers?.producers?.length > 0 ? (
        producers.producers.map((pro: any) => (
          <div key={pro.id} className="md:w-[25%] w-[45%] rounded-xl overflow-hidden border border-gray-300">
            <img
              src={pro.imagePath ? `https://cement.runasp.net${pro.imagePath}` : "/placeholder.png"}
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

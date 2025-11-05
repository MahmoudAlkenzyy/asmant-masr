"use client";
import React, { useEffect, useState } from "react";
import { StoreCard } from "../Home/StoreCard";

interface StoreTabProps {
  id?: string;
}

export const StoreTab = ({ id = "" }: StoreTabProps) => {
  const [prodact, setProdact] = useState([]);

  const getProdact = async () => {
    const res = await fetch(`https://back.talkstent.com/api/Store/GetProductStoreDetails?ProductId=${id}`, {
      cache: "no-store",
    });

    const prodact = await res.json();
    console.log(prodact.items);

    setProdact(prodact.items);
  };
  useEffect(() => {
    getProdact();
  }, []);
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-8 p-4 py-8 pb-14">
      {prodact?.length > 0 ? (
        prodact.map((pro: any, idx) => <StoreCard idx={idx} isHome={false} cardInfo={pro} />)
      ) : (
        <p className="text-gray-500 text-center">No producers found.</p>
      )}
    </div>
  );
};

"use client";
import React from "react";
import { StoreSlider } from "./StoreSlider";
import { prodactType } from "../../../page";

interface StoreContentProps {
  products: prodactType[];
}

export const StoreContent: React.FC<StoreContentProps> = ({ products }) => {
  if (!products || products.length === 0) {
    return null;
  }

  return <StoreSlider prodacts={products} />;
};

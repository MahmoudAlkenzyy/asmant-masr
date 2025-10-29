import React from "react";
export interface pricesType {
  id: string;
  name: string;
  productId: string;
  productName: string;
  highestPrice: number;
  lowestPrice: number;
  averagePrice: number;
}
export const PricesTable = ({ prices }: { prices: pricesType[] }) => {
  return (
    <div className="bg-secoundry rounded-2xl py-5  h-full   text-center w-[90%] mx-auto">
      <h2 className="text-3xl font-semibold pb-3">أسعار المواد</h2>
      <table className=" w-full border-separate ">
        <thead className="text-xl font-light">
          <th>الصنف</th>
          <th>أعلى سعر</th>
          <th> اقل سعر</th>
          <th> متوسط</th>
        </thead>
        <tbody className="text text-lg">
          {prices.map(({ name, highestPrice, lowestPrice, averagePrice }, idx) => (
            <tr key={idx} className="hover:bg-white">
              <td className="py-2">{name}</td>
              <td className="py-2">{highestPrice}</td>
              <td className="py-2">{lowestPrice}</td>
              <td className="py-2">{averagePrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

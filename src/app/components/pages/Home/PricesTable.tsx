import React from "react";

export const PricesTable = () => {
  return (
    <div className="bg-secoundry rounded-2xl py-5 mb-4  text-center">
      <h2 className="text-3xl font-bold">أسعار المواد</h2>
      <table className=" w-full border-separate border-spacing-y-4">
        <thead className="text-2xl">
          <th>الصنف</th>
          <th>أعلى سعر</th>
          <th> أعلى سعر</th>
          <th> متوسط</th>
        </thead>
        <tbody className="text-xl">
          {[1, 2, 3, 4, 5, 6].map(() => (
            <tr className="my-3">
              <td>بورتلاندى عادي</td>
              <td>4,390 جنية</td>
              <td>3,500 جنية</td>
              <td>3,876 جنية</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

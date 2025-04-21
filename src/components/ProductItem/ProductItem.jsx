import React from "react";
import { Link } from "react-router-dom";
import { currency } from "../../store";

export default function ProductItem({ id, imgUrl, name, price }) {
  return (
    <Link className="text-gray-700 cursor-pointer" to={`/products/${id}`}>
      <div className="overflow-hidden">
        <img
          className="hover:scale-110 transition ease-in-out"
          src={
            imgUrl ||
            "https://www.mobismea.com/upload/iblock/2a0/2f5hleoupzrnz9o3b8elnbv82hxfh4ld/No%20Product%20Image%20Available.png"
          }
          alt=""
        />
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-sm font-medium">
        {currency}
        {price}
      </p>
    </Link>
  );
}

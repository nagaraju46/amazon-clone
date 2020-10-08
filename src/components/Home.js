import React from "react";
import "./Home.css";

import Product from "./Product";

export default function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Wireless/Xiaomi/Redmi_8A_Dual/7499/V176845577_IN_WLME_Redmi_8A_Dual_LandingPage_1500x600._CB406191253_.jpg"
          alt="banner"
        />
        <div className="home__row">
          <Product
            id={3}
            title="Redmi Note 9 Pro (Glacier White, 4GB RAM, 64GB Storage) - Latest 8nm Snapdragon 720G & Gorilla Glass 5 Protection"
            price={30}
            image="https://images-eu.ssl-images-amazon.com/images/I/51c+tXDeZ-L._AC_US160_FMwebp_QL70_.jpg"
            rating={4}
          />
          <Product
            id={4}
            title="Redmi Note 9 Pro Max (Aurora Blue, 6GB RAM, 128GB Storage) - 64MP Quad Camera & Latest 8nm Snapdragon 720G"
            price={29}
            image="https://images-eu.ssl-images-amazon.com/images/I/51HfbNSrA6L._AC_US160_FMwebp_QL70_.jpg"
            rating={1}
          />
        </div>
        <div className="home__row">
          <Product
            id={1}
            title="The lean startup"
            price={29}
            image="https://images-na.ssl-images-amazon.com/images/I/51T-sMqSMiL._SX329_BO1,204,203,200_.jpg"
            rating={2}
          />

          <Product
            id={2}
            title="The Power of Your Subconscious Mind (DELUXE HARDBOUND EDITION)"
            price={29}
            image="https://m.media-amazon.com/images/I/9138VXjBfPL._AC_UY218_.jpg"
            rating={5}
          />
          <Product
            id={5}
            title="Redmi Note 9 Pro Max (Interstellar Black, 6GB RAM, 128GB Storage) - 64MP Quad Camera & Latest 8nm Snapdragon 720G"
            price={29}
            image="https://images-eu.ssl-images-amazon.com/images/I/519jrQgDgHL._AC_US160_FMwebp_QL70_.jpg"
            rating={2}
          />
        </div>
        <div className="home__row">
          <Product
            id={6}
            title="Lenovo Ideapad Slim 3i 10th Gen Intel Core i5 15.6 inch FHD Thin and Light Laptop (8GB/1TB/Windows 10/MS Office/Grey/1.85Kg), 81WE004WIN"
            price={100}
            image="https://m.media-amazon.com/images/I/61Dw5Z8LzJL._AC_UY218_.jpg"
            rating={1}
          />
        </div>
      </div>
    </div>
  );
}

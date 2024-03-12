import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import banner1 from "../assets/img/banner1.jpg";
import banner2 from "../assets/img/banner2.jpg";
import banner3 from "../assets/img/banner3.jpg";
import { ReactComponent as PurchaseSvg } from "../assets/icon/purchase.svg";
import { ReactComponent as ListedSvg } from "../assets/icon/listed.svg";
import { ReactComponent as CreateSvg } from "../assets/icon/create.svg";
import { ReactComponent as AllSvg } from "../assets/icon/all.svg";
import { Autoplay } from "swiper/modules";
import { Icon } from "../component";
import imageOne from "../assets/img/car.gif";
import imageTwo from "../assets/img/header1.png";
import imageThree from "../assets/img/nft1.png";
import { activeItemsType, itemListedsType } from "../types";
import { useQuery } from "@apollo/client";
import {
  GET_ACTIVE_ITEMS,
  GET_TOKENS_BOUGHT,
  GET_TOKENS_LISTED,
} from "../graphql";

const imagesHeader = [banner1, banner2, banner3];
const btns = [
  {
    icon: AllSvg,
    text: "All",
  },
  {
    icon: ListedSvg,
    text: "Listed",
  },
  {
    icon: PurchaseSvg,
    text: "Bought",
  },
  {
    icon: CreateSvg,
    text: "Minted",
  },
];
type cardType = {
  img: string;
  name: string;
  dec: string;
};
const ss: cardType[] = [
  {
    img: imageOne,
    name: "New Reality",
    dec: "Explore the unseen.",
  },
  {
    img: imageTwo,
    name: "Beautiful Muscle",
    dec: "Strength in elegance.",
  },
  {
    img: imageThree,
    name: "Finding Balance",
    dec: "Harmony within chaos",
  },
];

const Test = () => {
  const [state, setState] = useState({
    show: {
      all: false,
      activeItems: false,
      itemBoughts: false,
      itemListeds: false,
    },
  });
  const {
    // loading: activeItemsLoading,
    // error: activeItemsError,
    data: activeItemsData,
  } = useQuery<{
    activeItems: activeItemsType;
  }>(GET_ACTIVE_ITEMS);

  const {
    // loading: itemListedsLoading,
    // error: itemListedsError,
    data: itemListedsData,
  } = useQuery<{
    itemListeds: itemListedsType;
  }>(GET_TOKENS_LISTED);

  const {
    // loading: itemBoughtsLoading,
    // error: itemBoughtsError,
    data: itemBoughtsData,
  } = useQuery<{
    itemListeds: itemListedsType;
  }>(GET_TOKENS_BOUGHT);

  console.log(activeItemsData);
  console.log(itemListedsData);
  console.log(itemBoughtsData);

  return (
    <>
      <div className="bg-orange h-72 relative z-0">
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          loop={false}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: false,
          }}
          modules={[Autoplay]}
          className="w-full h-full"
        >
          {imagesHeader.map((item) => (
            <SwiperSlide key={item}>
              <div
                style={{ backgroundImage: `url(${item})` }}
                className="bg-center bg-no-repeat bg-cover w-full h-full"
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="mx-10 mb-10">
        <div className=" bg-base-200 rounded-3xl -mt-20 relative z-50 p-4">
          <ul className="menu bg-base-200 lg:menu-horizontal rounded-box">
            {btns.map((item) => {
              return (
                <li key={item.text}>
                  <a className={`bg-base-100`}>
                    <Icon Element={item.icon} className="w-6 h-6" />
                    {item.text}
                  </a>
                </li>
              );
            })}

            {/* 
            <li>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Updates
                <span className="badge badge-sm badge-warning">NEW</span>
              </a>
            </li>
            <li>
              <a>
                Stats
                <span className="badge badge-xs badge-info"></span>
              </a>
            </li> */}
          </ul>
          <div className="bg-base-100 rounded-2xl grid grid-cols-4 gap-5 p-6">
            {ss.map((item, i) => (
              <>
                <div
                  // ref={(el) => (cards.current[i] = el as HTMLDivElement)}
                  className={`card  w-72 bg-base-300 shadow-xl`}
                >
                  <figure>
                    <img src={item.img} alt="Shoes" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{item.name}</h2>
                    <p className="text-sm">{item.dec}</p>
                  </div>
                </div>
              </>
            ))}
            {ss.map((item, i) => (
              <>
                <div
                  // ref={(el) => (cards.current[i] = el as HTMLDivElement)}
                  className={`card  w-72 bg-base-300 shadow-xl`}
                >
                  <figure>
                    <img src={item.img} alt="Shoes" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{item.name}</h2>
                    <p className="text-sm">{item.dec}</p>
                  </div>
                </div>
              </>
            ))}
            {ss.map((item, i) => (
              <>
                <div
                  // ref={(el) => (cards.current[i] = el as HTMLDivElement)}
                  className={`card  w-72 bg-base-300 shadow-xl`}
                >
                  <figure>
                    <img src={item.img} alt="Shoes" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{item.name}</h2>
                    <p className="text-sm">{item.dec}</p>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Test;

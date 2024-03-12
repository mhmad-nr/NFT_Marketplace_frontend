import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import header1 from "../assets/img/header1.png";
import header2 from "../assets/img/header2.jpg";
import header3 from "../assets/img/header4.png";
import { Autoplay } from "swiper/modules";
import { ReactComponent as PurchaseSvg } from "../assets/icon/purchase.svg";
import { ReactComponent as ListedSvg } from "../assets/icon/listed.svg";
import { ReactComponent as CreateSvg } from "../assets/icon/create.svg";
import mintNFT from "../assets/img/mintnft.jpg";
import Marketplace from "../assets/img/marketplace.jpg";
import { Icon } from "../component";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const imagesHeader = [header1, header2, header3];

const Home = () => {
  const [state, setState] = useState({
    titleValue: "0",
    myNumber: 0,
  });
  useEffect(() => {
    // animateNumber(0 , 1000 , 2000)
  }, []);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const pices = useRef<any[]>([]);
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  useGSAP(
    (context, contextSafe) => {
      // <-- there it is
      // ---------------------------------------------------------------------

      let tl_1 = gsap.timeline({
        scrollTrigger: {
          trigger: sectionsRef.current[0],
          start: "top center",
          end: "bottom center",
          scrub: false,
        },
      });
      tl_1.from(cardsRef.current, {
        opacity: 0,
        duration: 2,
        ease: "back.out(1.4)",
        transform: "translate3d(0, 3vw, 0)",
      });
      let tl_2 = gsap.timeline({
        scrollTrigger: {
          trigger: sectionsRef.current[1],
          start: "top center",
          end: "bottom center",
          scrub: false,
        },
      });
      tl_2.from(pices.current[0], {
        opacity: 0,
        duration: 2,
        stagger: 0,
        ease: "back.out(1.4)",
        transform: "translate3d(-3vw,0 , 0)",
      });
      tl_2.from(
        pices.current[1],
        {
          opacity: 0,
          duration: 2,
          stagger: 0,
          ease: "back.out(1.4)",
          transform: "translate3d(0, 3vw, 0)",
        },
        0
      );

      let tl_3 = gsap.timeline({
        scrollTrigger: {
          trigger: sectionsRef.current[2],
          start: "top center",
          end: "bottom center",
          scrub: false,
        },
      });
      tl_3.from(pices.current[3], {
        opacity: 0,
        duration: 2,
        stagger: 0,
        ease: "back.out(1.4)",
        transform: "translate3d(3vw,0 , 0)",
      });
      tl_3.from(
        pices.current[2],
        {
          opacity: 0,
          duration: 2,
          stagger: 0,
          ease: "back.out(1.4)",
          transform: "translate3d(0, 3vw, 0)",
        },
        0
      );
      return () => {
        // <-- cleanup (remove listeners here)
      };
    },
    { dependencies: [] }
  );
  // function animateNumber(from: number, to: number, duration: number) {
  //   const startTime = new Date().getTime();
  //   const updateInterval = 10; // Update the number every 10 milliseconds

  //   const update = () => {
  //     const currentTime = new Date().getTime();
  //     const progress = Math.min(1, (currentTime - startTime) / duration);
  //     const value = Math.floor(progress * (to - from) + from);
  //     setState({...state ,myNumber:value})

  //     if (progress < 1) {
  //       requestAnimationFrame(update);
  //     }
  //   };

  //   update();
  // }
  return (
    <div className="overflow-hidden">
      <header className="w-full  relative h-screen bg-base-100">
        <div className="absolute top-0  left-0 z-0">
          <div className="outer">
            <div className="inner-1"></div>
          </div>
          <div className="outer">
            <div className="inner-2"></div>
          </div>
          <div className="outer">
            <div className="inner-3"></div>
          </div>
          <div className="outer">
            <div className="inner-4"></div>
          </div>
        </div>
        <div className="w-full h-full flex justify-evenly items-center relative z-50">
          <div className="w-[500px] h-[500px] rounded-2xl overflow-hidden shadow-2xl bg-shadow">
            <Swiper
              slidesPerView={1}
              spaceBetween={0}
              loop={true}
              autoplay={{
                delay: 2000,
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
                  <img src={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="w-[500px] relative px-10 rounded-2xl py-10 shadow-2xl bg-shadow">
            <h1 className="text-7xl bg-gha uppercase font-bold from-Red via-Purple to-Blue bg-gradient-to-r bg-clip-text text-transparent">
              EtherArt
            </h1>
            <p className="text-sm capitalize text-justify mt-6 text-C14">
              where digital art meets ownership. Explore unique NFTs, mint your
              own creations, and join a vibrant community redefining the art
              market.
            </p>
          </div>
        </div>
      </header>
      <section
        ref={(el) => (sectionsRef.current[0] = el as HTMLDivElement)}
        className="w-full relative z-50 bg-shadow py-20 bg-base-100 "
      >
        <div className="container mx-auto">
          <div className="flex items-center justify-evenly mx-auto max-w-[1000px] py-2">
            <div
              ref={(el) => (cardsRef.current[0] = el as HTMLDivElement)}
              className="w-32 bg-base-100 bg-opacity-30 rounded-2xl border flex flex-col items-center py-6"
            >
              <Icon Element={ListedSvg} />
              <span className="text-lg my-1 text-base-content font-semibold uppercase">
                Listed
              </span>
              <span>{state.myNumber}</span>
            </div>
            <div
              ref={(el) => (cardsRef.current[1] = el as HTMLDivElement)}
              className="w-32 bg-base-100 bg-opacity-30 rounded-2xl border flex flex-col items-center py-6"
            >
              <Icon Element={PurchaseSvg} />
              <span className="text-lg my-1 text-base-content font-semibold uppercase">
                Bought
              </span>
              <span>85</span>
            </div>
            <div
              ref={(el) => (cardsRef.current[2] = el as HTMLDivElement)}
              className="w-32 bg-base-100 bg-opacity-30 rounded-2xl border flex flex-col items-center py-6"
            >
              <Icon Element={CreateSvg} />
              <span className="text-lg my-1 text-base-content font-semibold uppercase">
                Minted
              </span>
              <span>85</span>
            </div>
          </div>
        </div>
      </section>
      <section
        ref={(el) => (sectionsRef.current[1] = el as HTMLDivElement)}
        className="w-full h-screen flex items-center relative z-50"
      >
        <div className="max-w-[1000px] mx-auto flex items-center gap-x-8 relative z-50">
          {/* // from={{ opacity: 0, transform: "translate3d(-5vw, 0, 0)" }} */}
          <img
            ref={(el) => {
              pices.current[0] = el;
            }}
            className="w-[500px] h-[400px] rounded-3xl"
            src={mintNFT}
          />
          <div
            ref={(el) => {
              pices.current[1] = el;
            }}
          >
            {/* <Tween from={{ opacity: 0 }} duration={2}> */}
            <h2 className="text-4xl font-semibold text-base-content">
              Create Your Digital Masterpiece
            </h2>
            <p className="text-justify mt-8">
              Unleash your creativity and mint your own NFTs with ease. Our
              platform empowers artists of all levels to transform their digital
              artwork into valuable digital assets. Whether you're a seasoned
              digital artist or exploring your creative talents for the first
              time, our intuitive tools and seamless process make minting NFTs a
              breeze. Join our community and showcase your unique vision to the
              world.
            </p>
            <div className="w-full flex justify-center my-6">
              <Link className="btn" to={"/mintinfo"}>
                Start Minting
              </Link>
            </div>
            {/* </Tween> */}
          </div>
        </div>
      </section>
      <section
        ref={(el) => (sectionsRef.current[2] = el as HTMLDivElement)}
        className="w-full h-screen flex items-center relative z-50"
      >
        <div className="max-w-[1000px] mx-auto flex items-center gap-x-8 relative z-50">
          <div
            ref={(el) => {
              pices.current[2] = el;
            }}
          >
            <h2 className="text-4xl font-semibold text-base-content">
              Discover Unique Digital Art
            </h2>
            <p className="text-justify mt-8">
              Step into a world of creativity and innovation with our vibrant
              NFT marketplace. Explore a curated collection of unique digital
              artworks from talented artists around the globe. From mesmerizing
              digital paintings to dynamic animations, our marketplace offers
              something for every art enthusiast. Dive in and discover your next
              digital masterpiece.
            </p>
            <div className="w-full flex justify-center my-6">
              <Link className="btn" to={"/marketplace"}>
                Explore Artwork
              </Link>
            </div>
          </div>
          <img
            ref={(el) => {
              pices.current[3] = el;
            }}
            className="w-[500px] h-[400px] rounded-3xl"
            src={Marketplace}
          />
        </div>
      </section>
      <div className="relative z-50"></div>
    </div>
  );
};

export default Home;

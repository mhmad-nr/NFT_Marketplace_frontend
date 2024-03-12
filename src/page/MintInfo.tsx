import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as ScrollDownSvg } from "../assets/icon/scroll-down.svg";
import { Icon } from "../component";
import gsap from "gsap";
import imageOne from "../assets/img/car.gif";
import imageTwo from "../assets/img/header1.png";
import imageThree from "../assets/img/nft1.png";
import imageFour from "../assets/img/mfers.jpg";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
// import * as SDA from "gsap/all";
// console.log(ScrollSmoother);

// import _ScrollSmoother from "gsap/ScrollSmoother";
gsap.registerPlugin(ScrollTrigger);
// gsap.registerPlugin(ScrollTrigger, _ScrollSmoother);

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
const MintInfo = () => {
  const [state, setState] = useState({
    titleValue: "0",
    myNumber: 0,
  });
  const container = useRef<HTMLDivElement>(null);
  const cards = useRef<HTMLDivElement[]>([]);
  const empthyCard = useRef<any[]>([]);
  const titles = useRef<any[]>([]);
  const sections = useRef<HTMLDivElement[]>([]);
  // const imgRef = useRef<HTMLImageElement>(null);
  // const priceRef = useRef<HTMLParagraphElement>(null);
  // const nameRef = useRef<HTMLParagraphElement>(null);
  const lenisRef = useRef<any>();

  // useEffect(() => {
  //   function update(time: number) {
  //     console.log(time);
  //     lenisRef.current?.lenis?.raf(time * 1000);
  //     console.log(lenisRef.current);
  //   }

  //   gsap.ticker.add(update);

  //   return () => {
  //     gsap.ticker.remove(update);
  //   };
  // });

  useGSAP(
    (context, contextSafe) => {
      // <-- there it is
      // ---------------------------------------------------------------------

      let tl_1 = gsap.timeline({
        scrollTrigger: {
          trigger: sections.current[0],
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      });
      tl_1.to(cards.current, {
        rotate: "0",
        skew: "0",
        skewX: "0",
        scaleX: "1",
        scaleY: "1",
        rotateY: "0",
        rotateX: "0",
        translateZ: "0",
        translateY: "-50%",
        translateX: "0",
        top: "50%",
        position: "fixed",
        // y: "300",
      });

      tl_1.to(cards.current[2], {
        translateX: "-1000px",
        // y: "300",
      });
      tl_1.to(cards.current[1], {
        translateX: "-800px",
        // y: "300",
      });
      tl_1.to(cards.current[0], {
        translateX: "-600px",
        // y: "300",
      });
      // ---------------------------------------------------------------------

      let tl_2 = gsap.timeline({
        scrollTrigger: {
          trigger: sections.current[1],
          start: "top center",
          end: "center center",
          scrub: true,
        },
      });

      tl_2.to(empthyCard.current[0], {
        left: "0",
        // y: "300",
      });
      // ---------------------------------------------------------------------
      let tl_3 = gsap.timeline({
        scrollTrigger: {
          trigger: sections.current[2],
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      });
      let tl_4 = gsap.timeline({
        scrollTrigger: {
          trigger: sections.current[2],
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      });
      tl_3.from(titles.current[3], {
        translateX: "-50px",
        opacity: "0",
      });
      tl_3.from(titles.current[4], {
        translateX: "-50px",
        opacity: "0",
      });
      tl_3.from(titles.current[5], {
        translateX: "-50px",
        opacity: "0",
      });

      tl_4.to(empthyCard.current[1], {
        scale: "1",
        opacity: "1",
        // y: "300",
      });
      tl_4.to(empthyCard.current[2], {
        opacity: "1",
      });
      tl_4.to(empthyCard.current[3], {
        opacity: "1",
      });

      // ---------------------------------------------------------------------

      let tl_5 = gsap.timeline({
        scrollTrigger: {
          trigger: sections.current[3],
          start: "25% center",
          end: "75% center",
          scrub: true,
        },
      });

      tl_5.to(empthyCard.current[0], {
        // translateX: `-1000px`,
        translateX: `0`,
        top: "50%",
        translateY: `-55%`,
        left: "20vw",
      });
      tl_5.to(cards.current, {
        translateX: "0",
        translateY: "-50%",
        translateZ: "0",
      });
      cards.current.map((_, i) => {
        const index = cards.current.length - i - 1;
        tl_5.to(cards.current[index], {
          translateX: `0`,
          translateY: `-${50 - i * 5}%`,
          left: `${10 - i * 10}vw`,
          // rotateX: "35deg",
          // rotateZ: "20deg",/
          // skewY: "-8deg",
          // left: "+=5rem",
        });
      });

      let tl_6 = gsap.timeline({
        scrollTrigger: {
          trigger: sections.current[3],
          start: "25% center",
          end: "bottom 75%",
          scrub: true,
        },
      });
      tl_6.to(sections.current[4], {
        opacity: "1",
      });
      tl_6.to(sections.current[4], {
        opacity: "1",
        width: "100%",
        height: "100%",
        borderRadius: 0,
        borderColor: "#ffffff00",
      });
      // // transform: rotateX(35deg) rotateZ(20deg) skewY(-8deg);

      // tl.from(imgRef.current, {
      //   position: "absolute",
      //   left: "-800px",
      //   zIndex: 99,
      // });
      // tl.to(".icon", {
      //   position: "absolute",
      //   display: "none",
      //   zIndex: 0,
      // });
      // ✅ safe, created during execution

      // ❌ DANGER! This animation is created in an event handler that executes AFTER the useGSAP() executes, thus it's not added to the context so it won't get cleaned up (reverted). The event listener isn't removed in cleanup function below either, so it persists between component renders (bad).

      // ✅ safe, wrapped in contextSafe() function and we remove the event listener in the cleanup function below. 👍

      return () => {
        // <-- cleanup (remove listeners here)
      };
    },
    { dependencies: [], scope: container }
  );

  return (
    <>
      {/* content */}
      <div className="fixed top-0 left-0 w-full h-full z-50">
        <div className="absolute top-1/2 -translate-y-1/2 left-1/4 -translate-x-1/3 w-[288px] h-[412px]">
          {ss.map((item, i) => (
            <>
              <div
                ref={(el) => (cards.current[i] = el as HTMLDivElement)}
                className={`card rotatee-${
                  i + 1
                } absolute w-72 bg-base-300 shadow-xl`}
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
          <div
            ref={(el) => (empthyCard.current[0] = el as HTMLDivElement)}
            className={`card  absolute left-[-800px] w-72 bg-base-300 shadow-xl`}
          >
            <figure className="relative w-[288px] h-[288px]">
              <img
                className="scale-50 rounded-tr-2xl rounded-tl-2xl opacity-0 absolute top-0 left-0 z-50"
                ref={(el) => (empthyCard.current[1] = el as HTMLDivElement)}
                src={imageFour}
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2
                ref={(el) => (empthyCard.current[2] = el as HTMLDivElement)}
                className="card-title opacity-0"
              >
                Smoky Reflections
              </h2>
              <p
                className="text-sm opacity-0"
                ref={(el) => (empthyCard.current[3] = el as HTMLDivElement)}
              >
                Youthful Contemplation in Smoke
              </p>
            </div>
          </div>
        </div>
        <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center bg-opacity-50 z-50">
          <div
            ref={(el) => (sections.current[4] = el as HTMLDivElement)}
            className="bg-shadow grid place-items-center border rounded-xl opacity-0"
          >
            <Link to={"/createnft"} className="btn btn-wide btn-outline">
              Creat Nft
            </Link>
          </div>
        </div>
      </div>
      <div className="w-[1200px] mx-auto flex justify-end">
        <div className="w-1/2">
          <section className="h-screen flex items-center">
            <div>
              <h2
                ref={(el) => (titles.current[0] = el as HTMLDivElement)}
                className="text-4xl font-semibold text-base-content"
              >
                Transform Your Ideas into NFTs
              </h2>
              <p className="text-justify mt-8">
                Welcome to our NFT creation platform, where your imagination is
                the only limit. Dive into the world of non-fungible tokens and
                bring your digital creations to life. Whether you're an artist,
                a designer, or a storyteller, our platform empowers you to mint
                NFTs that reflect your unique vision. Get started today and join
                the growing community of digital creators.
              </p>
              <div className="w-full flex justify-center my-6">
                <Icon
                  className="w-12 h-12 animate-bounce"
                  Element={ScrollDownSvg}
                />
              </div>
            </div>
          </section>
          <section
            ref={(el) => (sections.current[0] = el as HTMLDivElement)}
            className="h-screen flex items-center"
          >
            <div>
              <h2
                ref={(el) => (titles.current[1] = el as HTMLDivElement)}
                className="text-4xl font-semibold text-base-content"
              >
                Immerse Yourself in Digital Artistry
              </h2>
              <p className="text-justify mt-8">
                Dive into a mesmerizing world of animated NFTs. Explore
                captivating digital artworks that come to life before your eyes.
                From stunning visual effects to dynamic animations, our curated
                collection showcases the limitless possibilities of digital
                creativity. Experience the magic of digital art and let your
                imagination soar.
              </p>
              <div className="w-full flex justify-center my-6">
                <Icon
                  className="w-12 h-12 animate-bounce"
                  Element={ScrollDownSvg}
                />
              </div>
            </div>
          </section>
          <section
            ref={(el) => (sections.current[1] = el as HTMLDivElement)}
            className="h-screen flex items-center"
          >
            <div>
              <h2
                ref={(el) => (titles.current[2] = el as HTMLDivElement)}
                className="text-4xl font-semibold text-base-content"
              >
                Transform Your Ideas into NFTs
              </h2>
              <p className="text-justify mt-8">
                Welcome to our NFT creation platform, where your imagination is
                the only limit. Dive into the world of non-fungible tokens and
                bring your digital creations to life. Whether you're an artist,
                a designer, or a storyteller, our platform empowers you to mint
                NFTs that reflect your unique vision. Get started today and join
                the growing community of digital creators.
              </p>
              <div className="w-full flex justify-center my-6">
                <Icon
                  className="w-12 h-12 animate-bounce"
                  Element={ScrollDownSvg}
                />
              </div>
            </div>
          </section>
          <section
            ref={(el) => (sections.current[2] = el as HTMLDivElement)}
            className="h-screen flex items-center "
          >
            <div className="h-full flex flex-col justify-between">
              <div
                ref={(el) => (titles.current[3] = el as HTMLDivElement)}
                className=" grid gap-y-6"
              >
                <h2 className=" text-4xl font-semibold text-base-conten">
                  Choose or Generate
                </h2>
                <p className="text-sm font-light">
                  Select an image from your device or generate one using AI. Our
                  intuitive interface empowers you to kickstart your NFT journey
                  effortlessly. Let your creativity flow with endless
                  possibilities.
                </p>
              </div>
              <div
                ref={(el) => (titles.current[4] = el as HTMLDivElement)}
                className=" grid gap-y-6"
              >
                <h2 className=" text-4xl font-semibold text-base-conten">
                  Name It
                </h2>
                <p className="text-sm font-light">Give Meaning</p>
              </div>
              <div
                ref={(el) => (titles.current[5] = el as HTMLDivElement)}
                className="grid gap-y-6"
              >
                <h2 className=" text-4xl font-semibold text-base-conten">
                  Describe It
                </h2>
                <p className="text-sm font-light">Add Context and Detail</p>
              </div>
            </div>
          </section>
          <section
            ref={(el) => (sections.current[3] = el as HTMLDivElement)}
            className="h-screen flex items-center"
          ></section>
          <section className="h-40"></section>
        </div>
      </div>
    </>
  );
};

export default MintInfo;

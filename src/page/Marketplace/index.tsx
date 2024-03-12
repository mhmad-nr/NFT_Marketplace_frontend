import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useQuery } from "@apollo/client";
import {
  GET_ACTIVE_ITEMS,
  GET_TOKENS_BOUGHT,
  GET_TOKENS_LISTED,
} from "../../graphql";
import { activeItemsType } from "../../types";
import { Card } from "../../component";

type Props = {};

const Marketplace = () => {
  // const { loading, error, data } = useQuery<{
  //   activeItems: activeItemsType;
  //   itemListeds: any;
  //   itemBoughts: any;
  // }>(GET_ACTIVE_ITEMS);

  // const newData = data?.activeItems.filter(
  //   (item) => item.nftAddress != "0xd948004860ee29416802272ba46b5efb62ac7713"
  // );
  return (
    <>
      <div>
        <p>asasdas</p>
      </div>
      {/* {newData?.map((activeItem) => {
        return <Card.Marketplace {...activeItem} />;
      })} */}
    </>
  );
};

export default Marketplace;

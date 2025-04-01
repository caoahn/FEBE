import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  ThemeProvider
} from "@material-tailwind/react";


const ServiceCard = ({index,service}) => {
  return (
    <Card key={index} className="group mt-10 relative max-w-[18rem] w-[17rem] overflow-hidden border border-solid border-blue-200 h-[40rem]">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-0 z-20 flex items-center justify-center text-center transition-opacity duration-300 group-hover:opacity-100"
        style={{ backgroundImage: `url(${service?.image?.url})` }}
      >
        {/* <Typography
          variant="h5"
          color="white"
          className="font-bold text-lg"
        >
          Xem chi tiết
        </Typography> */}
      </div>
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 rounded-none z-10 relative h-[50%] overflow-hidden"
      >
        <div className="relative w-full h-full">
          <img
            src={service?.image?.url}
            alt="https://cdn.builder.io/api/v1/image/assets/TEMP/00a9f20dcb476ce71b2cfff72425913ffb5a375b9a6f8cec841d4a717b05075c?apiKey=5dd4f9cda63a40ecb7fdb7955805b9bd&"
            className="w-full h-full rounded-md object-cover"
          />
          <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black/60 to-transparent rounded-md"></div>
          <div className="absolute bottom-2 left-5 text-white font-bold text-2xl pr-40">
            {service.name}
          </div>
        </div>
      </CardHeader>
      <CardBody className="z-10 relative p-auto h-[100%]">
        <Typography variant="lead" color="gray" className="mt-3 font-normal">
          {service.description}
        </Typography>
      </CardBody>
    </Card>
  )
}

export default ServiceCard;
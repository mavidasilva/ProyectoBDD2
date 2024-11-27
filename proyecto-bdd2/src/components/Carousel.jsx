import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ImageCarousel = () => {
  return (
    <Carousel
      showArrows={true}
      autoPlay={true}
      infiniteLoop={true}
      showThumbs={false}
      showStatus={false}
      dynamicHeight={true}
    >
      <div>
        <img src="/KFC1.png" alt="Imagen 1" />
      </div>
      <div>
        <img src="/KFC2.jpg" alt="Imagen 2" />
      </div>
      <div>
        <img src="/KFC3.jpg" alt="Imagen 3" />
      </div>
      <div>
        <img src="/KFC4.jpg" alt="Imagen 4" />
      </div>
      <div>
        <img src="/KFC5.jpeg" alt="Imagen 5" />
      </div>
    </Carousel>
  );
};

export default ImageCarousel;

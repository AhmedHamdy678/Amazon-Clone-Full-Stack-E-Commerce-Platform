import homeImage from "../images/home.jpg";
import Product from "./Product";
import productImgOne from "../images/products/1.png";
import productImgTwo from "../images/products/2.png";
import productImgThree from "../images/products/3.png";
import productImgFour from "../images/products/4.png";
import productImgFive from "../images/products/5.png";
import productImgSix from "../images/products/6.png";

export default function Home() {
  const productTitleOne =
    "Razer Kraken Tournament Edition THX 7.1 Surround Sound Gaming Headset: Retractable Noise Cancelling Mic - USB DAC - For PC, PS4, PS5, Nintendo Switch, Xbox One, Xbox Series X & S, Mobile – Black";
  const productTitleTwo =
    "Lenovo - 2021 - IdeaPad 3 - Gaming Laptop - AMD Ryzen 5 5600H - 8GB RAM - 256GB Storage - NVIDIA GeForce GTX 1650-15.6 FHD Display - Windows 11 Home";
  const productTitleThree =
    "Fujitsu ScanSnap iX1600 Wireless or USB High-Speed Cloud Enabled Document, Photo & Receipt Scanner with Large Touchscreen and Auto Document Feeder for Mac or PC, White";
  const productTitleFour =
    "Meta Quest 2 — Advanced All-In-One Virtual Reality Headset — 128 GB";
  const productTitleFive =
    "MeLE PCG02 Fanless Mini PC Stick Windows 11 Pro J4125 8GB/128GB Portable Mini Desktop Computer Stick Business & Home Video Support HDMI 4K 60Hz, BT4.2, 2.4G/5.8G Dual Band Wi-Fi, USB, Ethernet...";
  const productTitleSix =
    "SAMSUNG Galaxy S22 Ultra Cell Phone, Factory Unlocked Android Smartphone, 128GB, 8K Camera & Video, Brightest Display Screen, S Pen, Long Battery Life, Fast 4nm Processor, US Version, Phantom Black";

  return (
    <div className="home">
      <div className="container">
        <img className="home-img img-fluid" src={homeImage} alt="" />

        <div className="content">
          <div className="row m-0">
            <Product
              id="product-1"
              img={productImgOne}
              price={449}
              rating={5}
              title={productTitleOne}
              col="col-sm-6"
            />
            <Product
              id="product-2"
              img={productImgTwo}
              price={668}
              rating={4}
              title={productTitleTwo}
              col="col-sm-6"
            />
          </div>
          <div className="row m-0">
            <Product
              id="product-3"
              img={productImgThree}
              price={449}
              rating={5}
              title={productTitleThree}
              col="col-sm-4"
            />
            <Product
              id="product-4"
              img={productImgFour}
              price={323}
              rating={3}
              title={productTitleFour}
              col="col-sm-4"
            />
            <Product
              id="product-5"
              img={productImgFive}
              price={329}
              rating={5}
              title={productTitleFive}
              col="col-sm-4"
            />
          </div>
          <div className="row m-0">
            <Product
              id="product-6"
              img={productImgSix}
              price={142}
              rating={4}
              title={productTitleSix}
              col="col-sm-12"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

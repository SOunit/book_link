import { FC } from 'react';
import Slider from 'react-slick';
import classes from './image-slider.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

type Props = {};

export const ImageSlider: FC<Props> = () => {
  let settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    cssEase: 'linear',
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  return (
    <Slider {...settings} className={classes['slider']}>
      <div>
        <i className="fas fa-book"></i>
        <h1>Test</h1>
      </div>
      <div>
        <h1>Test</h1>
      </div>
      <div>
        <h1>Test</h1>
      </div>
    </Slider>
  );
};

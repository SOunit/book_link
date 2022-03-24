import { FC } from 'react';
import Slider from 'react-slick';
import classes from './image-slider.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { SliderCard } from '..';

type Props = {};

export const ImageSlider: FC<Props> = () => {
  let settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    cssEase: 'linear',
    arrows: false,
    autoplay: true,
    autoplaySpeed: 6000,
  };

  return (
    <Slider {...settings} className={classes['slider']}>
      <SliderCard
        iconClass="fas fa-book"
        title="Find Books"
        text="What are your friends reading?"
      />
      <SliderCard
        iconClass="fas fa-users"
        title="Find Friends"
        text="Friends with common interests."
      />
      <SliderCard
        iconClass="fal fa-comments-alt"
        title="Chat with Friends"
        text="Message people directly."
      />
    </Slider>
  );
};

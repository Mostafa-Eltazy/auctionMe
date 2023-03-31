import React from 'react';
import Carousel from '../shared-components/Carousel';
import Headline from './Headline';
import OurStory from './UsSection';
import ProcessFlow from './ProcessFlow';

const carousleOptions = { dots: false, infinite: true, speed: 350, autoplaySpeed: 5000, slidesToShow: 1, slidesToScroll: 1, autoplay: true, arrows: false };

const LandingLayout = () => {
  return (
    <div>
      <Headline />
      <ProcessFlow />
      <Carousel classes="bg-blue-100" options={carousleOptions}>
        <p className="text-center font-serif text-3xl p-10 m-10">
          Declutter your home with our online auction site. Bid on a range of items at affordable prices.
          <br /> Downsizing or moving? We have got you covered
        </p>
        <p className="text-center font-serif text-3xl p-10 m-10">
          {' '}
          Furniture, electronics, clothing, and more. Find unique, high-quality items from individuals and businesses.
          <br /> Easy bidding with our user-friendly platform
        </p>
        <p className="text-center font-serif text-3xl p-10 m-10">
          {' '}
          Simplify your life by selling off unwanted items. Connect with like-minded individuals who value minimalism.
          <br /> Join our community and bid on what you need
        </p>
      </Carousel>
      <OurStory />
    </div>
  );
};

export default LandingLayout;

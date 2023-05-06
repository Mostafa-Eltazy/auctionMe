import { useAtom } from 'jotai';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { MdOutlineArrowBack } from 'react-icons/md';
import { sliderAtom, sliderLoadingAtom } from '../../../lib/atoms/slider.atom';

interface Props {
  children?: React.ReactNode;
}

export const useSlidingPanel = () => {
  const [slide, setSlide] = useAtom(sliderAtom);
  const [slideLoading, setSlideLoading] = useAtom(sliderLoadingAtom);

  const toggleSlide = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    setSlide(prevSlide => !prevSlide);
  };

  const closeSlidePanel = () => {
    setSlide(false);
  };

  return { slide, setSlide, slideLoading, toggleSlide, closeSlidePanel };
};

const SlidingPanel = ({ children }: Props) => {

  const { slide, closeSlidePanel } = useSlidingPanel();
  const [enterAnimation, setEnterAnimation] = useState<boolean>(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const closeToggle = useCallback(() => {
    const currentChildElement = document.querySelector('.current-child') as HTMLElement;
    if (currentChildElement) {
      currentChildElement && currentChildElement.classList.add('exit-panel');
      currentChildElement && currentChildElement.addEventListener('animationend', closeSlidePanel);
    }
  }, [closeSlidePanel]);
  
  const handleEntryAnimation = () => {
    const currentChildElement = document.querySelector('.current-child') as HTMLElement;
    currentChildElement && currentChildElement.classList.remove('enter-panel');
    setEnterAnimation(false);
  };

  useEffect(() => {
    if (slide) {
      setEnterAnimation(true);
    }
  }, [slide]);

  useEffect(() => {
    const currentChildElement = document.querySelector('.current-child') as HTMLElement;
    if (enterAnimation) {
      currentChildElement && currentChildElement.classList.add('enter-panel');
      currentChildElement && currentChildElement.addEventListener('animationend', handleEntryAnimation);
    }

    return () => {
      currentChildElement && currentChildElement.removeEventListener('animationend', handleEntryAnimation);
    };
  }, [enterAnimation]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sliderRef.current && !sliderRef.current.contains(event.target as Node)) {
        closeToggle();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [closeToggle]);

  return slide ? (
    <div className={`border absolute right-0 top-0 w-full md:w-1/4 h-full bg-slate-50 rounded px-2 current-child`} ref={sliderRef}>
      <div className="flex items-center border-b pb-2 mt-2 hover:text-sky-600 hover:cursor-pointer" onClick={closeToggle}>
        <MdOutlineArrowBack />
        <span className="ml-2">Back</span>
      </div>
      <div>SlidingPanel</div>
    </div>
  ) : null;
};

export default SlidingPanel;

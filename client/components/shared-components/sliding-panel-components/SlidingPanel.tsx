import { useAtom } from 'jotai';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { MdOutlineArrowBack } from 'react-icons/md';
import { sliderAtom, sliderDisplayComponentAtom, sliderLoaderComponentAtom, sliderLoadingAtom } from '../../../lib/atoms/slider.atom';
import LoadingSpinner from '../LoadingSpinner';

export const useSlidingPanel = (
  externalSlideOpener?: (state: boolean) => void,
  isLoading?: boolean,
  dataLoaderComponent?: React.ReactNode,
  dataComponent?: React.ReactNode,
) => {
  const [slide, setSlide] = useAtom(sliderAtom);
  const [slideLoading, setSlideLoading] = useAtom(sliderLoadingAtom);
  const [displayComponent, setDisaplyComponent] = useAtom(sliderDisplayComponentAtom);
  const [LoaderComponent, setLoaderComponent] = useAtom(sliderLoaderComponentAtom);

  const toggleSlide = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    setSlide(prevSlide => !prevSlide);
  };

  const closeSlidePanel = () => {
    setSlide(false);
  };

  const handleSlidePanel = (e: React.MouseEvent<HTMLButtonElement>) => {
    toggleSlide(e);
    if (externalSlideOpener) {
      externalSlideOpener(!slide);
    }
  };

  useEffect(() => {
    if (typeof isLoading !== 'undefined') {
      setSlideLoading(isLoading);
    }
  }, [isLoading, setSlideLoading]);

  useEffect(() => {
    if (!slide && externalSlideOpener) {
      externalSlideOpener(false);
    }
  }, [slide, externalSlideOpener]);

  useEffect(() => {
    if (!displayComponent) {
      setDisaplyComponent(dataComponent);
    }
  }, [dataComponent, displayComponent, setDisaplyComponent]);

  useEffect(() => {
    if (!LoaderComponent) {
      setLoaderComponent(dataLoaderComponent);
    }
  }, [LoaderComponent, dataLoaderComponent, setLoaderComponent]);

  return {
    slide,
    setSlide,
    slideLoading,
    setSlideLoading,
    displayComponent,
    setDisaplyComponent,
    LoaderComponent,
    setLoaderComponent,
    toggleSlide,
    closeSlidePanel,
    handleSlidePanel,
  };
};

const SlidingPanel = () => {
  const { slide, slideLoading, displayComponent, setDisaplyComponent, LoaderComponent, setLoaderComponent, closeSlidePanel } = useSlidingPanel();
  const [enterAnimation, setEnterAnimation] = useState<boolean>(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const closeToggle = useCallback(() => {
    const currentChildElement = document.querySelector('.panel-body') as HTMLElement;
    if (currentChildElement) {
      currentChildElement && currentChildElement.classList.add('exit-panel');
      currentChildElement && currentChildElement.addEventListener('animationend', closeSlidePanel);
    }
    setDisaplyComponent(null);

  }, [closeSlidePanel, setDisaplyComponent]);

  const handleEntryAnimation = () => {
    const currentChildElement = document.querySelector('.panel-body') as HTMLElement;
    currentChildElement && currentChildElement.classList.remove('enter-panel');
    setEnterAnimation(false);
    currentChildElement && currentChildElement.focus();
  };

  useEffect(() => {
    if (slide) {
      setEnterAnimation(true);
    }
    return () => {
      document.body.style.overflow = '';
      setDisaplyComponent(null);
      setLoaderComponent(null);
    };
  }, [setDisaplyComponent, setLoaderComponent, slide]);

  useEffect(() => {
    const currentChildElement = document.querySelector('.panel-body') as HTMLElement;
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
        setDisaplyComponent(null);
        closeToggle();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      
    };
  }, [closeToggle, setDisaplyComponent]);

  const onMouseEnterHandelr = () => {
    document.body.style.overflow = 'hidden';
  };

  const onMouseExitHandelr = () => {
    document.body.style.overflow = '';
  };

  return slide ? (
    <div
      className="border fixed right-0 top-0 w-full md:w-1/2 h-screen bg-slate-50 rounded px-2 panel-body"
      ref={sliderRef}
      onMouseEnter={onMouseEnterHandelr}
      onMouseLeave={onMouseExitHandelr}
    >
      <div className="flex items-center border-b pb-2 mt-2 hover:text-sky-600 hover:cursor-pointer" onClick={closeToggle}>
        <MdOutlineArrowBack />
        <span className="ml-2">Back</span>
      </div>
      {slideLoading ? (
        LoaderComponent ? (
          LoaderComponent
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <LoadingSpinner style="fill-sky-800" />
          </div>
        )
      ) : (
        displayComponent
      )}
    </div>
  ) : null;
};

export default SlidingPanel;

import { useAtom } from 'jotai';
import { createPortal } from 'react-dom';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { MdOutlineArrowBack } from 'react-icons/md';
import { modalAtom, modalLoadingAtom, modalDisplayComponentAtom, modalLoaderComponentAtom } from '../../../lib/atoms/modal.atom';
import LoadingSpinner from '../LoadingSpinner';

export const useModal = (
  externalSlideOpener?: (state: boolean) => void,
  isLoading?: boolean,
  dataLoaderComponent?: React.ReactNode,
  dataComponent?: React.ReactNode,
) => {
  const [modal, setModal] = useAtom(modalAtom);
  const [modalLoading, setModalLoading] = useAtom(modalLoadingAtom);
  const [displayComponent, setDisaplyComponent] = useAtom(modalDisplayComponentAtom);
  const [LoaderComponent, setLoaderComponent] = useAtom(modalLoaderComponentAtom);

  const toggleModal = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    setModal(prevSlide => !prevSlide);
  };

  const closeModal = () => {
    setModal(false);
  };

  const handleModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    toggleModal(e);
    if (externalSlideOpener) {
      externalSlideOpener(!modal);
    }
  };

  useEffect(() => {
    if (typeof isLoading !== 'undefined') {
      setModalLoading(isLoading);
    }
  }, [isLoading, setModalLoading]);

  useEffect(() => {
    if (!modal && externalSlideOpener) {
      externalSlideOpener(false);
    }
  }, [modal, externalSlideOpener]);

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
    modal,
    setModal,
    modalLoading,
    setModalLoading,
    displayComponent,
    setDisaplyComponent,
    LoaderComponent,
    setLoaderComponent,
    toggleModal,
    closeModal,
    handleModal,
  };
};

const Modal = () => {
  const { modal, modalLoading, displayComponent, setDisaplyComponent, LoaderComponent, setLoaderComponent, closeModal } = useModal();
  const [enterAnimation, setEnterAnimation] = useState<boolean>(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const closeToggle = useCallback(() => {
    const currentChildElement = document.querySelector('.modal-body') as HTMLElement;
    if (currentChildElement) {
      currentChildElement && currentChildElement.classList.add('exit-modal');
      currentChildElement && currentChildElement.addEventListener('animationend', closeModal);
    }
    setDisaplyComponent(null);

  }, [closeModal, setDisaplyComponent]);

  const handleEntryAnimation = () => {
    const currentChildElement = document.querySelector('.modal-body') as HTMLElement;
    currentChildElement && currentChildElement.classList.remove('enter-modal');
    setEnterAnimation(false);
    currentChildElement && currentChildElement.focus();
  };

  useEffect(() => {
    if (modal) {
      setEnterAnimation(true);
    }
    return () => {
      document.body.style.overflow = '';
      setDisaplyComponent(null);
      setLoaderComponent(null);
    };
  }, [setDisaplyComponent, setLoaderComponent, modal]);

  useEffect(() => {
    const currentChildElement = document.querySelector('.modal-body') as HTMLElement;
    if (enterAnimation) {
      currentChildElement && currentChildElement.classList.add('enter-modal');
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

  return modal ? (
    createPortal(<div
      className="border fixed top-1/4 md:left-1/4 w-full w-100 md:w-1/2 h-96 bg-slate-50 rounded px-2 modal-body"
      ref={sliderRef}
      onMouseEnter={onMouseEnterHandelr}
      onMouseLeave={onMouseExitHandelr}
    >
      <div className="flex items-center border-b pb-2 mt-2 hover:text-sky-600 hover:cursor-pointer" onClick={closeToggle}>
        <MdOutlineArrowBack />
        <span className="ml-2">Back</span>
      </div>
      {modalLoading ? (
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
    </div>,document.body)
  ) : null;
};

export default Modal;

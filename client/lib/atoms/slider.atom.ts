import { atom } from 'jotai';

export const sliderAtom = atom<boolean>(false);
export const sliderLoadingAtom = atom<boolean>(true);
export const sliderDisplayComponentAtom = atom<React.ReactNode>(null);
export const sliderLoaderComponentAtom = atom<React.ReactNode>(null);

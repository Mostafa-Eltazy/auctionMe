import { atom } from 'jotai';

export const modalAtom = atom<boolean>(false);
export const modalLoadingAtom = atom<boolean>(true);
export const modalDisplayComponentAtom = atom<React.ReactNode>(null);
export const modalLoaderComponentAtom = atom<React.ReactNode>(null);

import Image from 'next/image';
import { useState } from 'react';

interface Props {
  picturesUrls: string[];
}

const selectedIndexStyle = 'border-blue-600 shadow-lg bg-blue-100';

const ItemsImageDisplayer = ({ picturesUrls }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const updatePictureSelection = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <div className="flex flex-col-reverse md:flex-row mx-2 border border-slate-50 rounded max-h-none md:max-h-80 ">
      <div className="p-2 flex md:block border pb-2 md:pb-0 border-slate-50 bg-white scrollbar-thin scrollbar-thumb-sky-200 scrollbar-rounded">
        {picturesUrls.map((url, index) => (
          <div
            key={index}
            onClick={() => updatePictureSelection(index)}
            className={`${
              selectedIndex === index ? selectedIndexStyle : 'border-slate-300'
            } md:mr-4 border rounded m-2 hover:border-blue-500 hover:cursor-pointer hover:bg-blue-300`}
          >
            <Image src={url} alt="" width={100} height={100} />
          </div>
        ))}
      </div>
      <div className="rounded justify-center flex p-2 bg-blue-50 w-full">
        <Image src={picturesUrls[selectedIndex]} alt="" width={250} height={250} />
      </div>
    </div>
  );
};

export default ItemsImageDisplayer;

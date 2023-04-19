import React from 'react';
import { Category } from '../../lib/interfaces/category.interface';
import { Item } from '../../lib/interfaces/item.interface';
import ItemsImageDisplayer from './ItemsImageDisplayer';

interface Props {
  item?: Item;
  classes?: string;
  category?: Category;
}
const ItemVerticalCard = ({ item, classes, category }: Props) => {
  const hasImages = item && item?.pictures.length > 0;
  return (
    <div className={`${classes} px-4 bg-slate-200 mx-2 rounded`}>
      <div className="md:grid grid-cols-2 py-4">
        {hasImages ? (
          <div className="col-span-1">
            <ItemsImageDisplayer picturesUrls={item?.pictures} />
          </div>
        ) : null}
        <div className={`${hasImages ? 'col-span-1' : 'col-span-2'} border`}>
          <p className="text-2xl text-center md:text-left mb-2">{item?.name}</p>
          <div className={`flex justify-center md:justify-end w-full mb-2  border-b ${hasImages && 'border-sky-50 shadow-md'}`}>
            {category ? <span className="text-sm">{category?.name}</span> : null}
            {item?.categoryId ? <span className="text-sm">{item?.subCategoryId}</span> : null}
          </div>
          <div className="flex md:flex-row mx-2 rounded max-h-64 ">
            <div className="mb-2 p-2 flex md:block pb-2 md:pb-0overflow-x-auto overflow-y-auto scrollbar-thin scrollbar-thumb-sky-50 scrollbar-rounded">
              <p className="text-sm p b-2">{item?.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemVerticalCard;

import React from 'react';
import moment from 'moment';
import { User } from '../lib/interfaces/user.interface';
import { Category } from '../lib/interfaces/category.interface';

const renderPlaceholders = (limit: number, placeholderComponent: React.ReactElement): React.ReactElement[] => {
  return new Array(limit).fill(null).map((comp, i) => {
    return React.cloneElement(placeholderComponent, { key: i });
  });
};

const computeUpdateAt = (updatedAt: string): string => {
  return `${moment(updatedAt).fromNow()}`;
};

const resolveUrlQuery = (query? : string | string[]): string | undefined =>{
  return Array.isArray(query) ? query.join(',') : query
}

const determineCategory = (categoryId: number, categories: Category[] | null): Category | undefined => {

  if(categories){
    const category = categories.find((c)=> c.id === categoryId)
    return category
  }
  return undefined
}

export { renderPlaceholders, computeUpdateAt, resolveUrlQuery, determineCategory };

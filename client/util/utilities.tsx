import React from 'react';
import moment from 'moment';
import { User } from '../lib/interfaces/user.interface';

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

export { renderPlaceholders, computeUpdateAt, resolveUrlQuery };

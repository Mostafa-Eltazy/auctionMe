import React from 'react';
import { GiGreekTemple } from 'react-icons/Gi';

interface Props {
  logoText?: React.ReactNode;
  logoSize?: string
}
const Logo = ({ logoText, logoSize = '30px' }: Props) => {
  return (
    <div className="flex flex-col items-center">
      <p className="bg-transparent text-blue-500">
        <GiGreekTemple style={{ fontSize: logoSize }} />
      </p>
      {logoText ? logoText : null}
    </div>
  );
};

export default Logo;

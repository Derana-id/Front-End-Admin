import React from 'react';
import Image from 'next/image';

export default function index() {
  return (
    <div className="preloader flex-column justify-content-center align-items-center">
      <Image
        className="animation__shake"
        src="/images/Blanja.png"
        alt="Blanja"
        height={100}
        width={70}
      />
    </div>
  );
}

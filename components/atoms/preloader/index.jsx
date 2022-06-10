import React from 'react';
// import Image from 'next/image';

export default function index() {
  return (
    <div className="preloader flex-column justify-content-center align-items-center">
      <img
        className="animation__shake"
        src="dist/img/AdminLTELogo.png"
        alt="AdminLTELogo"
        height="60"
        width="60"
      />
    </div>
  );
}

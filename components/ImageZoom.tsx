// components/ImageZoom.tsx
'use client'
import React, { useState, useRef, MouseEvent } from 'react';
import Image from 'next/image';

interface ImageZoomProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const ImageZoom: React.FC<ImageZoomProps> = ({ src, alt, width, height }) => {
  const [backgroundPosition, setBackgroundPosition] = useState('0% 0%');
  const imgRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = imgRef.current!.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setBackgroundPosition(`${x}% ${y}%`);
  };

  return (
    <div className="image-zoom-container" ref={imgRef} onMouseMove={handleMouseMove}>
      <Image src={src} alt={alt} width={width} height={height} className="image" />
      <div
        className="zoom-square"
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: `${width * 2}px ${height * 2}px`,
          backgroundPosition: backgroundPosition,
        }}
      />
    </div>
  );
};

export default ImageZoom;
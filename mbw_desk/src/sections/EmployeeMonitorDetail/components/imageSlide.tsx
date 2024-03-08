import React from 'react'


interface imageProps {
  src : string|any
}
export default function ImageSlide({src}:imageProps) {
  return (
    <img
      className="h-full w-full rounded-lg !object-contain"
      src={
        src
      }
    />
  )
}

import React from "react";
import Image from "next/image";

type Props = {
  images: File[];
};

const ImagePreview = ({ images }: Props) => {
  return (
    <div>
      <div className="flex flex-row gap-2 my-5 max-w-[400px] h-[7vh] ms-8 me-3">
        {images.map((image) => {
          const src = URL.createObjectURL(image);
          return (
            <div className="flex flex-row relative aspect-video overflow-hidden" key={image.name}>
              <Image src={src} alt={image.name} className="object-cover" fill />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImagePreview;
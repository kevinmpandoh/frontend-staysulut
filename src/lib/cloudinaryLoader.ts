// cloudinaryLoader.ts
const cloudinaryLoader = ({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) => {
  return `https://res.cloudinary.com/dcq397jrp/image/upload/f_auto,q_${
    quality || 75
  },w_${width}/${src}`;
};

export default cloudinaryLoader;

import React from "react";
import ImageGalleryItem from "./ImageGalleryItem";
import styles from "./ImageGallery.module.css";

const ImageGallery = ({ pictures, openModal }) => {
  return (
    <ul className={styles.ImageGallery}>
      {pictures.map((picture) => (
        <ImageGalleryItem
          openModal={openModal}
          key={picture.id}
          picture={picture}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;

import { GalleryItem, Image } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';
import { useState } from 'react';

export const ImageGalleryItem = ({ webformatURL, tags, largeImageURL }) => {
  const [isModalShown, setIsModalShown] = useState(false);
  const toggleModal = () => {
    setIsModalShown(!isModalShown);
  };
  return (
    <GalleryItem>
      <Image src={webformatURL} alt={tags} onClick={toggleModal} />
      {isModalShown && (
        <Modal href={largeImageURL} tags={tags} onClose={toggleModal} />
      )}
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  picture: PropTypes.exact({
    id: PropTypes.number.isRequired,
    pageURL: PropTypes.string,
    type: PropTypes.string,
    tags: PropTypes.string.isRequired,
    previewURL: PropTypes.string,
    previewWidth: PropTypes.number,
    previewHeight: PropTypes.number,
    webformatURL: PropTypes.string.isRequired,
    webformatWidth: PropTypes.number,
    webformatHeight: PropTypes.number,
    largeImageURL: PropTypes.string.isRequired,
    imageWidth: PropTypes.number,
    imageHeight: PropTypes.number,
    imageSize: PropTypes.number,
    views: PropTypes.number,
    downloads: PropTypes.number,
    collections: PropTypes.number,
    likes: PropTypes.number,
    comments: PropTypes.number,
    user_id: PropTypes.number,
    user: PropTypes.string,
    userImageURL: PropTypes.string,
  }),
};

import React, { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Gallery, CommonGalleryDiv } from './ImageGalery.styled';
import { Modal } from '../Modal/Modal';
import { nanoid } from 'nanoid';
import { Button } from 'components/Button/Button';
import { Loader } from '../Loader/Loader';

export class ImageGallery extends Component {
  state = {
    requestedImages: [],
    page: 1,
    isLoading: false,
    showModal: false,
    selectedImage: null,
    hasMoreImages: true,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.request !== this.props.request) {
      this.setState({
        requestedImages: [],
        page: 1,
        isLoading: false,
        showModal: false,
        selectedImage: null,
      });
    }

    if (
      prevProps.request !== this.props.request ||
      prevState.page !== this.state.page
    ) {
      if (!this.state.isLoading) {
        this.setState({ isLoading: true });

        fetch(
          `https://pixabay.com/api/?q=${this.props.request}&page=${this.state.page}&key=35226644-fa012e2a2ab77872d84abde88&image_type=photo&orientation=horizontal&per_page=12`
        )
          .then(res => res.json())
          .then(data =>
            this.setState(prevState => ({
              requestedImages: [...prevState.requestedImages, ...data.hits],
              isLoading: false,
              hasMoreImages: data.hits.length > 0,
            }))
          );
      }
    }
  }

  openModal = image => {
    this.setState({
      showModal: true,
      selectedImage: image,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
    });
  };

  handleLoadMoreButtonClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const {
      requestedImages,
      isLoading,
      showModal,
      selectedImage,
      hasMoreImages,
    } = this.state;
    return (
      <CommonGalleryDiv>
        {showModal && (
          <Modal onClose={this.closeModal}>
            <img src={selectedImage.webformatURL} alt={selectedImage.tags} />
          </Modal>
        )}

        <Gallery>
          {requestedImages.length > 0 ? (
            requestedImages.map(image => (
              <ImageGalleryItem
                key={nanoid()}
                image={image}
                onOpenModal={() => this.openModal(image)}
              />
            ))
          ) : (
            <li>No images to display</li>
          )}
        </Gallery>
        {isLoading && <Loader />}

        {requestedImages.length > 0 && hasMoreImages && (
          <Button onLoadMore={this.handleLoadMoreButtonClick} />
        )}
      </CommonGalleryDiv>
    );
  }
}

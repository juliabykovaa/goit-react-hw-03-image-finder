import React, { Component } from 'react';
import { GalleryItem } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  render() {
    return (
      <GalleryItem onClick={this.props.onOpenModal}>
        <img src={this.props.image.webformatURL} alt={this.props.image.tags} />
      </GalleryItem>
    );
  }
}

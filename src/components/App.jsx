import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    images: [],
    queryRequest: '',
  };

  handleFormSubmit = queryValue => {
    this.setState({ queryRequest: queryValue });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery request={this.state.queryRequest} />
      </>
    );
  }
}

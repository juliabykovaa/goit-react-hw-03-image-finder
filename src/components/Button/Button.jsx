import React, { Component } from 'react';
import { LoadButton } from './Button.styled';

export class Button extends Component {
  render() {
    return (
      <LoadButton type="button" onClick={this.props.onLoadMore}>
        Load More
      </LoadButton>
    );
  }
}

import styled from '@emotion/styled';


export const GalleryItem = styled.li`
  width: 400px;
  height: 200px;
  overflow: hidden;

  img {
    margin: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: 0.3s ease-in-out;

    &:hover {
      transform: scale(1.1);
    }
  }
`;
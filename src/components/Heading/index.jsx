import React from 'react';
import { StyledHeader, StyledHeading } from './Heading.styled';

const Heading = () => {
  return (
    <StyledHeader background="brand">
      <StyledHeading margin="none">EUR-USD Converter</StyledHeading>
    </StyledHeader>
  );
};

export default Heading;

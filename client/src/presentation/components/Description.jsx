import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DescriptionContent = styled.p`
  margin: 0 0.2rem;
  font-size: 1.2rem;
`;

const Description = ({ content }) => {
  return <DescriptionContent>{content}</DescriptionContent>;
};

Description.propTypes = {
  content: PropTypes.string.isRequired,
};

export default Description;

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const descriptionContent = styled.p`
  margin: 0 0.2rem;
`;

const Description = ({ content }) => {
  return <descriptionContent>{content}</descriptionContent>;
};

Description.propTypes = {
  content: PropTypes.string.isRequired,
};

export default Description;

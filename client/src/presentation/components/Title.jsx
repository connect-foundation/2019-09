import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TitleContent = styled.h2`
  margin: 0.5rem 0;
`;

const Title = ({ content }) => {
  return <TitleContent>{content}</TitleContent>;
};

Title.propTypes = {
  content: PropTypes.string.isRequired,
};

export default Title;

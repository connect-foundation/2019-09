import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const LogoImage = styled.img`
  width: 100%;
  height: auto;
`;

const Logo = ({ logoSrc }) => {
  return <LogoImage src={logoSrc} />;
};

Logo.propTypes = {
  logoSrc: PropTypes.string.isRequired,
};

export default Logo;

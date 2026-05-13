import React from 'react';
import styled from 'styled-components';

const StyledLink = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.6); 
  text-decoration: none;
  font-size: 14px;
  margin:0 10px;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover { color: rgba(255, 255, 255, 1); }

  svg { font-size: 0.8em; }

  @media (max-width: 520px) {
    display: block;
    color: #fff;
    background: #3c3c3c52;
    border: 2px solid #000;
    border-radius: 7px;
    padding: 10px;
    text-align: center;
    margin: 0 0 10px 0;
  }
`;


const Link = ({ onClick, children, className }) => (
  <StyledLink className={className} onClick={onClick}>
    {children}
  </StyledLink>
);

export default Link;
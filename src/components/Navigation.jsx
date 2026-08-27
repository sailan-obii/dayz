import { NavLink } from 'react-router-dom';
import styled from 'styled-components';



import React from 'react';
import logoToday from '../assets/img/logo-today.png';
import logoUpcoming from '../assets/img/logo-upcoming.png';

const NavBar = styled.nav`
  display: flex;
  align-items: center; // Centre verticalement les éléments
  justify-content: center; // Centre horizontalement les éléments
  background: #0000004f;
  margin-bottom: 20px;
  padding: 0;
  width: 100%;
`;

const LogoImg = styled.img`
  width: 20px;
  height: 20px;
`;

const LogoTitle = styled.span`
  color: #fff;
  font-size: 15px;
  font-weight: bold;
  padding: 10px;
  margin: 0;

  @media (max-width: 768px) {
    padding:4px;
  }
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 0 40px;
  text-decoration: none;
  opacity: 0.4;

  &:hover {
    opacity: 1;
    background-color:rgba(255, 255, 255, 0.06);
  }
  &.active {
    opacity: 1;
    background-color:rgba(255, 255, 255, 0.14);
  }

   @media (max-width: 768px) {
    
    flex: 1;
    justify-content: center; /* Centre les éléments verticalement */
    align-items: center; /* Centre les éléments horizontalement */
    padding: 10px 0; /* Ajuste le padding pour les mobiles */
  }
`;

function Navigation() {
  return (
    <NavBar>
      <StyledNavLink to="/today-list" end>
        <LogoImg src={logoToday} alt="Today" />
        <LogoTitle>Liste du jour</LogoTitle>
      </StyledNavLink>
      <StyledNavLink to="/upcoming">
        <LogoImg src={logoUpcoming} alt="Upcoming" />
        <LogoTitle>Événements</LogoTitle>
      </StyledNavLink>
    </NavBar>
  );
}

export default Navigation;
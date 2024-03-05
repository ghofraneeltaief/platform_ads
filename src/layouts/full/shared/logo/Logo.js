import { Link } from 'react-router-dom';
import logo from 'src/assets/images/logos/logo-sidebar.png';
import { styled } from '@mui/material';

const LinkStyled = styled(Link)(() => ({
  height: '70px',
  width: '180px',
  overflow: 'hidden',
  display: 'block',
}));

const Logo = () => {
  return (
    <LinkStyled to="/Pioche">
      <img src={logo} alt="Logo" height={80} />
    </LinkStyled>
  )
};

export default Logo;

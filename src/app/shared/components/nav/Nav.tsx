import * as React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import RestoreIcon from '@mui/icons-material/Restore';
import FolderIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { DarkMode, LightMode } from '@mui/icons-material';
import { useThemeContext } from '../../components/Theme/ThemeContext';
import { Box, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupsIcon from '@mui/icons-material/Groups';
import InfoIcon from '@mui/icons-material/Info';

// ✅ IMPORTA TU LOGO
import logo from '../../../../assets/img/LogoMenu/logoOficial.png'; // cambia la ruta si es necesario

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 20,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.25) },
  marginLeft: theme.spacing(3),
  marginRight: theme.spacing(3),
  width: '100%',
  [theme.breakpoints.up('sm')]: { width: 'auto' },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: { width: '40ch' },
  },
}));

export default function TopNavigation() {
  const { mode, toggleTheme } = useThemeContext();
  const navigate = useNavigate();
  const location = useLocation();

  const [busqueda, setBusqueda] = React.useState('');

  // Debounce + navegación
  React.useEffect(() => {
    const q = busqueda.trim();
    if (!q) return;

    const id = setTimeout(() => {
      if (q.length < 2) return;
      const target = `/land/buscar/${encodeURIComponent(q)}`;
      if (location.pathname !== target) navigate(target);
      setBusqueda('');
    }, 600);

    return () => clearTimeout(id);
  }, [busqueda, navigate, location.pathname]);

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: 'background.paper',
          color: 'text.primary',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          boxShadow: (theme) =>
            theme.palette.mode === 'light'
              ? '0 2px 12px rgba(0,0,0,0.08)'
              : '0 2px 12px rgba(0,0,0,0.35)',
        }}
      >
        <Toolbar sx={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 2, alignItems: 'center' }}>
          {/* ✅ IZQUIERDA: LOGO + MARCA */}
          <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 0 }}>
            <Box
              component={Link}
              to="/land"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                textDecoration: 'none',
                gap: 1,
              }}
              aria-label="Ir al inicio"
            >
              <Box
                component="img"
                src={logo}
                alt="Logo"
                sx={{
                  height: { xs: 32, sm: 36, md: 40 }, // responsive
                  width: 'auto',
                  display: 'block',
                  objectFit: 'contain',
                  borderRadius: 1.5,
                }}
              />
              {/* Texto de marca (oculto en xs) */}
              <Typography
                variant="h6"
                noWrap
                sx={{
                  display: { xs: 'none', sm: 'block' },
                  fontWeight: 700,
                  color: 'text.primary',
                  letterSpacing: 0.2,
                }}
              >
                Sencaptur
              </Typography>
            </Box>
          </Box>

          {/* ✅ CENTRO: BUSCADOR */}
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Buscar…"
                inputProps={{ 'aria-label': 'buscar' }}
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </Search>
          </Box>

          {/* ✅ DERECHA: ICONOS + TEMA */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 0.5, sm: 1 },
              '& .MuiSvgIcon-root': {
                color: (theme) =>
                  theme.palette.mode === 'light'
                    ? theme.palette.text.secondary
                    : theme.palette.common.white,
              },
            }}
          >
            <IconButton component={Link} to="/land/equipo" color="inherit" aria-label="Equipo">
              <GroupsIcon />
            </IconButton>
            <IconButton component={Link} to="/login" color="inherit" target="_blank" aria-label="Perfil">
              <AccountCircleIcon />
            </IconButton>
            <IconButton component={Link} to="/land/acerca-de" color="inherit" aria-label="Favoritos">
              <InfoIcon />
            </IconButton>
            <IconButton component={Link} to="/land" color="inherit" aria-label="Inicio">
              <HomeIcon />
            </IconButton>

            <IconButton onClick={toggleTheme} color="inherit" aria-label="Cambiar tema">
              {mode === 'light' ? <DarkMode /> : <LightMode />}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Offset para que el contenido no quede debajo del AppBar */}
      <Toolbar />
    </>
  );
}

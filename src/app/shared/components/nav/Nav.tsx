import * as React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { DarkMode, LightMode } from '@mui/icons-material';
import { useThemeContext } from '../../components/Theme/ThemeContext';
import { Box, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupsIcon from '@mui/icons-material/Groups';
import InfoIcon from '@mui/icons-material/Info';
import logo from '../../../../assets/img/LogoMenu/logoOficial.png';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 30,
  backgroundColor:
    theme.palette.mode === 'light'
      ? alpha(theme.palette.grey[200], 0.9)
      : alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor:
      theme.palette.mode === 'light'
        ? alpha(theme.palette.grey[300], 1)
        : alpha(theme.palette.common.white, 0.25),
  },
  width: '100%',
  maxWidth: 600,
  height: 45,
  transition: 'all 0.3s ease',
  boxShadow:
    theme.palette.mode === 'light'
      ? '0 2px 6px rgba(0,0,0,0.1)'
      : '0 2px 6px rgba(255,255,255,0.1)',
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
  color: theme.palette.mode === 'light' ? theme.palette.text.primary : '#fff',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.5, 1, 1.5, 0),
    paddingLeft: `calc(1em + ${theme.spacing(5)})`,
    fontSize: '1.05rem',
    width: '100%',
  },
}));

export default function TopNavigation() {
  const { mode, toggleTheme } = useThemeContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [busqueda, setBusqueda] = React.useState('');

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
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          {/* 🔹 IZQUIERDA: LOGO + ICONOS */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              component={Link}
              to="/land"
              sx={{
                display: 'flex',
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
                  height: { xs: 60, sm: 70, md: 85 },
                  width: 'auto',
                  objectFit: 'contain',
                  borderRadius: 2,
                }}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography
                  variant="h6"
                  noWrap
                  sx={{
                    fontWeight: 700,
                    color: 'text.primary',
                    letterSpacing: 0.2,
                    lineHeight: 1.1,
                    display: { xs: 'none', sm: 'block' },
                  }}
                >
                  Sencaptur
                </Typography>
                <Typography
                  variant="subtitle2"
                  noWrap
                  sx={{
                    display: { xs: 'none', sm: 'block' },
                    fontWeight: 500,
                    color:
                      mode === 'light'
                        ? 'text.primary'
                        : 'rgba(255,255,255,0.9)',
                    fontSize: '0.95rem',
                    mt: 0.3,
                  }}
                >
                  Capture el sentimiento del momento
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                ml: 1.5,
                '& .MuiSvgIcon-root': {
                  fontSize: 28,
                  color: (theme) =>
                    theme.palette.mode === 'light'
                      ? theme.palette.text.primary
                      : 'rgba(255,255,255,0.9)',
                },
              }}
            >
              <IconButton
                component={Link}
                to="/land/equipo"
                color="inherit"
                aria-label="Equipo"
              >
                <GroupsIcon />
              </IconButton>

              <IconButton
                component={Link}
                to="/land/acerca-de"
                color="inherit"
                aria-label="Acerca de nosotros"
              >
                <InfoIcon />
              </IconButton>
            </Box>
          </Box>

          {/* 🔹 CENTRO: BUSCADOR */}
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              justifyContent: 'center',
              mx: 2,
            }}
          >
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

          {/* 🔹 DERECHA: PERFIL / MODO */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 0.8, sm: 1.2 },
              '& .MuiSvgIcon-root': {
                color: (theme) =>
                  theme.palette.mode === 'light'
                    ? theme.palette.text.primary
                    : theme.palette.common.white,
              },
            }}
          >
            <IconButton
              component={Link}
              to="/login"
              color="inherit"
              aria-label="Perfil"
            >
              <AccountCircleIcon />
            </IconButton>

            <IconButton
              onClick={toggleTheme}
              color="inherit"
              aria-label="Cambiar tema"
            >
              {mode === 'light' ? <DarkMode /> : <LightMode />}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Toolbar />
    </>
  );
}

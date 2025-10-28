// src/pages/AcercaDeNosotros.tsx
import * as React from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function AcercaDeNosotros() {
  const theme = useTheme();

  React.useEffect(() => {
    const prev = document.title;
    document.title = "Acerca de nosotros | Sencaptur";
    return () => {
      document.title = prev;
    };
  }, []);

  const textColor =
    theme.palette.mode === "light" ? "text.primary" : "text.secondary";

  return (
    <Box
      component="main"
      sx={{
        pt: { xs: 8, md: 10 },
        pb: { xs: 6, md: 8 },
        background:
          theme.palette.mode === "light"
            ? "linear-gradient(180deg, #ffffff 0%, #f7f9fc 100%)"
            : "linear-gradient(180deg, #0b0f14 0%, #0f141a 100%)",
      }}
    >
      <Container maxWidth="lg">
        {/* Hero */}
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <Typography
            variant="overline"
            sx={{ color: "text.primary", letterSpacing: 2, opacity: 0.8 }}
          >
            Acerca de nosotros
          </Typography>
          <Typography
            variant="h3"
            component="h1"
            sx={{ color: "text.primary", fontWeight: 800, mt: 1, mb: 2 }}
          >
            Sencaptur
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: textColor,
              maxInlineSize: 960,
              mx: "auto",
            }}
          >
            Plataforma digital que utiliza el video para capturar y compartir
            experiencias turísticas y culturales significativas en Capitanejo y
            sus alrededores, complementada con informes técnicos que impulsan el
            desarrollo del sector.
          </Typography>
        </Box>

        {/* Introducción */}
        <Card
          elevation={0}
          sx={{
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
            mb: 4,
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Typography
              variant="h5"
              sx={{ color: "text.primary", fontWeight: 700, mb: 1.5 }}
            >
              Introducción
            </Typography>
            <Typography variant="body2" sx={{ color: textColor }}>
              Sencaptur es una plataforma digital que utiliza el formato de
              vídeo como medio principal para capturar y compartir experiencias
              turísticas y culturales significativas en Capitanejo y sus
              alrededores. Además, ofrece informes técnicos complementarios que
              proporcionan información detallada y análisis sobre el sector
              turístico.
            </Typography>
          </CardContent>
        </Card>

        {/* Misión */}
        <Card
          elevation={0}
          sx={{
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
            mb: 3,
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, mb: 1.5, color: "text.primary" }}
            >
              Misión
            </Typography>
            <Typography variant="body2" sx={{ color: textColor }}>
              Nuestra misión es proporcionar una plataforma para capturar,
              compartir y descubrir contenido turístico y cultural emocionalmente
              relevante a través de vídeos, y complementar esta experiencia con
              informes técnicos que contribuyan al desarrollo y promoción del
              turismo en la región.
            </Typography>
          </CardContent>
        </Card>

        {/* Visión */}
        <Card
          elevation={0}
          sx={{
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, mb: 1.5, color: "text.primary" }}
            >
              Visión
            </Typography>
            <Typography variant="body2" sx={{ color: textColor }}>
              Nuestra visión es ser una plataforma líder en la promoción de
              experiencias turísticas y culturales auténticas a través de
              contenido audiovisual de alta calidad, y en la gestión y difusión
              de información turística relevante y técnica, contribuyendo así al
              crecimiento y desarrollo sostenible del turismo en Capitanejo y
              sus alrededores.
            </Typography>
          </CardContent>
        </Card>

        {/* CTA */}
        <Box sx={{ mt: 5 }}>
          <Divider />
          <Typography
            variant="body2"
            sx={{
              color: textColor,
              textAlign: "center",
              mt: 3,
            }}
          >
            ¿Quieres saber más o colaborar con Sencaptur? Ponte en contacto con
            nosotros desde la sección de contacto.
          </Typography>
        </Box>

        {/* Instituciones colaboradoras */}
        <Card
          elevation={0}
          sx={{
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
            mt: 5,
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 4 }, textAlign: "center" }}>
            {/* 🔹 Fila de logos */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 4,
                flexWrap: "wrap",
                mb: 2,
              }}
            >
              <Box
                component="img"
                src="/coldini_escudo.png"
                alt="Logo institucion 1"
                sx={{
                  width: 120,
                  height: "auto",
                  opacity: 0.95,
                  transition: "transform 0.3s ease, opacity 0.3s ease",
                  "&:hover": { transform: "scale(1.05)", opacity: 1 },
                }}
              />
              <Box
                component="img"
                src="/cat_colegios.png"
                alt="Logo institución 2"
                sx={{
                  width: 120,
                  height: "auto",
                  opacity: 0.95,
                  transition: "transform 0.3s ease, opacity 0.3s ease",
                  "&:hover": { transform: "scale(1.05)", opacity: 1 },
                }}
              />
              <Box
                component="img"
                src="/sena_i.png"
                alt="Logo institución 3"
                sx={{
                  width: 120,
                  height: "auto",
                  opacity: 0.95,
                  transition: "transform 0.3s ease, opacity 0.3s ease",
                  "&:hover": { transform: "scale(1.05)", opacity: 1 },
                }}
              />
            </Box>

            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "text.primary",
                mb: 1,
              }}
            >
              Instituciones colaboradoras: COLDINI, CAT,    SENA
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: textColor,
                maxWidth: 600,
                mx: "auto",
              }}
            >
              Estas instituciones han brindado su respaldo y colaboración en el desarrollo de este
  proyecto, aportando recursos, orientación y acompañamiento para fortalecer la innovación
  tecnológica y la promoción del turismo local. Su participación refleja el compromiso
  conjunto con el crecimiento educativo, cultural y social de la región, impulsando el
  talento joven y las iniciativas que destacan las riquezas de Capitanejo y sus alrededores.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

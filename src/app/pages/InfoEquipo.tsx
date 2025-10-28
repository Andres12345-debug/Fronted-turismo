import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Container,
  Avatar,
  Stack,
  Paper,
} from "@mui/material";
import groupPhoto from "../../assets/team/group.jpg";

import juan_david from "../../assets/team/juan_david.jpg";
import lilia_smith from "../../assets/team/lilia_smith.jpg";
import angel_raul from "../../assets/team/angel_raul.jpg";
import lisbeth_chaparro from "../../assets/team/lisbeth_chaparro.jpg";
import luz_adriana from "../../assets/team/luz_adriana.jpg";
import danna_gabriela from "../../assets/team/danna_gabriela.jpg";
import lizeth_yurany from "../../assets/team/lizeth_yurany.jpg";
import maria_isabel from "../../assets/team/maria_isabel.jpg";
import jose_manuel from "../../assets/team/jose_manuel.jpg";
import tatiana_perez from "../../assets/team/tatiana_perez.jpg";
import geimy_bermudez from "../../assets/team/geimy_bermudez.jpg";
import angy_paola from "../../assets/team/angy_paola.jpg";
import nicolas_blanco from "../../assets/team/nicolas_blanco.jpg";
import ivonne_garzon from "../../assets/team/ivonne_garzon.jpg";
import maria_jose from "../../assets/team/maria_jose.jpg";
import isabela_marino from "../../assets/team/isabela_marino.jpg";
import yeison_manrique from "../../assets/team/yeison_manrique.jpg";
import emanuel_rodriguez from "../../assets/team/emanuel_rodriguez.jpg";
import julian_tobon from "../../assets/team/julian_tobon.jpg";
import kevin_rodriguez from "../../assets/team/kevin_rodriguez.jpg";
import johan_manrique from "../../assets/team/johan_manrique.jpg";
import maria_camila from "../../assets/team/maria_camila.jpg";
import daniel_delgado from "../../assets/team/daniel_delgado.jpg";
import angie_villamizar from "../../assets/team/angie_villamizar.jpg";
import nestor_olaya from "../../assets/team/nestor_olaya.jpg";
import arnold_velandia from "../../assets/team/arnold_velandia.jpg";

const team = [
  { name: "JUAN DAVID HERRERA FOCAZZIO", bio: "Soy una persona apasionada por la tecnología, caracterizada por su amabilidad, disposición para ayudar y un fuerte sentido de la responsabilidad en cada tarea que realiza.", photo: juan_david },
  { name: "LILIA SMITH ORTIZ", bio: "Ella es una instructora linda y carismática, que transmite confianza y entusiasmo en todo momento.", photo: lilia_smith },
  { name: "Ángel Raúl Sanabria Orjuela", bio: "Tengo 16 años. Soy amable, respetuoso y compañerista. Me gusta el deporte.", photo: angel_raul },
  { name: "LISBETH MARIANA CHAPARRO SUÁREZ", bio: "Tengo 17 años. Soy una persona creativa, amable, sensible, muy comprensible y en mis tiempos libres me gusta pasar tiempo con las personas que más quiero.", photo: lisbeth_chaparro },
  { name: "Luz Adriana Florez Pérez", bio: "Tengo 17 años, soy una persona amable, empática y me gusta compartir con las demás personas.", photo: luz_adriana },
  { name: "Danna Gabriela Medina Figueroa", bio: "Tengo 17 años, soy una persona amable, respetuosa, amigable y me gusta compartir con las demás personas.", photo: danna_gabriela },
  { name: "Lizeth Yurany Vega Florez", bio: "Tengo 18 años me considero una persona amable respetuosa honesta y responsable me gusta ayudar a los demás.", photo: lizeth_yurany },
  { name: "María Isabel Espinosa Florez", bio: "Tengo 18 años y me considero una persona amable respetuosa responsable y honesta me gusta ayudarle en lo que pueda a los demás.", photo: maria_isabel },
  { name: "JOSÉ MANUEL MÉNDEZ SUÁREZ", bio: "Tengo 17 años soy alguien amable, colaborador y fraterno me gusta dibujar y cocinar.", photo: jose_manuel },
  { name: "Tatiana Esperanza Pérez Chasoy", bio: "Me considero una persona amable, con buena actitud y deseos de superación.", photo: tatiana_perez },
  { name: "Geimy Zarith Bermúdez Prada", bio: "Soy estudiante del COLDINI, soy aprendiz del Sena en Operación Turística Local y me caracterizó por ser una estudiante dedicada y motivada a alcanzar mis metas.", photo: geimy_bermudez },
  { name: "Angy Paola Estupiñán Romero", bio: "Hola, tengo 17 años, nací el 29 de agosto del 2008, soy una persona responsable.", photo: angy_paola },
  { name: "Nicolás Blanco Chaparro", bio: "Tengo 17 años, nací en Málaga Santander el 27 de agosto de 2008, soy una persona amable, respetuosa y compañerista.", photo: nicolas_blanco },
  { name: "Ivonne Yolima Garzón Hernández", bio: "tiene 16 años, Es una joven penosa, amable, una persona positiva, trata de ayudar en lo que sabe.", photo: ivonne_garzon },
  { name: "María José Panqueva Aponte", bio: "Soy una joven responsable, respetuosa, amable, sencilla con sueños, errores, aprendizajes y ganas de crecer.", photo: maria_jose },
  { name: "Isabela Mariño Bermúdez", bio: "Es una joven amable, sencilla, responsable, divertida. Es una joven que sigue adelante así se le atraviese muchos obstáculos, ella ayuda a las personas que lo necesitan y tiene gran capacidad de escuchar.", photo: isabela_marino },
  { name: "Yeison Fernando Manrique Manrique", bio: "Es un joven carismático y alegre, que expresa su pasión por la danza con cada sonrisa.", photo: yeison_manrique },
  { name: "Emanuel Rodríguez Duarte", bio: "Me considero una persona amable, responsable, enfocado, respetuoso, compañerista, aplicado.", photo: emanuel_rodriguez },
  { name: "Julián Alberto Tobón Prada", bio: "Joven entusiasta y colaborador, con disposición para el aprendizaje y compromiso.", photo: julian_tobon },
  { name: "Kevin Armando Rodríguez Cordero", bio: "Su empatía y respeto por los animales reflejan su nobleza.", photo: kevin_rodriguez },
  { name: "Johan Estiven Manrique Estupiñán", bio: "Es un joven alegre y espontáneo, que transmite buena energía en su alrededor.", photo: johan_manrique },
  { name: "María Camila Velasco Toscano", bio: "Tengo 17 años soy una persona muy sensible, optimista y amable en mis tiempos libres me gusta jugar futbol y ver los animales.", photo: maria_camila },
  { name: "Daniel Eduardo Delgado Barón", bio: "Es un joven alegre y amable, colaborativo y servidor.", photo: daniel_delgado },
  { name: "Angie Mariana Villamizar Dueñas", bio: "Es una niña carismática y alegre, que irradia frescura y orgullo Capitanejano.", photo: angie_villamizar },
  { name: "Néstor Iván Olaya Paredes", bio: "Soy responsable, creativa y con gran disposición para trabajar en equipo, destacándose por su actitud positiva y sus ganas de aprender.", photo: nestor_olaya },
  { name: "Arnold Velandia Mateus", bio: "Administrador Turístico y Hotelero Guía de Turismo Profesional Gestor Cultural", photo: arnold_velandia },
];

const EquipoTurismoOnceColdini = () => {
  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography variant="h4" align="center" gutterBottom fontWeight="bold" color="text.primary">
        Equipo de Turismo Once Coldini
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        <Card sx={{ borderRadius: 4, overflow: "hidden", boxShadow: 3 }}>
          <CardMedia
            component="img"
            image={groupPhoto}
            alt="Equipo Once Coldini"
            sx={{ maxHeight: 400, objectFit: "cover" }}
          />
        </Card>
      </Box>

      <Stack spacing={3} alignItems="center">
        {team.map((member, index) => (
          <Paper
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              p: 2,
              borderRadius: 3,
              width: "100%",
              maxWidth: 600,
              boxShadow: 3,
            }}
          >
            <Avatar
              alt={member.name}
              src={member.photo}
              sx={{
                width: 96,
                height: 96,
                mr: 2,
                border: "2px solid white",
                boxShadow: 2,
              }}
            />
            <Box>
              <Typography variant="h6" fontWeight="bold" color="text.primary">
                {member.name}
              </Typography>
              <Typography variant="body2" color="text.primary">
                {member.bio}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Stack>
    </Container>
  );
};

export default EquipoTurismoOnceColdini;

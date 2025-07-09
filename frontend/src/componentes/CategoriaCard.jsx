// src/componentes/CategoriaCard.jsx
import { motion } from "framer-motion";
import ButtonBase from '@mui/material/ButtonBase';
import { useNavigate } from "react-router-dom";

export default function CategoriaCard({ nombre, imagen, id }) {
  const navigate = useNavigate();
  return (
    <motion.div
      className="card-categoria"
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.38, type: "spring", bounce: 0.3 }}
      whileHover={{ scale: 1.05, rotate: -2 }}
    >
      <ButtonBase
        focusRipple
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '1rem',
          display: 'flex',
          flexDirection: 'column',
        }}
        onClick={() => navigate(`/productos?categoria=${id}`)}
      >
        <img
          src={imagen}
          alt={nombre}
          draggable={false}
          style={{
            width: 100,
            height: 100,
            objectFit: "contain",
            margin: "0 auto 1rem auto",
            background: "none",
            borderRadius: 0,
            boxShadow: "none",
            outline: "none",
            padding: 0,
            filter: "drop-shadow(0 1px 5px rgba(30,30,30,0.04))",
            zIndex: 1,
            pointerEvents: "none",
            userSelect: "none",
          }}
        />
        <h3
          className="categoria-nombre"
          style={{
            color: "#000",
            fontWeight: "bold",
            margin: 0,
            textShadow: "none",
            background: "transparent",
            WebkitTextFillColor: "#000",
            WebkitTextStroke: "0px #000"
          }}
        >
          {nombre}
        </h3>
      </ButtonBase>
    </motion.div>
  );
}
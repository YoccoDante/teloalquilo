import { Typography } from "@mui/material"
import { Link } from "react-router-dom";
import './index.css'

export function CopyRight() {
  return (
    <>
      {'© '}
      <Link color="inherit" to="/home">
        Teloalquilo.com.pe
      </Link>{' '}
      {new Date().getFullYear()}
    </>

  );
}
import { Typography } from "@mui/material"
import { Link } from "react-router-dom";
import './index.css'

export function CopyRight() {
  return (
    <>
      {'© '}
      <Link color="inherit" to="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
    </>

  );
}
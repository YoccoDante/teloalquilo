import { Typography } from "@mui/material"
import { Link } from "react-router-dom";
import './index.css'

export function CopyRight(props: any) {
  return (
    <div className="footer">
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" to="/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </div>
  );
}
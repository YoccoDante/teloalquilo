import CssBaseline from "@mui/material/CssBaseline"
import { CopyRight } from "../../../commons/Copyright";
import VideoLanding from './VideosLanding';
import { CarrilProductos } from '../../../componets/Itemslanding/CarrilProductos';

export default function ButtonAppBar() {
  return (
    <>
      <div>
      <CssBaseline/>
      <VideoLanding/>
      <CarrilProductos/>
      <CopyRight/>
      </div>
    </>
  );
}

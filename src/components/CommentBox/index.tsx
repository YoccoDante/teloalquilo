import { Box, Button } from '@mui/material'
import Commentslist from './CommentsList';
import SendIcon from '@mui/icons-material/Send';
import { CommentModel } from '../../models/comment/commentModel';
import './index.css'

/*<CommentBox comments={root?.comments}/> */

function CommentBox( {comments}:{comments:CommentModel[]} ) {
  return (
    <>
    <Commentslist comments={comments}/>
    <Box
    sx={{
    height:"100px",
    width:"100%",
    overflow:"scroll",
    position:"sticky",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    bottom:0,
    bgcolor:"#fff"
    }}>
      <textarea className="CommentTextArea" placeholder="Escribe un comentario..."/>
      <Button
      size="large"
      sx={{
          position:"relative",
          right:"0"
      }}
      variant="contained"
      endIcon={<SendIcon/>}
      >Enviar</Button>
    </Box>
    </>
  )
}

export default CommentBox
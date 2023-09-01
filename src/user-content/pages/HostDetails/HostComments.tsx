import { Button, Typography, Box } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from 'react';
import CommentBox from "../../../components/CommentBox"
import { CommentModel } from '../../../models/comment/commentModel';
 
function CustomerComments( {comments}:{comments:CommentModel[]} ) {
    const [ viewComment, setViewComment ] = useState(false)
    const commentDisplay = viewComment? "block" : "none";
    const viewCommentsText = viewComment? "Ocultar comentarios" : "Ver comentarios"
    const viewCommentsIcon = viewComment? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>
    const handleViewComments = () => {
        setViewComment(!viewComment)
    }
  return (
    <div>
      <Button
      sx={{
        ml:"15px"
      }}
      size="large"
      variant="contained"
      endIcon={viewCommentsIcon}
      onClick={handleViewComments}>
        {viewCommentsText}
      </Button>
      <Typography
      component="dt"
      display={commentDisplay}>
        Comentarios:
        <Box
        sx={{
          position:"relative",
          width:{
            xs:"100%"
          },
          height:{
            xs:"100%"
          },
          maxHeight:{
            xs:"400px"
          },
          overflow:"scroll"
        }}>
          <CommentBox comments={comments}/>
        </Box>
      </Typography>
      </div>
  )
}

export default CustomerComments
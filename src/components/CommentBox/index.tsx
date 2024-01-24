import { Box, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { CommentModel } from '../../models/comment/commentModel';
import './index.css'
import React, { useContext, useState } from 'react';
import { UserSessionContext } from '../../contexts/authContext';
import { useNavigate, useParams } from 'react-router-dom';
import Comment from '../Comment';
import { BACKEND_TOOLS } from '../../models/BACKEND_TOOLS';
import { useWithResponseContext } from '../../contexts/snackBarContext';

const API = `${BACKEND_TOOLS.API_URI}/comment/new`;

interface CommentBoxProps {
  comments: CommentModel[];
}

function CommentBox({comments}: CommentBoxProps) {
  const navigate = useNavigate();
  const { userSession } = useContext(UserSessionContext);
  const [ comment, setComment ] = useState('');
  const { user_id, product_id } = useParams();
  const {setWithResponse} = useWithResponseContext()

  const handleSendComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userSession.user) {
      navigate('/login');
      return;
    }
    const root_id = user_id ? user_id : product_id ? product_id : '';
    const commentData = { root_id:root_id, content: comment };

    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Enterprise-Id':BACKEND_TOOLS.ENTERPRISE_ID,
          'Authorization':userSession.token!
        },
        body: JSON.stringify(commentData)
      });
      const data = await res.json()

      if (res.ok){
        setWithResponse({ msg: '¡Commentario enviado satisfactoriamente!', color: 'success' });
        // Add the new comment to the local comments array
        comments.push(data.new_comment)
      }
      if (!res.ok) {
        setWithResponse({ msg:JSON.stringify(data), color: 'error'});
      }
    } catch (error) {
      setWithResponse({ msg: 'Algo salió mal, por favor intenta de nuevo.', color: 'error' });
    }
    finally {
      setComment('');
    }
  };

  return (
  <>
  <Box
  sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '15px', overflow:'auto' }}>
    {comments.map((comment, index) =>
      <Comment key={index} comment={comment}/>
    )}
  </Box>
  
  <Box
  component='form'
  onSubmit={handleSendComment}
  sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
  <textarea
    value={comment}
    onChange={(e) => setComment(e.target.value)}
    placeholder="Escribe un comentario..."
    style={{
      flexGrow: 1,
      marginRight: '10px', 
      borderRadius: '4px', 
      padding: '10px', 
      border: '1px solid #ccc'
    }} 
  />
    <Button
      type='submit'
      variant='contained'
      endIcon={<SendIcon/>}
      style={{ backgroundColor: '#007BFF', color: 'white' }}
    >
      Enviar
    </Button>
  </Box>
  </>
  );
}

export default CommentBox;
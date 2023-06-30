import { Typography, Button, Grid } from '@mui/material';
import { CurrentUser } from './data/currentUser'
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

function PageHeader() {
  const user = CurrentUser
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          User Managment
        </Typography>
        <Typography variant="h5">
          {user.name}, these are your user management panel
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
        >
          Create user
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;

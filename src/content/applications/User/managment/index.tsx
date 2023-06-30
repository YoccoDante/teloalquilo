import PageHeader from "./PageHeader";
import { Grid, Container, Typography } from '@mui/material';
import Users from "./Users";




function ApplicationsUserManagment() {
    return (
        <>
            <title>User Managment - Applications</title>
            <PageHeader />
            <Container maxWidth="lg">
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={3}
                >
                    <Grid item xs={12}>
                        <Users />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default ApplicationsUserManagment;

import { Container, Rating, Typography } from "@mui/material"
import WedgesLoader from "../../../components/Loaders/WedgesLoader";
import './index.css'
import FilteredCustomers from "./FilteredHost";
import StarFilter from "./StarFilter";
import useFilterStars from "../../../hooks/useFilterStars";
import useGetUsers from "../../../hooks/useGetUsers";


function Finder() {
    const {users} = useGetUsers({range:"host"})
    const HostFilter = useFilterStars()
  return (
    <>
    {
        users?
        <Container>
            <Typography variant="h6">Busca entre nuestros antifriones por su calificación!</Typography>
            <StarFilter HostFilter={HostFilter}/>
            <FilteredCustomers users={users} stars={HostFilter.stars}/>
        </Container>
        :
        <WedgesLoader/>
    }
    </>
  )
}

export default Finder
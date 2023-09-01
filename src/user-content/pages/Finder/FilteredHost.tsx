import { useEffect, useState } from "react"
import { UserModel } from "../../../models/user/userModel"
import WedgesLoader from "../../../components/Loaders/WedgesLoader"
import ProfileCard from "../../../components/ProfileCard"

function FilteredUsers( { users, stars }:{ users:UserModel[], stars:number }) {
    const [ filteredUsers, setFilteredUsers ] = useState(users)
    let resultado = []
    useEffect(() => {
        resultado = users?.filter((cliente) => cliente.stars !== null && cliente.stars >= stars)
        setFilteredUsers(resultado)
    },[stars])
    return (
        <div className="CustomerCards">
            {filteredUsers?filteredUsers.map((user) => (
                <ProfileCard key={user._id} _id={user._id} full_name={user.full_name} profile_pic={user.profile_pic} rate={user.stars}/>
            )):
            <WedgesLoader/>}
        </div>
    )
}

export default FilteredUsers
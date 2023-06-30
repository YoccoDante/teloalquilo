import Card from '@mui/material/Card';
import UsersTable from './UsersTable';
import { AllUsers } from './data/allUsers';
import { UserModel } from '../../../../models/user/userModel';

function Users() {
    const users: UserModel[] = AllUsers

    return (
        <Card>
            <UsersTable user_list={users} />
        </Card>
    );
}

export default Users;

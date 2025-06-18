import {useDispatch, useSelector} from "react-redux";
import {fetchUsers, selectAllUser, selectUsersError, selectUsersStatus} from "./users";

const UserList = () => {

    const dispatch = useDispatch();
    const users = useSelector(selectAllUser);
    const status = useSelector(selectUsersStatus);
    const error = useSelector(selectUsersError);

    console.log('UserList component rendered');
    console.log('Status:', status);
    console.log('Users:', users);
    console.log('Error:', error);

  /*  useEffect(() => {
        console.log("Starting effect");
        if (status === 'idle') {
            console.log("Fetching")
            dispatch(fetchUsers())
        }
    }, [status, dispatch]);*/

    let content;
    if (status === 'loading') {
        content = <div>Loading...</div>;
    } else if (status === 'succeeded') {
        content = (
            <div className="user-list">
                {users.map(user => (
                    <p key={user.id} className="user-item">
                        {user.name}
                    </p>
                ))}
            </div>
        );
    } else if (status === 'failed') {
        content = <div className="error-message">Error: {error}</div>;
    } else {
        content = <div>Waiting to load users...</div>;
    }
    return (
        <div className="users-container">
            <h2>Users</h2>
            <button
                onClick={() => dispatch(fetchUsers())}
                disabled={status === 'loading'}>
                {status === 'loading' ? 'Refreshing...' : 'Refresh Users'}
            </button>
            {content}
        </div>
    );
};

export default UserList;
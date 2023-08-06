import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";

const COHORT_NAME = '2209-FTB-ET-WEB-FT'
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`

export default function Profile() {
    const [userPosts, setUserPosts] = useState([]);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const onDelete = async (postId) => {
        try {
            const response = await fetch(`${BASE_URL}/posts/${postId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const result = await response.json();
            console.log(result);
            setUserPosts(prevUserPosts => prevUserPosts.filter(post => post._id !== postId));
        } catch(err) {
            console.error(err);
        }
    };

    const handleLogout = () => {
        setUserPosts([]);
        localStorage.removeItem('token');
        alert('You have been logged out')
        navigate('/Login');
    };
    
    useEffect(() => {
        if (token) {
            fetch(`${BASE_URL}/users/me`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(response => response.json())
            .then(userData => {
                setUserPosts(userData.data.posts);
            })
            .catch(error => {
                console.error(error);
            });
        }
    }, [token]);

    return (
        <div>
            <h2>Your Posts</h2>
            {userPosts.length === 0 ? (
                <p>Nothing to see here...</p>
            ) : (
                userPosts
                .filter(post => post.active)
                .map(post => (
                    <div key={post._id} id='myPostsCard'>
                        <h2>Title: {post.title}</h2>
                        <p>Description: {post.description}</p>
                        <h4>Price: {post.price}</h4>
                        <h4>Location: {post.location}</h4>
                        <button onClick={() => onDelete(post._id)}>Delete</button>
                    </div>
                ))
            )}
            <div>
                <Link to='/NewPost'>Want to Post something?</Link>
                <br />
                <button onClick={handleLogout}>Logout</button>        
            </div>
        </div>
    );
}

//imports
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
//URL variables
const COHORT_NAME = '2306-FTB-ET-WEB-FT'
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`
//main function
export default function Profile() {
    //useState declarations + others
    const [userPosts, setUserPosts] = useState([]);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [ messages, setMessages ] = useState([]);
    //post deletion function
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
            //logs result + alert
            console.log(alert('post has been deleted'), 'post has been deleted', result);
            //filters posts for actives
            setUserPosts(prevUserPosts => prevUserPosts.filter(post => post._id !== postId));
        } catch(err) {
            console.error(err);
        }
    };
    //logout function
    const handleLogout = () => {
        //clears states
        setUserPosts([]);
        //clears token
        localStorage.removeItem('token');
        //message for user
        alert('You have been logged out')
        //navigates you back to login
        navigate('/Login');
        //window reload to fix a conditional rendering bug
        window.location.reload();
    };
    //main fetch function for the currently logged in users data
    useEffect(() => {
        if (token) {
            fetch(`${BASE_URL}/users/me`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            //setting states using .then notation, wanted to try it out
            .then(response => response.json())
            .then(userData => {
                setUserPosts(userData.data.posts);
                setMessages(userData.data.messages)
            })
            .catch(error => {
                console.error(error);
            });
        }
    }, [token]); //token dependency
//rendering, if else statements with (!token) to create conditional rendering to only logged in users will see the }else{ data
if (!token) {
    return (
        <div>
            <h1>Must be logged in to view profile</h1>
            <br />
            <Link to='/Login'>Log in or Create new account</Link>
        </div>
        );
    } else {
        
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
            <div className="messagesBox">
                <h2> Your Messages </h2>
                {
                    messages.map((messages, index) => {
                        
                        return (
                            <div key={index} id='messageCard'>
                                <h3>From: {messages.fromUser.username} </h3>
                                <h3>Post: {messages.post.title} </h3>
                                <p> Message: {messages.content} </p>
                            </div>
                        )
                    })
                }
            </div>
            <div>
                <Link to='/NewPost'>Want to Post something?</Link>
                <br />
                <button onClick={handleLogout}>Logout</button>        
            </div>
        </div>
        )
    }
}

import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const COHORT_NAME = '2209-FTB-ET-WEB-FT'
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`

export default function Posts() {
    const [ posts, setPosts ] = useState([])
    const navigate = useNavigate();
    const token = localStorage.getItem('token')

    useEffect(() => {
    
        async function fetchData() {
            try {
                const response = await fetch(`${BASE_URL}/posts`)
                const data = await response.json();

                console.log(data.data.posts);
                setPosts(data.data.posts);
            } catch(error) {
                console.error(error);
            }
        }
            
        fetchData();
    }, [])

    const handleSend = (postID) => {
        navigate(`/SendMessage/${postID}`)
    }

    return <>
        <div>
            <h1>Stranger Things</h1>
        </div>
        {posts.map((posts, index) => 
            <div key={index} className="allPosts">
                <h1>{posts.title}</h1>
                <h3>{posts.author.username}</h3>
                <h3>Location: {posts.location}</h3>
                <h3>Price: {posts.price}</h3>
                <p>{posts.description}</p>
                {token && <button onClick={() => handleSend(posts._id)}>Send a message</button>}
            </div>
        )} 
    </>  
}


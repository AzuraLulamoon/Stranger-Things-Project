// import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const COHORT_NAME = '2209-FTB-ET-WEB-FT'
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`

export default function Posts() {
    const [ posts, setPosts ] = useState([])
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
    
        async function fetchData() {
            try {
                const response = await fetch(`${BASE_URL}/posts`)
                const data = await response.json();

                console.log(data.data.posts);
                setPosts(data.data.posts);
            } catch(error) {
                setErrorMessage(error);
            }
        }
            
        fetchData();
    }, [])
    
    return <>
        <div>
            <h1>Stranger Things</h1>
        </div>
        {posts.map((posts, index) => 
            <div key={index} className="allPosts"
                onClick={() => navigate(`{/$posts.id}`)}>
                <h1>{posts.title}</h1>
                <h3>Location: {posts.location}</h3>
                <h3>Price: {posts.price}</h3>
                <p>{posts.description}</p>
            </div>
        )} 
    </>  
}
// import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const COHORT_NAME = '2209-FTB-ET-WEB-FT'
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`

export default function Posts() {
    const [ posts, setPosts ] = useState([])
    const [errorMessage, setErrorMessage] = useState(''); 

    useEffect(() => {
    
        async function fetchData() {
            try {
                const response = await fetch(`${BASE_URL}/posts`)
                const data = response.json();

                console.log(data);
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
                onClick={() => Navigate(`/$posts.id`)}>
                <h1>{posts.title}</h1>
                <h3>{posts.location}</h3>
                <h3>{posts.price}</h3>
            </div>
        )} 
    </>  
}
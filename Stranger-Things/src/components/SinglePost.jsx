import { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom'

// API info
const COHORT_NAME = '2209-FTB-ET-WEB-FT'
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`

export default function SinglePost() {

    const [ singlePost, setSinglePost ] = useState({})
    const { id } = useParams()

    useEffect(() => {

        async function fetchData() {
            const response = await fetch(`${BASE_URL}/posts/${id}`)
            const data = await response.json()

            console.log(data)
            setSinglePost(cleanData(data))
        }

        fetchData();
    }, [])

    function cleanData(data) {

        return {
            title: data.data.posts.title,
            id: data.data.posts.author.id,
            price: data.data.posts.price,
            location: data.data.posts.location,
            description: data.data.posts.description,
            willDeliver: data.data.posts.willDeliver,
            author: data.data.posts.author
        }
    }

    console.log(singlePost)

    return <div className="singlePostCard">

        <h2>{singlePost.author}</h2>
        <h1>{singlePost.title}</h1>
        <h3>{singlePost.price}</h3>
        <h3>{singlePost.location}</h3>
        <h4>{singlePost.willDeliver}</h4>
        <p>{singlePost.description}</p>
    </div>
}

// need to finish this
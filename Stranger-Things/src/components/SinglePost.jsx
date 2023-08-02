import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";

const COHORT_NAME = '2209-FTB-ET-WEB-FT'
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`

export default function SinglePost() {

    const [ post, setPost ] = useState({})
    const { id } = useParams()

    useEffect(() => {

        async function fetchData() {
            const response = await fetch(`${BASE_URL}/posts/${id}`)
            const data = await response.json()

            console.log(data)
            setPost(clean)
        }
    })
}
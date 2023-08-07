// imports
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const COHORT_NAME = '2306-FTB-ET-WEB-FT'
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`

export default function NewForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const changeTitle = (event) => {
        setTitle(event.target.value);
    }

    const changeDescription = (event) => {
        setDescription(event.target.value);
    }

    const changePrice = (event) => {
        setPrice(event.target.value);
    }

    const changeLocation = (event) => {
        setLocation(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
    //content management
    const newPost = {
        post: {
            title: title,
            description: description,
            price: price,
            location: location
        }
    };
    //log all the thing
    console.log(newPost)
    try {
        const response = await fetch(`${BASE_URL}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(newPost)
        });

        if (response.ok) {
            console.log(alert('New post created'), 'yay new post!')
            setTitle(title);
            setDescription(description);
            setPrice(price);
            setLocation(location);
        } else {
            console.error('post failed');
        }
    navigate('/Profile')

    } catch(error) {
        console.error('post error', error)
    }

    }
    return (
        <div>
            <h1>New Post</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" value={title} onChange={changeTitle} />
                </div>
                <div>
                    <label>Description:</label>
                    <input type="text" value={description} onChange={changeDescription} />
                </div>
                <div>
                    <label>Price:</label>
                    <input type="text" value={price} onChange={changePrice} />
                </div>
                <div>
                    <label>Location:</label>
                    <input type="text" value={location} onChange={changeLocation} />
                </div>
                <button type='submit'>Post it!</button>
            </form>

        </div>
    )
}
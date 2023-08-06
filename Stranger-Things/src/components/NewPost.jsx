// imports
import { useState } from "react";

const COHORT_NAME = '2209-FTB-ET-WEB-FT'
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`

export default function NewForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const token = localStorage.getItem('token');

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
            console.log('yay new post!')
            setTitle(title);
            setDescription(description);
            setPrice(price);
            setLocation(location);
        } else {
            console.error('post failed');
        }

        console.log(newPost)
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
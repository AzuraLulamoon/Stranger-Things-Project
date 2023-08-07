import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const COHORT_NAME = '2306-FTB-ET-WEB-FT'
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`

export default function SendMessage() {
    
    const { postID } = useParams();
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${BASE_URL}/posts/${postID}/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    message: {
                        content: message
                    }
                })
            });

            setMessage(message);

            if (response.ok) {
                console.log(alert('Message sent!'), 'Message sent successfully!');
                navigate('/Profile')
            } else {
                console.error('Failed to send message.');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    return (
        <div>
            <h2>Compose a Message to this user?</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}
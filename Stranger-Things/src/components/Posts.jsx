import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const COHORT_NAME = '2306-FTB-ET-WEB-FT'
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`

export default function Posts() {
    const [ posts, setPosts ] = useState([])
    const navigate = useNavigate();
    const token = localStorage.getItem('token')
    const [searchVal, setSearchVal] = useState('');
    const [Searches, SetSearches] = useState([]);
    const [searchActive, setSearchActive] = useState(false);

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

    const HandleSearch = () => {
        
        const filter = posts.filter(post => {
            return post.title.toLowerCase().includes(searchVal.toLowerCase());
        })
        SetSearches(filter);
        setSearchActive(true);
    }

    const clearSearch = () => {
        setSearchVal('');
        SetSearches([]);
        setSearchActive(false);
    }

    const handleSend = (postID) => {
        navigate(`/SendMessage/${postID}`)
    }

    return (
        <div>
            <h1 className="postTitleCard">All Posts</h1>
            <form className='searchContainer' onSubmit={(event) => {
                event.preventDefault();
                HandleSearch();
            }}>
                <label className="searchBar"> Search:
                <input
                    type="text"
                    id="searchFunction"
                    value={searchVal}
                    onChange={(event) => setSearchVal(event.target.value)}
                    />
                    </label>
                <button type="submit" className="searchButtons">Search Posts</button>
                <button type="button" className='searchButtons' onClick={clearSearch}>Clear</button>
            </form>

            {searchActive ? ( 
                Searches.map(post => (
                        <div key={post._id} className="allPosts">
                            <h1>{post.title}</h1>
                            <h3>{post.author.username}</h3>
                            <h3>Location: {post.location}</h3>
                            <h3>Price: {post.price}</h3>
                            <p>{post.description}</p>
                            {token && <button onClick={() => handleSend(post._id)}>Send a message</button>}
                        </div>
                    ))
            ) : (
                posts.map((posts, index) => (
                    <div key={index} className="allPosts">
                        <h1>{posts.title}</h1>
                        <h3>{posts.author.username}</h3>
                        <h3>Location: {posts.location}</h3>
                        <h3>Price: {posts.price}</h3>
                        <p>{posts.description}</p>
                        {token && <button onClick={() => handleSend(posts._id)}>Send a message</button>}
                    </div>
                ))
            )}
        </div>
    );      
}

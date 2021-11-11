import axios from "axios";
import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom"

const DetailPostPage = () => {

    const [isLoading, setIsLoading] = useState(true);

    const [listPost, setListPost] = useState({
        title: null,
        body: null
    });

    const IDPost = useParams().id;

    useEffect(() => {
        document.title = "Posts Page"
    }, []);

    //call API
    useEffect(() => {
        setIsLoading(true);
        axios({
            url: `https://jsonplaceholder.typicode.com/posts/${IDPost}`,
            method: 'GET',
          })
        //axios.get(`https://jsonplaceholder.typicode.com/posts/${IDPost}`)
            .then(respone => {
                console.log(respone);
                setIsLoading(false);
                setListPost({
                    title: respone.data.title,
                    body: respone.data.body

                });
            })
        
    }, [IDPost]);

    if (isLoading) {
        return <div>LOADING...</div>
    }

    return (
        <div>
            <div style={{margin: 5}}>
                ID: {IDPost}
            </div>
            <div style={{margin: 5}}>
                Title: {listPost.title}
            </div>
            <div style={{margin: 5}}>
                Body: {listPost.body}
            </div>
        </div>

    )
}
export default DetailPostPage;
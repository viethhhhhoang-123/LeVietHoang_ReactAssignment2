import axios from "axios";
import React, { useEffect, useState } from "react";
const HomePage = () => 
{
    useEffect(() => {
        document.title = "Home Page"
    }, []);

    return (
        <div>
            <h3>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</h3>
        </div>
    )
}
export default HomePage;
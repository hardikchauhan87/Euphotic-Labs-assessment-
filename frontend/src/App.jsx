import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchdishes();
        const interval = setInterval(fetchdishes, 3000);
        return () => clearInterval(interval);
    }, []);
    const fetchdishes=()=>{
        axios.get('http://localhost:3010/Fetch')
            .then(resp => setData(resp.data))
            .catch(err => console.log(err));
    }

    const change = (id, currStatus) => {
        const newStatus = !currStatus;
        console.log(`Updating dish with id: ${id} to isPublished: ${newStatus}`);

        axios.put(`http://localhost:3010/update/${id}`, { isPublished: newStatus }) // Corrected URL construction
            .then(resp => {
                fetchdishes(); // Refresh dishes after updating
            })
            .catch(err => console.log(err));
    };

    return (
        <div id='top-all'>
            <div className='headd'>
                <h1>Dishes Dashboard</h1>
            </div>
            <div className='container'>
                {data.map((info) => (
                    <div key={info.id} className='in-div'>
                        <img src={info.imageUrl} alt={info.dishName} />
                        <span>Name:{info.dishName}</span> <br />
                        <span id='pub'>{info.isPublished ? 'Published: true' : 'Published: false'}</span> <br />
                        <button onClick={()=>change(info.dishld, info.isPublished)} className='btn btn-primary'>
                        {info.isPublished ? 'Unpublish' : 'Publish'}</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;

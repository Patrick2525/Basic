import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Appbar from './Component/Appbar';
import Home from './menus/Home';
import About from './menus/About';
import Posts from './menus/posts/Posts';
import Project from './menus/Project';
import TIL from './menus/TIL';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

    const [state, setState] =useState({
        posts: ""
    })
    const {posts} = state;

    useEffect(() => {
        //fetchPostsFromDB();
        fetch('/posts')
            .then((res) => res.json())
            .then(data => {
                setState({posts:data});
            })
    }, [])

    const fetchPostsFromDB = () => {
        // fetch('/posts')
        //     .then((res) => res.json())
        //     .then(data => {
        //         setState({posts:data});
            // })
        axios.get('/posts')
            .then((res) => {
                console.log(res)
                setState({
                    posts:res
                })
            })
            
        console.log("refresh"); // Q.리프레시가 두번씩 되는 이유
    };

    return (
        <div className="App">
            <BrowserRouter>
                {/* Appbar styling은 나중에 */}
                <Appbar/>
                <Routes>
                    <Route path="/*" element={<Home/>}/>
                    <Route path="/About" element={<About/>}/>
                    <Route path="/Posts" element={posts ? <Posts stateRefresh={fetchPostsFromDB} posts={state.posts}/> : "DB에서 fetch중"}/>
                    <Route path="/TIL" element={<TIL/>}/>
                    <Route path="/Project" element={<Project/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

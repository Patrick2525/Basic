import React, { useEffect } from 'react';
import {useState} from 'react';
import Card from '../../Component/Card';
import { Paper } from '@mui/material';
import '../../style/Posts.css';
import CreatePost from './CreatePost';

function Posts(props) {
  const [state, setState] = useState({
    posts : ""
  });
  const {posts} = state;

  useEffect(() => {
    setState({posts:props.posts})
  }, []);

  return (
    <div className='posts'>
      <CreatePost stateRefresh={props.stateRefresh}/>
      <Paper className='postsPaper' elevation={0}>
        {posts ? posts.map(post => {return(<Card sx={{margin: '10px'}} key={post.id} post={post}/>)}):"App.js로 부터 넘겨받는중"}
        {/* <div><button>추가버튼</button></div>
        <div><button>수정버튼</button></div>
        <div><button>삭제버튼</button></div> */}
      </Paper>
    </div>
  )
}

export default Posts
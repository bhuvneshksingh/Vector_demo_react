import React, { useState, useEffect, useCallback } from 'react';
import Overlay from './components/Overlay';
import DraggableItem from './components/DraggableItem';
import json_img from './data/img.json';
import axios from 'axios'
import './App.css';
var images = require.context('./images', true);


function App() {
  const [ data, setData ] = useState([]);
  const [ isOverlayOpened, setIsOverlayOpened ] = useState(false);
  const [ imgSrc, setImgSrc ] = useState("");
  


  useEffect(() => {  
    const imgPath = ['0001','0002','0003','0004','0005','0006','0007','0008','0009','0010']   
    axios.get("http://127.0.0.1:8000/get")
    .then(response =>{
          setData(response.data.map(item=>{
          const randomIndex =  Math.floor(Math.random() * Math.floor(imgPath.length));
          json_img.url= images(`./${imgPath[randomIndex]}.jpg`)
          json_img.thumb= images(`./${imgPath[randomIndex]}.jpg`)
          return {...item,...json_img}
        }))
    })
    .catch(err =>{
        console.log(err)
    })
   
  }, [])

  const closeOverlay = useCallback(() => {
    setIsOverlayOpened(false);
    setImgSrc(false)
  }, [])

  const onDragOver = e => {
    e.preventDefault();
  }
  
  const onDragStart = (e, index) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("index", index);
  }

  const onDrop = (e, index) => {
    const d_item_index = e.dataTransfer.getData("index");
    
    if(index === d_item_index) return;

    const item = {...data[d_item_index]};
    const newData = [...data];

    newData.splice(d_item_index, 1);
    newData.splice(index, 0, item);
    newData.forEach((item, index) => item.position = index );

    setData(newData);
  }
  
  // Open overlay when thumbnail is clicked.
  const openImage = (url) => () => {
    setImgSrc(url);
    setIsOverlayOpened(true);
  }
  
  // Get Dragabble card list
  const getList = data.map((item, idx) => 
    <DraggableItem 
      key={item.title}
      index={idx}
      item={item}
      openImage={openImage}
      onDragStart={ onDragStart }
      onDrop={onDrop}
      onDragOver={onDragOver} />);
  


  return (
    <div className="container">
      {isOverlayOpened &&
        <Overlay src={imgSrc} alt="" closeFun={closeOverlay} />
      }
      <h2 className="header">Drag and Drop</h2>
      <article className="main-body">
        {getList}
       
      </article>
    </div> 
  );
}

export default App;

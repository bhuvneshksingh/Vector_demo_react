import React, { useState } from 'react';
import Spinner from '../assets/Spinner.gif';

const DraggableItem = ({ item, index, onDragStart, onDragOver, onDrop, openImage}) => {

  const [loading, setLoading] = useState(true);
  const imageLoaded = () => {
    setLoading(false);
  }

return <span
  onDragOver={ onDragOver } 
  onDrop={e => onDrop(e, index)}
  className="draggable-item-container"
>
  <div 
    draggable 
    className="draggable-item"
    onDragStart={(e) => onDragStart(e, index)}>
    <figcaption>{item.title}</figcaption>
      <div style={{display: loading ? "block" : "none", backgroundColor: "white", textAlign: "center"}}>
        <img src={Spinner} alt="" />
      </div>
    <img onClick={openImage(item.url)} src={item.thumb} alt="" onLoad={imageLoaded} style={{display: loading ? "none" : "block"}} className="thumb-image" /> 
  </div>
</span>
};

export default DraggableItem;
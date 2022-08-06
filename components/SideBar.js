import React from 'react';
import styles from "../styles/Home.module.css";

export default function SideBar() {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div className={`${styles.description}`}>You can drag these nodes to the pane on the right.</div>
      <div className={`${styles.dndnode}`} onDragStart={(event) => onDragStart(event, 'input')} draggable>
        Input Node
      </div>
      <div className={`${styles.dndnode}`} onDragStart={(event) => onDragStart(event, 'default')} draggable>
        Default Node
      </div>
      <div className={`${styles.dndnode}`} onDragStart={(event) => onDragStart(event, 'output')} draggable>
        Output Node
      </div>
    </aside>
  );
};
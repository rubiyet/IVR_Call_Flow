import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  updateEdge,
  MiniMap
} from 'react-flow-renderer';

import Sidebar from '../components/SideBar';

import styles from "../styles/Home.module.css";

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'input node' },
    position: { x: 250, y: 5 },
  },
  {
    id: '2',
    type: 'output',
    data: { label: 'output node' },
    position: { x: 450, y: 5 },
  },
  {
    id: '3',
    type: 'output',
    data: { label: 'output node' },
    position: { x: 450, y: 5 },
  },
];

const edges1 = [
  { id: 'e1-2', source: '1', target: '2', animated: true, label: '1', sourceHandle: 'a' },
  { id: 'e1-3', source: '1', target: '3', animated: true, label: '1', sourceHandle: 'b' }]

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(edges1);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  
  const onEdgeUpdate = useCallback(
    (oldEdge, newConnection) => setEdges((els) => updateEdge(oldEdge, newConnection, els)),
    []
  );

  const [nodeId, setNodeId] = useState();
  const [nodeName, setNodeName] = useState();

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          // it's important that you create a new object here
          // in order to notify react flow about the change
          node.data = {
            ...node.data,
            label: nodeName,
          };
        }

        return node;
      })
    );
  }, [nodeName, setNodes]);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  return (
    <ReactFlowProvider>
      <div className={`${styles.dndflow}`}>
        <Sidebar />
        <div className={`${styles.reactflow_wrapper}`} ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onEdgeUpdate={onEdgeUpdate}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
          >
            <MiniMap />
            <Controls />
          </ReactFlow>
        </div>
        <div>
          <input value={nodeId} onChange={(evt) => setNodeId(evt.target.value)} />
          <input value={nodeName} onChange={(evt) => setNodeName(evt.target.value)} />
          {nodes.map((node) => {
            return (
              <div key={node.id}>
                <p>{node.id}</p>
              </div>
            );
          })}
        </div>
      </div>
    </ReactFlowProvider>
  );
};

export default DnDFlow;

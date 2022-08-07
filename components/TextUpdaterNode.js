import { useCallback, useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import styles from "../styles/Home.module.css";

const handleStyle = { left: 50 };

function TextUpdaterNode({ data }) {

    const arr = [];

    const [totalPoint, setTotalPoint] = useState(0)

    if (totalPoint > 1) {
        for (let i = 1; i <= totalPoint; i++) {
            arr.push(i)
        }
    }

    const onChange = useCallback((evt) => {
        console.log(evt.target.value);
    }, []);

    const onPointNumber = useCallback((evt) => {
        setTotalPoint(evt.target.value);
    }, []);

    return (
        <div className={`${styles.textupdaternode}`}>
            <Handle type="target" position={Position.Top} />
            <div className='row'>
                <div className='col-12 pb-1'>
                    <div className="btn-group ps-2">
                        <button type="button" className={`${styles.dropdownbutton} btn btn-outline-dark btn-sm dropdown-toggle`} data-bs-toggle="dropdown" aria-expanded="false">Publisher</button>
                        <ul className="dropdown-menu" >
                            <li><a className="dropdown-item" href="#">Action</a></li>
                            <li><a className="dropdown-item" href="#">Another action</a></li>
                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                            <li><a className="dropdown-item" href="#">Separated link</a></li>
                        </ul>
                    </div>
                </div>
                <div className='col-12'>
                    <input id="text" className={`${styles.textupdaternodeinput}`} name="text" onChange={onChange} />
                    <input id="text" className={`${styles.textupdaternodeinput}`} name="pointNumber" value={totalPoint} onChange={onPointNumber} />
                </div>
            </div>
            <div>
                {arr.map((value, index) => {
                    console.log(index)
                    return (
                        <>
                            <Handle type="source" position={Position.Bottom} id={index} style={handleStyle} />
                        </>
                    )
                })}
            </div>
            <Handle type="source" position={Position.Bottom} id="b" />
        </div>
    );
}

export default TextUpdaterNode;

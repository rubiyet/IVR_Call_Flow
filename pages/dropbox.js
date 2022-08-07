

export default function Dropbox(){
    return(
        <div className="btn-group ps-2">
        <button type="button" className="btn btn-outline-dark btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">Publisher</button>
        <ul className="dropdown-menu" >
          <li><a className="dropdown-item" href="#">Action</a></li>
          <li><a className="dropdown-item" href="#">Another action</a></li>
          <li><a className="dropdown-item" href="#">Something else here</a></li>
          <li><a className="dropdown-item" href="#">Separated link</a></li>
        </ul>
      </div>
    )
}
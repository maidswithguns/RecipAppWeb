import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getProject } from '../../store/actions/projectActions';
import { connect } from "react-redux";
import parse from 'react-html-parser';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';

function ProjectDetails(props) {
    const id = useParams().id;
    const [blog, setBlog] = useState();
    const [del, setDel] = useState(false);
    const [err, setErr] = useState();

    useEffect(() => {
        props.dispatch(getProject(id, props.auth.token)).then((result) => 
        setBlog(result))
    }, [props, id])

    const deleteProject = () => {
        axios.delete('http://localhost:3001/blog', {data: {id: id, token: props.auth.token}})
            .then(() => setDel(true))
            .catch(error => setErr(error.response.data));
    }

    if(del)
        return <Navigate to='/' /> 

    const ulStyle = {
        display: 'flex',
        margin: '12px 0 0 0'
    }

    const listStyle = {
        display: 'flex',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'clip',
        margin: '0 auto',
        fontSize: '14px',
        fontWeight: 'bold'
    }

    if(blog)
    {
    return (
    <div className='container section project-details brown-text' style={{boxShadow: '0 12px 10px rgba(0, 0, 0, 0.2)', padding: '0', marginTop: '12px'}}>
        <div className='card z-depth-0'
        style={{
            backgroundColor: 'rgb(255, 252, 240)',
            borderRadius: '12px',
        }}>
            <div className='card-content'>
            <div className="blogThumb">
                <div className="quadradic-image"
                style={{
                    backgroundImage: `url(${blog.image})`,
                    backgroundPosition: 'center'
                }}></div>
            </div>
            {blog.isOwner ? <button
                className='waves-effect waves-teal btn-flat'
                style={{float: 'right', display: 'inline-block'}}
                onClick={deleteProject}>
                    <DeleteIcon fontSize="large" />
                </button> : null}
            <h1 style={{ marginTop: 0, fontFamily: 'Kalam'}}>{blog.title}</h1>
            {parse(blog.content)}
            <ul style={ulStyle}>
                <li style={listStyle}><VisibilityIcon />{blog.views} views</li>
                <li style={listStyle}><AccessAlarmsIcon />{blog.time} minutes</li>
                <li style={listStyle}><TrackChangesIcon />{blog.difficulty}</li>
            </ul>
            </div>
            <div className='card-action teal lighten-3 white-text'>
                <div>Posted by {blog.authorUsername}</div>
                <div>2nd September, 2am</div>
            </div>
            <div className="red-text center">
                { err ? <p>{err}</p> : null }
            </div>
        </div>
    </div>
    )}
    else {
        <div>
            loading
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(ProjectDetails);

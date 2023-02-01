import React from "react";
import moment from 'moment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';

const ProjectSummary = ({project}) => {
    const date = new Date(project.createdAt._seconds * 1000 + project.createdAt._nanoseconds / 1000000);

    const listStyle = {
        display: 'flex',
        alignItems: 'center',
        padding: '6px 2px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'clip',
        fontWeight: '450'
    }

    const titleStyle = {
        fontSize: '28px', 
        fontFamily: 'Kalam', 
        display: 'inline-block', 
        maxWidth: '100%',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap'
    }

    return (
    <div className="card z-depth-0 brown-text row"
        style={{
            borderRadius: '12px',
            background: 0,
        }}>
            <article className="brown-text row" style={{
                height: '150px',
                }}>
                <div className="col m3 s12 summaryThumb">
                    <div className="quadradic-image"
                    style={{
                        backgroundImage: `url(${project.image})`,
                        backgroundPosition: 'center'
                    }}></div>
                </div>
                <header className="col m7 s12 summaryDescription">
                    <span className="card-title" style={titleStyle}>{project.title}</span>
                    <p>Posted by {project.authorUsername}</p>
                    <p className="grey-text">{moment(date).calendar()}</p>
                </header>
                <div className="col m2 s12 teal lighten-3 white-text summaryIconList">
                    <ul>
                        <li style={listStyle}><VisibilityIcon />{project.views} views</li>
                        <li style={listStyle}><AccessAlarmsIcon />{project.time} minutes</li>
                        <li style={listStyle}><TrackChangesIcon />{project.difficulty}</li>
                    </ul>
                </div>
                <div style={{boxShadow: '0 12px 10px rgba(0, 0, 0, 0.2)', width: '100%', height: '96%'}}></div>
            </article>
        </div>
    )
}

export default ProjectSummary
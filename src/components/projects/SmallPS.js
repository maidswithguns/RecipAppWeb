import React from "react";
import moment from 'moment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';

const SmallPS = ({project}) => {
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
    <div className="card z-depth-0 brown-text row" style={{padding: '2px', borderRadius: '12px', backgroundColor: 'rgb(255, 252, 240)'}}>
                <div className="col s12" style={{height: '150px', padding: '12px'}}>
                    <div className="quadradic-image"
                    style={{
                        backgroundImage: `url(${project.image})`,
                        backgroundPosition: 'center'
                    }}></div>
                </div>
                <header className="col s12 summaryDescription">
                    <span className="card-title" style={titleStyle}>{project.title}</span>
                    <p>Posted by {project.authorUsername}</p>
                    <p className="grey-text">{moment(date).calendar()}</p>
                </header>
                <div style={{boxShadow: '0 12px 10px rgba(0, 0, 0, 0.2)', width: '100%', height: '96%'}}></div>
        </div>
    )
}

export default SmallPS
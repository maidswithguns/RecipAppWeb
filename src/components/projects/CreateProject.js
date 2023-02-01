import React, { useState } from "react"
import { useForm } from "react-hook-form";
import { connect } from "react-redux"
import { createProject, setProjectAuthNull } from "../../store/actions/projectActions";
import 'font-awesome/css/font-awesome.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Navigate } from 'react-router-dom'

function CreateProject(props) {

    const { register, handleSubmit, setValue } = useForm();
    const [error, setError] = useState('');
    const [timeError, setTimeError] = useState('');
    const [link, setLink] = useState('');

    const checkIfLinkIsImage = async (link) => {
        try {
        if(link === '' || link === null)
            return true;
          const response = await fetch(link);
          const contentType = response.headers.get('content-type');
          if (contentType.startsWith('image/')) {
            setError('');
            return true;
          } else {
            setError('Link is not an image');
            return false;
          }
        } catch (error) {
          setError('Invalid Link');
          return false
        }
      };

    const validateTime = async (time) => {
        try {
            if(!time) {
                setTimeError('Invalid Time Number')
                return false;
            }
            if(time <= 0) {
                setTimeError('Time should be above 0')
                return false;
            }
            setTimeError('');
            return true;
        } catch (error) {
            setTimeError('Invalid Time');
            return false
        }
      };

    const onSubmit = async data => {
        if(!await checkIfLinkIsImage(link)) return;
        if(!await validateTime(data.time)) return;
            
        if(props.auth.username && data.content != null && data.difficulty != null)
            props.createProject(data);
    }

    const updateContent = (newValue) => {
        setValue('content', newValue);
    }

    if(props.error === "Success") {
        props.setProjectAuthNull();
        return <Navigate to='/' /> 
    }

    return (
        
        <div className="container brown-text">
            <form onSubmit={handleSubmit(onSubmit)} className="white">
                <h5 className="grey-text text-darken-3">Create Recipe</h5>
                <div className="input-field col s12">
                    <label htmlFor="title">Title *</label>
                    <input
                        type="text"
                        id="title"
                        {...register('title')}
                        required
                        maxLength="40" />
                </div>
                <div className="input-field col s12">
                    <input
                        type="text"
                        id="image"
                        {...register('image')}
                        placeholder="Place the image URL here"
                        onChange={(event) => {setLink(event.target.value); setError('')}}
                        className={error === '' ? "" : "invalid"} />
                    <label htmlFor="image" className={"active " + (error === '' ? "" : "invalid")}>Image Thumbnail URL</label>
                    <span className="helper-text red-text">{error === '' ? null : <p>{error}</p>}</span>
                </div>
                <div className="input-field col s12">
                    <CKEditor
                    editor={ClassicEditor}
                    config={ {
                        toolbar: {items: [
                            'heading', '|',
                            'fontfamily', 'fontsize', '|',
                            'alignment', '|',
                            'fontColor', 'fontBackgroundColor', '|',
                            'bold', 'italic', 'strikethrough', 'underline', 'subscript', 'superscript', '|',
                            'link', '|',
                            'outdent', 'indent', '|',
                            'bulletedList', 'numberedList', 'todoList', '|',
                            'code', 'codeBlock', '|',
                            'insertTable', '|',
                            'undo', 'redo'
                        ],
                        shouldNotGroupWhenFull: true,}
                    } }
                    id="content"
                    className="materialize-textarea"
                    onChange={ ( event, editor ) => updateContent(editor.getData()) } />
                </div>
                <div className="row" style={{margin: 0}}>
                    <div className="input-field col s6">
                        <input
                            type="number"
                            id="time"
                            placeholder="Enter time in minutes"
                            {...register('time')}
                            required
                            onChange={() => setTimeError('')}
                            className={timeError === '' ? "" : "invalid"} />
                        <label htmlFor="time" className="active">Time *</label>
                        <span className="helper-text red-text">{timeError === '' ? null : <p>{timeError}</p>}</span>
                    </div>
                    <div className="input-field col s6">
                        <select style={{display: 'inline'}} {...register('difficulty')}>
                            <option value="Easy" selected>Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                            <option value="Very Hard">Very Hard</option>
                        </select>
                        <label className="active">Difficulty *</label>
                    </div>
                </div>
                <div className="input-field">
                    <button className="btn pink lighten-1 z-depth-0">Create</button>
                </div>
                <div className="red-text center">
                    { props.error ? <p>{props.error}</p> : null }
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        error: state.project.authProject
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createProject: (project) => dispatch(createProject(project)),
        setProjectAuthNull: () => dispatch(setProjectAuthNull())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);
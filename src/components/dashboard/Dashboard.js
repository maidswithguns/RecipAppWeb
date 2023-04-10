import MostViewed from "./MostViewed";
import ProjectList from "../projects/ProjectList";
import { connect } from "react-redux";
import { getProjects } from "../../store/actions/projectActions";
import { useEffect, useState } from "react";

function Dashboard(props) {
    const [projects, setProjects] = useState();
    const [sortedProjects, setSortedProjects] = useState([]);
  
    useEffect(() => {
      props.dispatch(getProjects()).then((result) => {
        setProjects(result);
        setSortedProjects(result.slice().sort((a, b) => b.views - a.views).slice(0, 5));
    });
    }, []);
  
    return (
      <div className="dashboard container">
        {projects == null ? <div className="preloader-wrapper big active" style={{position: 'absolute', left: '50%', top: '50%'}}>
                    <div className="spinner-layer spinner-blue-only">
                    <div className="circle-clipper left">
                        <div className="circle"></div>
                    </div><div className="gap-patch">
                        <div className="circle"></div>
                    </div><div className="circle-clipper right">
                        <div className="circle"></div>
                    </div>
                    </div>
                </div> : null}
        <div className="row">
          <div className="col m8 s12">
            <ProjectList projects={projects} />
          </div>
          <div className="col m3 offset-m1 s12">
            <MostViewed projects={sortedProjects} />
          </div>
        </div>
      </div>
    );
  }
  

  const mapStateToProps = (state) => {
    return {
      // Return the projects state from the Redux store
      projects: state.project.projects,
    };
  };
  

export default connect(mapStateToProps)(Dashboard);

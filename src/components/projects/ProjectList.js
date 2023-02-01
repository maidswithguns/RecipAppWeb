import { Link } from "react-router-dom"
import ProjectSummary from "./ProjectSummary"

const ProjectList = ({projects}) => {
    return (
        <div className="section">
            {projects && projects.map((project) => (
                <Link to={'/blog/' + project.id} key={project.id}>
                    <ProjectSummary project={project} />
                </Link>
            ))}
        </div>
    )
}

export default ProjectList
import { Link } from "react-router-dom"
import ProjectSummary from "../projects/ProjectSummary"
import SmallPS from "../projects/SmallPS"

const MostViewed = ({projects}) => {
    return (
        <div className="section">
            <h4 className="brown-text" style={{textAlign: 'center', fontFamily: 'Kalam'}}>Most Viewed</h4>
            {projects && projects.map((project) => (
                <Link to={'/blog/' + project.id} key={project.id}>
                    <SmallPS project={project} />
                </Link>
            ))}
        </div>
    )
}

export default MostViewed
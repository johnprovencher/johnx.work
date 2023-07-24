import { useParams } from "react-router-dom"
import Page from "components/Page"
import ProjectDetails from "components/ProjectDetails"
import Header from "components/Header"
import useProject from "hooks/useProject"
import JohnBox from "components/Johnx/JohnBox"

const ProjectPage = () => {
    const { contractAddress, projectId } = useParams()
    const { loading, error, data } = useProject(`${contractAddress}-${projectId}`)
    const project = data?.project

    return (
        <Page>
            {
                contractAddress && projectId && !loading && !error && (
                    <>
                        <Header transparent={true}>
                            <JohnBox> 
                                { project.name }
                            </JohnBox>
                        </Header>
                        <ProjectDetails contractAddress={contractAddress} id={projectId}/>
                    </>
                )
            }
        </Page>
    )
}

export default ProjectPage

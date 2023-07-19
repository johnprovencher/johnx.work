import { Box, Alert } from "@mui/material"
import { Project } from "utils/types"
import ProjectPreview from "components/ProjectPreview"
import Loading from "components/Loading"
import useProjects from "hooks/useProjects"

const Projects = () => {
    const { loading, error, data } = useProjects()

    return (
        <Box sx={{maxWidth:'1400px'}}>
            {
                loading ?
                    (
                        <Box marginTop={10}>
                            <Loading/>
                        </Box>
                    ) 
                    :
                    error ?
                        (
                            <Box marginTop={10}>
                                <Alert severity="error">
                                        Error loading projects
                                </Alert>
                            </Box>
                        ) 
                        :
                        data?.projects?.length > 0 ?
                            (
                                <Box sx={{ display: 'grid', position: 'relative', gridGap: '2em', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))'}}>
                                    {
                                        data?.projects && (
                                            data.projects.map((project: Project) => (
                                                <ProjectPreview
                                                    project={project}
                                                    showDescription
                                                />
                                            ))
                                        )
                                    }
                                    {
                                        data?.projects && (
                                            data.projects.map((project: Project) => (
                                                <ProjectPreview
                                                    project={project}
                                                    showDescription
                                                />
                                            ))
                                        )
                                    }
                                    {
                                        data?.projects && (
                                            data.projects.map((project: Project) => (
                                                <ProjectPreview
                                                    project={project}
                                                    showDescription
                                                />
                                            ))
                                        )
                                    }
                                    {
                                        data?.projects && (
                                            data.projects.map((project: Project) => (
                                                <ProjectPreview
                                                    project={project}
                                                    showDescription
                                                />
                                            ))
                                        )
                                    }
                                    {
                                        data?.projects && (
                                            data.projects.map((project: Project) => (
                                                <ProjectPreview
                                                    project={project}
                                                    showDescription
                                                />
                                            ))
                                        )
                                    }
                                    {
                                        data?.projects && (
                                            data.projects.map((project: Project) => (
                                                <ProjectPreview
                                                    project={project}
                                                    showDescription
                                                />
                                            ))
                                        )
                                    }
                                </Box>
                            ) 
                            :
                            data?.projects?.length === 0 ? 
                                (
                                    <Box marginTop={10}>
                                        <Alert severity="info">
                                                No projects found
                                        </Alert>
                                    </Box>
                                )
                                :
                                null
            }
        </Box>
    )
}

export default Projects

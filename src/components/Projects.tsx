import {
    Box,
    Alert,
    Grid
} from "@mui/material"
import useTheme from "@mui/material/styles/useTheme"
import { Project } from "utils/types"
import ProjectPreview from "components/ProjectPreview"
import Loading from "components/Loading"
import useProjects from "hooks/useProjects"
import useWindowSize from "hooks/useWindowSize"

const Projects = () => {
    const theme = useTheme()
    const windowSize = useWindowSize()
    const { loading, error, data } = useProjects()
    let width = 280
    const maxColumns = 2
    if (windowSize && !isNaN(windowSize.width)) {
        width = windowSize.width > theme.breakpoints.values.md
            ? (Math.min(windowSize.width, 1200)- 96)/maxColumns
            : windowSize.width > theme.breakpoints.values.sm
                ? windowSize.width - 64
                : windowSize.width - 48
    }

    return (
        <Box>
            <Box>
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
                                    <Grid container spacing={3} sx={{margin: "32px 0"}}>
                                        {
                                            data?.projects && (
                                                data.projects.map((project: Project) => (
                                                    <Grid item md={6} key={project.id}>
                                                        <ProjectPreview
                                                            project={project}
                                                            width={width}
                                                            showDescription
                                                        />
                                                    </Grid>
                                                ))
                                            )
                                        }
                                    </Grid>
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
        </Box>
    )
}

export default Projects

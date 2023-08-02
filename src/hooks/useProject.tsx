import { useQuery, gql } from "@apollo/client"

const projectQuery = (id: string) => `
  query GetProject {
    project(
      id: "${id.toLowerCase()}"
    ) {
      id
      contract {
        id
      }
      projectId
      name
      description
      license
      locked
      pricePerTokenInWei
      active
      paused
      complete
      artistName
      artistAddress
      invocations
      maxInvocations
      scriptJSON
      scriptTypeAndVersion
      aspectRatio
      currencyAddress
      currencySymbol
      createdAt
      activatedAt
      tokens {
        id
        tokenId
        invocation
      }
    }
  }`

const useProject = (id: string) => {

    const { loading, error, data, refetch } = useQuery(gql(projectQuery(id)))

    return {
        loading,
        error,
        data,
        refetch
    }
}

export default useProject

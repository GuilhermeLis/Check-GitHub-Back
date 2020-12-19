import axios from 'axios'

export const graphQlCall = async (query, variables = {}) => {
  const response = axios.post(
    'https://api.github.com/graphql',
    JSON.stringify({ query, variables }),
    {
      headers: {
        Authorization: `Bearer `,
      },
    }
  )

  return response
}

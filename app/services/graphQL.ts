import axios from 'axios'

export const graphQlCall = async (query, variables = {}) => {
  const response = axios.post(
    'https://api.github.com/graphql',
    JSON.stringify({ query, variables }),
    {
      headers: {
        Authorization: 'Bearer 14ce5425bb5e4dad590086f8456fd9f2c2782720',
      },
    }
  )

  return response
}

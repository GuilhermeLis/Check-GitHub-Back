import { graphQlCall } from './graphQL'
import { DateTime } from 'luxon'
import Developer from 'App/Models/Developer'
import Cursor from 'App/Models/Cursor'

type nodesItem = {
  oid: string
  messageHeadline: string
  author: {
    user: {
      login: string
    }
  }
  committedDate: string
  additions: number
  deletions: number
}

export async function getFirstCharge(after?: string) {
  const defaultCondition = `first: 100`
  const condition = after ? `after: "${after}"` : defaultCondition
  const query = ` query {
  repository(name:"linux" owner:"torvalds"){
    name
    defaultBranchRef {
      id
    }
    object(expression: "master") {
      ... on Commit {
        oid
        history(${condition}, since: "2020-01-01T00:00:00Z") {
          totalCount
          nodes {
            oid
            messageHeadline
            author {
              user {
                login
              }
            }
            committedDate
            additions
            deletions
          }
           pageInfo {
            endCursor
          }
        }
      }
    }
  }
} `
  const { data } = await graphQlCall(query)
  console.log(data)
  const { repository } = data.data
  const { object } = repository
  const { history } = object
  const { nodes, pageInfo } = history
  const { endCursor } = pageInfo

  if (nodes.length !== 0) {
    nodes.forEach(async (item: nodesItem) => {
      Developer.create({
        oid: item.oid,
        messageHeadline: item.messageHeadline,
        author: item.author.user ? item.author.user.login : null,
        committedDate: DateTime.fromISO(item.committedDate),
        additions: item.additions,
        removals: item.deletions,
      })
    })

    Cursor.create({
      cursor: endCursor,
    })
    getFirstCharge(endCursor)
  }
}

import { DateTime } from 'luxon'
import Database from '@ioc:Adonis/Lucid/Database'

import Developer from 'App/Models/Developer'
import Cursor from 'App/Models/Cursor'

import { graphQlCall } from './graphQL'

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
  const { repository } = data.data
  const { object } = repository
  const { history } = object
  const { nodes, pageInfo } = history
  const { endCursor } = pageInfo

  console.log(endCursor, '\n')
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

    getFirstCharge(endCursor).finally(() => {
      const dados = endCursor.split(' ')
      console.log(dados[1], 'finalizada')
    })
    console.log('terminou')
    return
  }
}

export function getAll() {
  var run = true
  Database.query()
    .select('cursor')
    .from('cursors')
    .orderBy('id', 'desc')
    .limit(1)
    .then((value) => {
      const { cursor } = value[0]
      getFirstCharge(cursor)
        .then((result) => (run = result))
        .catch((Error) => console.log(Error))
    })
}

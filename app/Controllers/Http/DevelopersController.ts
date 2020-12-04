// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { rankingByAuthor, rankingByAddintions, rankingByRemovals } from '../../services/developer'

export default class DevelopersController {
  public async rankingAuthor() {
    return await rankingByAuthor()
  }

  public async rankingAuthorByAddintions() {
    return await rankingByAddintions()
  }

  public async rankingAuthorByRemovals() {
    return await rankingByRemovals()
  }
}

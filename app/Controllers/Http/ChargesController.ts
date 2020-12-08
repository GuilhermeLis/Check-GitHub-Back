// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { getFirstCharge } from '../../services/charge'

export default class ChargesController {
  public async index() {
    getFirstCharge().finally(() => console.log('primeira finalizada'))
  }
}

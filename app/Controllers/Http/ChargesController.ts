// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { getFirstCharge } from '../../services/charge'

export default class ChargesController {
  public async index() {
    getFirstCharge('bbe2ba04c5a92a49db8a42c850a5a2f6481e47eb 16599').finally(() =>
      console.log('primeira finalizada')
    )
  }
}

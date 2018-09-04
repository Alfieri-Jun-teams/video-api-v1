class UserService {
  async index (params) {
    // console.log('-------->', params)
    return 'Hello'
  }
  async create (params) {
    // console.log('-------->', params)
    return 'world'
  }
  async show (params) {
    // console.log('-------->', params)
    return 'Hello'
  }
  async update (params) {
    // console.log('-------->', params)
    return 'world'
  }
  async destroy (params) {
    // console.log('-------->', params)
    return 'Hello'
  }
}

const user = new UserService()
module.exports = user

import Usuario from '#models/usuario'

export default class UsuarioService {
  
  static async listarUsuarios() {
    return Usuario.all()
  }

  static async buscarUsuario(id: number) {
    return await Usuario.findOrFail(id)
  }

  static async criarUsuario(payload: any) {
    return await Usuario.create(payload)
  }

  static async atualizarUsuario(id: number, payload: any) {
    const usuario = await Usuario.findOrFail(id)
    usuario.merge(payload)
    await usuario.save()
    return usuario
  }

  static async deletarUsuario(id: number) {
    const usuario = await Usuario.findOrFail(id)
    await usuario.delete()
    return usuario
  }

  static async buscarPorEmail(email: string) {
    return await Usuario.query().where('email', email).first()
  }
}

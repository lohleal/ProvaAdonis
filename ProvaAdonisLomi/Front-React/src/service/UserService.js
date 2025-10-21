// Função para obter o usuário do localStorage
const getDataUser = () => {
  const data = localStorage.getItem('data_user')
  if(data) return JSON.parse(data)
  return data
}

const setDataUser = (user) => {
  localStorage.setItem('data_user', JSON.stringify(user))
}

const removeDataUser = () => {
  localStorage.removeItem('data_user')
}

export { getDataUser, setDataUser, removeDataUser }
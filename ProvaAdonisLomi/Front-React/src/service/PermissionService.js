// Função para obter as permissões do localStorage
const getPermissions = () => {
  const data = localStorage.getItem('permissions')
  if(data) return JSON.parse(data)
  return data
}

const setPermissions = (perm) => {
  localStorage.setItem('permissions', JSON.stringify({ ...perm }))
}

const removePermissions = () => {
  localStorage.removeItem('permissions')
}

export { getPermissions, setPermissions, removePermissions }
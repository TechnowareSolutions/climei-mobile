import api from '../../services/api'

async function getUserDataByToken(token) {
  try {
    const request = await api.get('/usuario', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    // console.log(request.data)
    return request.data
  } catch (error) {
    console.log(error)
    return null
  }
}

async function getHeightAndWeight(id, token) {
  try {
    const request = await api.get(`/dadosUsuario?usuario=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    // console.log(request.data._embedded.entityModelList)
    return request.data._embedded.entityModelList
  } catch (error) {
    console.log(error)
    return null
  }
}

async function setHeightAndWeight(token, id, height, weight) {
  try {
    const request = await api.post(
      '/dadosUsuario',
      {
        usuario: {
          id: id
        },
        altura: height,
        peso: weight
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    // console.log(request.data)
    return request.data
  } catch (error) {
    console.log(error)
    return null
  }
}

async function getLogTemperatura(id, token) {
  try {
    const request = await api.get(`/logTemperatura?usuario=${id}&size=1`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    // console.log(request.data._embedded.entityModelList[0])
    return request.data._embedded.entityModelList[0]
  } catch (error) {
    console.log(error)
    return null
  }
}

async function getLogUmidade(id, token) {
  try {
    const request = await api.get(`/logUmidade?usuario=${id}&size=1`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    // console.log(request.data._embedded.entityModelList[0])
    return request.data._embedded.entityModelList[0]
  } catch (error) {
    console.log(error)
    return null
  }
}

async function getLogBatimento(id, token) {
  try {
    const request = await api.get(
      `/logBatimentoOxigenacao?usuario=${id}&size=1`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    // console.log(request.data._embedded.entityModelList[0])
    return request.data._embedded.entityModelList[0]
  } catch (error) {
    console.log(error)
    return null
  }
}

async function getLogAgua(id, token) {
  try {
    const request = await api.get(`/logAgua?usuario=${id}&size=1`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    // console.log(request.data._embedded.entityModelList[0])
    return request.data._embedded.entityModelList[0]
  } catch (error) {
    console.log(error)
    return null
  }
}

async function setLogAgua(id, token, waterQuantity, date) {
  try {
    const obj = {
      dataAvaliacao: date,
      quantidade: waterQuantity,
      usuario: {
        id: id
      }
    }
    // console.log(obj)
    const request = await api.post(`/logAgua`, obj, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    // console.log(request.data)
    // return request.data
  } catch (error) {
    console.log(error)
    return null
  }
}

async function LoginRequest(email, senha) {
  try {
    const request = await api.post('/usuario/login', {
      email,
      senha
    })
    return request.data
  } catch (error) {
    console.log(error)
    return null
  }
}

async function SignUpRequest(obj) {
  try {
    await api.post('/usuario/signup', obj)
  } catch (error) {
    console.log(error)
    return null
  }
}

async function DeleteUser(id, token) {
  try {
    const request = await api.delete(`/usuario`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    console.log('Excluido')
    // console.log(request.data)
    return request.data
  } catch (error) {
    console.log(error)
    return null
  }
}

async function EditUser(
  token,
  userId,
  password,
  userDataId,
  obj,
  height,
  weight
) {
  try {
    const requestUser = await api.put(
      '/usuario',
      { senha: password, ...obj },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    // console.log(requestUser.data)

    const requestUserData = await api.put(
      `/dadosUsuario/${userDataId}`,
      {
        usuario: {
          id: userId
        },
        altura: height,
        peso: weight
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    // console.log(requestUserData.data)
  } catch (error) {
    console.log(error)
    return null
  }
}

export {
  getUserDataByToken,
  getHeightAndWeight,
  setHeightAndWeight,
  getLogTemperatura,
  getLogUmidade,
  getLogBatimento,
  getLogAgua,
  setLogAgua,
  LoginRequest,
  SignUpRequest,
  DeleteUser,
  EditUser
}

const API = 'http://192.168.1.102:4000/Mostrar'

export const Api = async() => {
    const res = await fetch(API)
    return await res.json()
}
 
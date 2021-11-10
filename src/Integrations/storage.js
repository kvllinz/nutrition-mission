const getWithExpiry=(key)=>{
    const itemStr= sessionStorage.getItem(key);
    if(!itemStr){
      return null;
    }
}

const setWithExpiry =(key)=>{
    sessionStorage.setItem(key)
}

class SessionStorageProvider {
    getSessionToken() {
        const token = 'response';
        console.log(token)
        return token
    }
    setSessionToken(token){
        setWithExpiry('response', token)
    }
}

export default new SessionStorageProvider();
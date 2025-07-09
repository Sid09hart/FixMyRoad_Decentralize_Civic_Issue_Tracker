export const setToken = (token:string)=>{
    localStorage.setItem("fixmyroad_token",token);
}

export const getToken = ()=>{
    return localStorage.getItem("fixmyroad_token");
}

export const removeToken = () => {
  localStorage.removeItem("fixmyroad_token");
    localStorage.removeItem("token");  // If there's another token you want to clear
  localStorage.clear();

};

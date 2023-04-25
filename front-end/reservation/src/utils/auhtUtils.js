export const isAdmin = (authData)=>{
    if(!authData || authData.loggedIn !== true){
        return false;
    }
    return authData.authorities.includes("ADMIN");
}
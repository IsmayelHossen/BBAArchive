import Cookies from "js-cookie";

export const useAuth=()=>{
    const cookieValue = Cookies.get('myCookie');
  
    if(cookieValue){
      
        return true
    }
    else{
       
        return false
    }
   

}
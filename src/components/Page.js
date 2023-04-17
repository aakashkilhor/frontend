import { useState } from "react";
import axios from "axios";

const Page = ()=>{
 const [name, setName] = useState("")
    axios
    .get("http://localhost:3000/dashboard", {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        setName(response.data);
        console.log(response.data)})
    return(
        <h1>{name}</h1>
    )
}
export default Page;
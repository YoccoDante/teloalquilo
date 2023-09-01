import { useState } from "react"

function useFilterStars(  ) {
    const [ stars, setStars ] = useState(0)
    const ChangeStars = (event:any, newvalue:number|null) => {
        if(newvalue){
            setStars(newvalue)
        }
    }
    const ClearStars = () => {
        setStars(0)
    }
  return {stars, ChangeStars, ClearStars}
}

export default useFilterStars
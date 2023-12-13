import { useState } from "react"

function useFilterStars(  ) {
    const [ stars, setStars ] = useState(0)
    const [ nameFilter, setNameFilter ] = useState<string|null>(null)
    const ChangeStars = (event:any, newvalue:number|null) => {
        if(newvalue){
            setStars(newvalue)
        }
    }
    const ClearStars = () => {
        setStars(0)
        setNameFilter('')
        const inputElement = document.querySelector('.NameFilter') as HTMLInputElement
        if (inputElement){
            inputElement.value = ''
        }
    }
  return {stars, ChangeStars, ClearStars, setNameFilter}
}

export default useFilterStars
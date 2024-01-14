import React, { useState } from 'react'
import { Select, MenuItem } from '@mui/material'

interface GenderMenuProps {
  setGender:React.Dispatch<React.SetStateAction<string>>,
}

function GenderMenu({setGender}:GenderMenuProps) {
  const genderOptions = ["Masculino", "Femenino", "Prefiero no decirlo","Seleccionar"]
  const [selectedGender, setSelectedGender] = useState('Seleccionar')
  const handleSetGender = (option:string) => {
    switch (option){
      case genderOptions[0]:
        setSelectedGender(genderOptions[0])
        setGender('male')
        break
      case genderOptions[1]:
        setSelectedGender(genderOptions[1])
        setGender('female')
        break
      case genderOptions[2]:
        setSelectedGender(genderOptions[2])
        setGender('other')
        break
      case genderOptions[3]:
        setSelectedGender(genderOptions[2])
        setGender('other')
        break
    }
  }
  return (
    <>
    <Select
        value={selectedGender === 'Seleccionar'? 'Prefiero no decirlo' : selectedGender}
        onChange={(event) => handleSetGender(event.target.value)}
        >
        {genderOptions.map((option) => (
          <MenuItem key={option} value={option}>{option}</MenuItem>
        ))}
    </Select>
    </>
  )
}

export default GenderMenu
// import React, { useEffect } from 'react'
// import { useState } from 'react'
// import { Select, MenuItem } from '@mui/material'

// interface GenderMenuProps {
//   setGender:React.Dispatch<React.SetStateAction<string>>,
//   gender:string
// }

// function GenderMenu({setGender, gender}:GenderMenuProps) {
//   const genderOptions = ["Masculino", "Femenino", "Prefiero no decirlo"]
//   const handleSetGender = (option:string) => {
//     switch (option){
//       case genderOptions[0]:
//         setGender('male')
//         break
//       case genderOptions[1]:
//         setGender('female')
//         break
//       case genderOptions[2]:
//         setGender('other')
//         break
//     }
//   }
//   useEffect(() => {
//     setGender('Seleccionar Género')
//   },[])
//   return (
//     <>
//     <Select
//         value={gender}
//         onChange={(event) => handleSetGender(event.target.value)}
//         >
//         {genderOptions.map((option) => (
//           <MenuItem key={option} value={option}>{option}</MenuItem>
//         ))}
//     </Select>
//     </>
//   )
// }

// export default GenderMenu
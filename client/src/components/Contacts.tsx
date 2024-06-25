import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { UserContext } from "../context/UserContext"
import type { ContactData } from "../types"

const Contacts = () => {
  const [ userData ] = useContext(UserContext)
  const [ contacts, setContacts ] = useState([])

  useEffect(() => {
    const getContacts = async () => {
      try {
        const { data } = await axios.get(`/api/contacts/${userData.id}`)
        setContacts(data)
      } catch (error) {
        console.log(error)
      }
    }

    if (userData.id) getContacts()
  }, [userData])

  return contacts.length ? (
    <ul>
      {contacts.map(({ id, name, label }: ContactData ) => (
        <li key={id}>
          <div>{name}</div>
          <div>{label}</div>
        </li>
      ))}
    </ul>
  ) : (
    <div>No Contacts Found</div>
  )
}

export default Contacts
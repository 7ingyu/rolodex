import { useContext, useState } from "react"
import type { Dispatch, SetStateAction } from "react"
import axios from "axios"
import { UserContext } from "../context/UserContext"
import type { ContactData } from "../types"

type ContactsFormProps = {
  contacts: ContactData[],
  setContacts: Dispatch<SetStateAction<ContactData[]>>
}

const ContactsForm = ({ contacts, setContacts } : ContactsFormProps) => {
  const [ userData ] = useContext(UserContext)
  const [ info, setInfo ] = useState({
    name: '',
    label: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(`/api/contacts/`, {...info, user_id: userData.id})
      setContacts([...contacts, data])
      setInfo({
        name: '',
        label: ''
      })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
          <div>
            <label className="form-label" htmlFor="reg-name">
              Name
            </label>
            <input
              className="form-control"
              id="reg-name"
              name="name"
              type="name"
              value={info.name}
              onChange={(e) =>
                setInfo({ ...info, name: e.target.value })
              }
              required
            />
          </div>
          <div className="mt-3">
            <label className="form-label" htmlFor="reg-label">
              label
            </label>
            <input
              className="form-control"
              id="reg-label"
              name="label"
              type="label"
              value={info.label}
              onChange={(e) =>
                setInfo({ ...info, label: e.target.value })
              }
              required
            />
          </div>
          <button className="btn btn-primary mt-3">Add Contact</button>
        </form>
  )
}

export default ContactsForm
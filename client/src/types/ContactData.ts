type Info = {
  type: string
  value: string
}

type ContactData = {
  id: number
  name: string
  label: string
  info: Info[]
}

export default ContactData
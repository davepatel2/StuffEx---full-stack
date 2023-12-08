import { useEffect, useState } from 'react'
import Item from '../Item'
import Authentication from '../authentication/Authentication'

function HomePage({ items, populateItems }) {
  const [username, setUsername] = useState('')

  const checkUsername = () => {
    if (Authentication.isLoggedIn()) {
      const { username: sessionUsername } =
        Authentication.getSessionCredentials()
      setUsername(sessionUsername)
    }
  }

  useEffect(() => {
    checkUsername()
  }, [])

  const greetingHeader = username ? (
    <h1 style={{ textAlign: 'center' }}>Hey there, {username}</h1>
  ) : (
    <></>
  )

  return (
    <>
      {greetingHeader}
      <Item itemData={items} updateItems={populateItems} />
    </>
  )
}

export default HomePage

import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import UserApi from '../../utils/api/UserApi'
import type { User } from '../../types'
import Container from '../base/Container'

function IsLoggedIn(WrappedComponent: React.ComponentType<any>) {
  const AuthWrapper = (props: any) => {
    const router = useRouter()
    const [user, setUser] = useState<User | null | undefined>(undefined)

    useEffect(() => {
      const userApi = new UserApi()

      userApi.fetchUser(false).then((user) => {
        setUser(user)
      })
    }, [])

    if (user === undefined) {
      return (
        <Container className="flex flex-col items-center justify-center gap-6">
          <p>Fetching user data...</p>
          <FontAwesomeIcon icon={faSpinner} className="h-8 w-8 animate-spin" />
        </Container>
      )
    }

    if (user === null) {
      router.push('/admin/login')
      return null
    }

    return <WrappedComponent {...props} user={user} />
  }

  return AuthWrapper
}

export default IsLoggedIn

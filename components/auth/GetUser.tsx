import React, { useEffect, useState } from 'react'
import UserApi from '../../utils/api/UserApi'
import type { User } from '../../types'

export interface GetUserProps {
  user: User | null
}

function GetUser(WrappedComponent: React.ComponentType<any>) {
  const AuthWrapper = (props: any) => {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
      const userApi = new UserApi()

      userApi.fetchUser(false).then((user) => {
        setUser(user)
      })
    }, [])

    return <WrappedComponent {...props} user={user} />
  }

  return AuthWrapper
}

export default GetUser

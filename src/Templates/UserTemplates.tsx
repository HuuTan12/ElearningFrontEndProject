
import { Outlet } from 'react-router-dom'

const UserTemplate = () => {
  return (
    <div style={{ minHeight: '100vh' }}>
      <Outlet />
    </div>
  )
}

export default UserTemplate
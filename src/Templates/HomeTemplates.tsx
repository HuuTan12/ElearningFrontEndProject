
import HeaderHomePage from '../components/HeaderHomePage'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
const HomeTemplates = () => {
  return (
    <div className="home-page">
        <HeaderHomePage/>
        <div className="home-content">
            <Outlet />
        </div>
        <Footer />
    </div>
  )
}

export default HomeTemplates
import { Route, Routes } from 'react-router-dom'
import ManageUser from './ManageUser'
import AddPackage from './AddPackage'
import Bookings from './Bookings'
import Main from './Main'
import ManageTourPackages from './ManageTourPackages'
import ManageContact from './ManageContact'
const AdminRoutes = () => {
  return (
    <>
    <Main/>
    <Routes>
        <Route path='/main/manageUser' element={<ManageUser/>}></Route>
        <Route path='/main/addPackages' element={<AddPackage/>}></Route>
        <Route path='/main/bookings' element={<Bookings/>}></Route>
        <Route path="/main/managePackgaes" element={<ManageTourPackages/>}></Route>
        <Route path="/main/managecontacts" element={<ManageContact/>}></Route>
    </Routes>
    </>
  )
}
export default AdminRoutes
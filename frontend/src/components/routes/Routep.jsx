import { Routes, Route } from "react-router-dom";
import Home from "../Home/Home";
import About from "../about/About";
// import Destinations from "../destinations/Destinations";
import ContactUs from "../contact/ContactUs";
import MasterPage from "../masterpage/MasterPage";
import Loginp from "../login/Loginp";
import TourPackage from "../tourpackages/TourPackage";
import Registration from "../registration/Registration";
import ViewDetails from "../viewDetails/ViewDetails";
import ManageUser from "../adminPannel/ManageUser";
import AddPackage from "../adminPannel/AddPackage";
import Bookings from "../adminPannel/Bookings";
import Dashboard from "../adminPannel/Dashboard";
import ManageTourPackages from "../adminPannel/ManageTourPackages";
import ManageContact from "../adminPannel/ManageContact";

const RoutesP = () => {
  const auth = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  console.log(role);
  return (
    <>
      
      <Routes>
        {
          <>
            {" "}
            <Route
              path="/"
              element={
                <MasterPage>
                  <Home />
                </MasterPage>
              }
            ></Route>
            <Route
              path="/about"
              element={
                <MasterPage>
                  <About />
                </MasterPage>
              }
            ></Route>
            {/* {
              <Route
                path="/destination"
                element={
                  <MasterPage>
                    <Destinations />
                  </MasterPage>
                }
              ></Route>
            } */}
            {
              <Route
                path="/tourpackages"
                element={
                  <MasterPage>
                    <TourPackage />
                  </MasterPage>
                }
              ></Route>
            }
            <Route
              path="/contact"
              element={
                <MasterPage>
                  <ContactUs />
                </MasterPage>
              }
            ></Route>
          </>
        }

        {auth ? (
          <Route
            path="/"
            element={
              <MasterPage>
                <Home />
              </MasterPage>
            }
          />
        ) : (
          <Route
            path="/login"
            element={
              <MasterPage>
                <Loginp />
              </MasterPage>
            }
          />
        )}

        <Route path="/login" element={<Loginp />} />
        <Route
          path="/registration"
          element={
            <MasterPage>
              <Registration />
            </MasterPage>
          }
        ></Route>

        {auth && role === "admin" ? (
          <Route path="/main/manageUser" element={<ManageUser />}></Route>
        ) : (
          <Route
            path="/viewDetails"
            element={
              <MasterPage>
                <ViewDetails />
              </MasterPage>
            }
          ></Route>
        )}
        <Route path='/main/manageUser' element={<ManageUser/>}></Route>
        <Route path='/main/addPackages' element={<AddPackage/>}></Route>
        <Route path='/main/bookings' element={<Bookings/>}></Route>
        <Route path='/main/dashboard' element={<Dashboard/>}></Route>
        <Route path="/main/managePackgaes" element={<ManageTourPackages/>}></Route>
        <Route path="/main/managecontacts" element={<ManageContact/>}></Route>

      </Routes>
        {/* {userRole === 'admin' ? <Bookings /> : <ViewDetails userId={userId} />} */}
      {/* <Routes></Routes> */}
      
      
    </>
  );
};

export default RoutesP;

// import Footerp from "../footer/Footerp"
import FooterDown from "../footer/FooterDown"
import Header from "../header/Header"
import UpHeader from "../upperHeader/UpHeader"

const MasterPage = ({children}) => {
    
  return (
    <>
    <UpHeader/>
      <Header/>
      <div>{children}</div>
      <FooterDown/>
    </>
  )
}

export default MasterPage

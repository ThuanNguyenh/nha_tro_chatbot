import Header from "~/components/Layout/components/Header/header";
import Sidebar from "./SideBar";

function DefaultLayout({children}) {
    return ( 
        <div className="box bg-light">
            <Header />
            <div className="border d-flex bg-light" style={{paddingTop: "60px"}}>
                <Sidebar />
                <div className="content col-10 border"
                style={{marginLeft: 'auto',}}
                >
                {children}</div>
            </div>
           
        </div>
       
     );
}

export default DefaultLayout;
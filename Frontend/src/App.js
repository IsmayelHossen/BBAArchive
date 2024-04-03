import "./App.css";

import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/initialpage/Sidebar/Header";
import Sidebar from "./components/initialpage/Sidebar/sidebar";
import Dashboard from "./components/MainPage//BBA_Documents/Dashboard";
import Create_Document from "./components/MainPage/BBA_Documents/Create_Document";
import ViewDocuments from "./components/MainPage/BBA_Documents/ViewDocuments";
import DocumentList from "./components/MainPage/BBA_Documents/DocumentList";
import PdfView from "./components/MainPage/BBA_Documents/PdfView";
import documents_Category from "./components/MainPage/BBA_Documents/Docs_Category";
import Docs_Category from "./components/MainPage/BBA_Documents/Docs_Category";
import Create_Document1 from "./components/MainPage/BBA_Documents/Create_Document1";
import Login from "./components/MainPage/BBA_Documents/Signupin/Login";
import PrivateRoute from "./components/MainPage/BBA_Documents/Auth/PrivateRoute";
import { useAuth } from "./components/MainPage/BBA_Documents/Hooks/useAuth";
import Registration from "./components/MainPage/BBA_Documents/Signupin/Registration";
import Verify from "./components/MainPage/BBA_Documents/Signupin/Verify";
import LoginTrack from "./components/MainPage/BBA_Documents/LoginTrack";
import Footer from "./components/initialpage/Footer";
import TotalView from "./components/MainPage/BBA_Documents/TotalView";
import ReportPage from "./components/MainPage/BBA_Documents/ReportPage";
import PublicDashboard from "./components/MainPage/BBA_Documents/Publiccomponent/PublicDashboard";
import UsersShow from "./components/MainPage/BBA_Documents/UsersShow";
import ReadDownload from "./components/MainPage/BBA_Documents/ReadDownload";
import PublicDocumentList from "./components/MainPage/BBA_Documents/Publiccomponent/PublicDocumentList";
import PublicPdfView from "./components/MainPage/BBA_Documents/Publiccomponent/PublicPdfView";



function App() {

  const loginStatus=useAuth();
  const userDataString = localStorage.getItem('userData');
  const userData = JSON.parse(userDataString);
  return (
    <div className="App">
      <BrowserRouter>
      {loginStatus &&
      <>
       <Header />
        <Sidebar />
      </>
    
     }
       
        <Routes>
           {/* document start */}
           <Route path="/docs/*" element={<PrivateRoute />} >
           

                 
             {userData?.usertype=='private' && userData?.user_rule=='Admin' && <>
             <Route path="" element={<Dashboard />} />

                <Route path="add" element={<Create_Document1 />} />
                <Route
                  path="type_wise_view/:type"
                  element={<Create_Document />}
                />
                <Route path="category/add" element={<Docs_Category />} />

              
                <Route path="loger" element={<LoginTrack />} />
                <Route path="visitsinfo" element={<TotalView />} />
                <Route
                  path="ViewDocuments/:id/:document_id/:category"
                  element={<ViewDocuments />}
                />
                <Route
                  path="pdfview/:name/:recordId"
                  element={<PdfView />}
                />
                 <Route
                  path="readdownload/:type"
                  element={<ReadDownload />}
                />
               
               <Route path="list" element={<DocumentList />} />
                <Route path="report" element={<ReportPage />} />
                <Route path="usershow" element={<UsersShow/>} />
                
             </>}
             {userData?.usertype=='private' && userData?.user_rule=='All' && <>
             <Route path="" element={<Dashboard />} />

                <Route path="add" element={<Create_Document1 />} />
                <Route
                  path="type_wise_view/:type"
                  element={<Create_Document />}
                />
                <Route path="category/add" element={<Docs_Category />} />

                <Route path="list" element={<DocumentList />} />
               
                <Route
                  path="ViewDocuments/:id/:document_id/:category"
                  element={<ViewDocuments />}
                />
                <Route
                  path="pdfview/:name/:recordId"
                  element={<PdfView />}
                />
                 <Route
                  path="readdownload/:type"
                  element={<ReadDownload />}
                />
               
               
                
             </>}
                   {/* public and read access authorization routes */}
             {userData?.usertype=='public' && userData?.user_rule=='Reader' && <>
             <Route path="" element={<Dashboard />} />
             <Route
                  path="ViewDocuments/:id/:document_id/:category"
                  element={<ViewDocuments />}
                />
                <Route
                  path="pdfview/:name/:recordId"
                  element={<PdfView />}
                />
                <Route path="list" element={<DocumentList />} />
             </>}
                </Route>
                {!loginStatus &&
                <>
                 <Route path="*" element={<PublicDashboard />} />
                 <Route path="/docs/list" element={<PublicDocumentList />} />
                 <Route path="/docs/reader/:name/:recordId" element={<PublicPdfView />} />
                 <Route path="/login" element={<Login />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/verify" element={<Verify />} />
                </>
               
                
                }
                {/* end documents */}
          
         
        </Routes>
        {loginStatus &&
      <>
       
        <Footer />
      </>
    
     }
      </BrowserRouter>
    </div>
  );
}

export default App;

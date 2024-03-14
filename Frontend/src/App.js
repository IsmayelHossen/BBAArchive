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


function App() {

  const loginStatus=useAuth();
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
           <Route path="" element={<Dashboard />} />
                <Route path="add" element={<Create_Document1 />} />
                <Route
                  path="type_wise_view/:type"
                  element={<Create_Document />}
                />
                <Route path="category/add" element={<Docs_Category />} />

                <Route
                  path="ViewDocuments/:id/:document_id"
                  element={<ViewDocuments />}
                />
                <Route
                  path="pdfview/:name/:recordId"
                  element={<PdfView />}
                />
                <Route path="list" element={<DocumentList />} />
                </Route>
                {!loginStatus &&
                <>
                 <Route path="/" element={<Login />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/verify" element={<Verify />} />
                </>
               
                
                }
                {/* end documents */}
          
         
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
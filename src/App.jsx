import React from "react";
import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate, } from "react-router-dom";
import { firebaseContext } from ".";
import { Navbar } from "./components/navbar/Navbar";
import { PublicRoutes, PrivateRoutes } from './routes/Routes'
import { useAuthState } from 'react-firebase-hooks/auth'

function App() {
  const { auth } = useContext(firebaseContext)
  const [user, loading, error] = useAuthState(auth)
  console.log('test hook firebase = ', user, loading, error)




  return (
    <BrowserRouter>

      {loading ?
        <div>...Идет загрузка</div>
        :
        <>
          <Navbar />
          <main>
            {user ?
              <Routes>
                {PublicRoutes.map(({ path, element }) => <Route key={path} path={path} element={element} />)}
              </Routes>
              :
              <Routes>
                {PrivateRoutes.map(({ path, element }) => <Route key={path} path={path} element={element} />)}
              </Routes>
            }
          </main>
        </>
      }
    </BrowserRouter>
  )
}

export default App;

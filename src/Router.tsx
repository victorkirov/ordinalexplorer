import { BrowserRouter, Route, Routes } from 'react-router-dom'

import CenterLayout from '@components/layouts/CenterLayout'

import ErrorPage from '@components/pages/Error'
import Error404Page from '@components/pages/Error404'
import InscriptionViewer from '@components/pages/InscriptionViewer'
import OrdinalLookup from '@components/pages/OrdinalLookup'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<CenterLayout />} errorElement={<ErrorPage />}>
          <Route path="/" element={<OrdinalLookup />} />
          <Route path="/wallet/:id" element={<OrdinalLookup />} />
          <Route path="/inscription/:id" element={<InscriptionViewer />} />
          <Route path="*" element={<Error404Page />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router

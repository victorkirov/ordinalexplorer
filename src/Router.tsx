import { BrowserRouter, Route, Routes } from 'react-router-dom'

import CenterLayout from '@components/layouts/CenterLayout'

import ErrorPage from '@components/pages/Error'
import Error404Page from '@components/pages/Error404'
import InscriptionViewer from '@components/pages/InscriptionViewer'
import WalletInscriptionList from '@components/pages/WalletInscriptionList'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<CenterLayout />} errorElement={<ErrorPage />}>
          <Route path="/" element={<WalletInscriptionList />} />
          <Route path="/wallet/:id" element={<WalletInscriptionList />} />
          <Route path="/inscription/:id" element={<InscriptionViewer />} />
          <Route path="*" element={<Error404Page />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router

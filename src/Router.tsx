import { BrowserRouter, Route, Routes } from 'react-router-dom'

import CenterLayout from '@components/layouts/CenterLayout'

import ErrorPage from '@components/pages/Error'
import Error404Page from '@components/pages/Error404'
import NFTViewer from '@components/pages/NFTViewer'
import OrdinalLookup from '@components/pages/OrdinalLookup'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<CenterLayout />} errorElement={<ErrorPage />}>
          <Route path="/" element={<OrdinalLookup />} />
          <Route path="/lookup/:id" element={<OrdinalLookup />} />
          <Route path="/nft/:id" element={<NFTViewer />} />
          <Route path="*" element={<Error404Page />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router

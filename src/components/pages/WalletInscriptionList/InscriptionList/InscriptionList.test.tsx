import apiClient, { Inscription } from '@src/apiClient'
import { render, screen, waitFor } from '@testing-library/react'

import Loader from '@components/atoms/Loader'

import { useNavigate } from 'react-router-dom'
import InscriptionList from '.'

jest.mock('@components/atoms/Loader')
jest.mock('react-router-dom')

const loaderTestText = "I'm a loader"
jest.mocked(Loader).mockImplementation(() => <div>{loaderTestText}</div>)
const navigateMock = jest.fn()
jest.mocked(useNavigate).mockReturnValue(navigateMock)

// Define a mock Inscription to use in tests
const mockInscription: Inscription = {
  id: '1',
  address: 'test address',
  inscriptionNumber: '001',
  content: 'test content',
  timestamp: new Date().toISOString(),
  contentLength: '3',
  contentType: 'text/plain',
  genesisFee: '0.0001',
  genesisHeight: '1',
  genesisTransaction: 'test transaction',
  location: 'test location',
  offset: '0',
  output: '0',
  outputValue: '0',
}

describe('InscriptionList', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should display a loading spinner while inscriptions are being fetched', async () => {
    render(<InscriptionList walletAddress="test address" />)
    expect(screen.getByText(loaderTestText)).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.queryByText(loaderTestText)).not.toBeInTheDocument()
    })
  })

  it('should display an error message if there is an error fetching inscriptions', async () => {
    // Mock the apiClient to throw an error
    jest.spyOn(apiClient, 'getInscriptionsForWallet').mockRejectedValue(new Error('test error'))

    render(<InscriptionList walletAddress="test address" />)

    await waitFor(() => {
      expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    })
  })

  it('should display an error message if the provided wallet address is invalid', async () => {
    // Mock the apiClient to return a 400 error
    jest.spyOn(apiClient, 'getInscriptionsForWallet').mockRejectedValue({ response: { status: 400 } })

    render(<InscriptionList walletAddress="invalid address" />)

    await waitFor(() => {
      expect(screen.getByText('Invalid Bitcoin Address')).toBeInTheDocument()
    })
  })

  it('should display inscriptions if they are fetched successfully', async () => {
    jest.spyOn(apiClient, 'getInscriptionsForWallet').mockResolvedValue([mockInscription])

    render(<InscriptionList walletAddress="test address" />)

    await waitFor(() => {
      expect(screen.getByText('001')).toBeInTheDocument()
    })
  })

  it('should not display inscriptions if there are none', async () => {
    jest.spyOn(apiClient, 'getInscriptionsForWallet').mockResolvedValue([])

    render(<InscriptionList walletAddress="test address" />)
    await waitFor(() => {
      expect(screen.getByText('No inscriptions found')).toBeInTheDocument()
    })
  })

  it('should update inscriptions when walletAddress prop changes', async () => {
    const responses = {
      'test address': [mockInscription],
      'new address': [{ ...mockInscription, id: '2', inscriptionNumber: '002' }],
    }

    const apiSpy = jest
      .spyOn(apiClient, 'getInscriptionsForWallet')
      .mockImplementation(async address => responses[address as keyof typeof responses] ?? [])

    const { rerender } = render(<InscriptionList walletAddress="test address" />)

    await waitFor(() => {
      expect(screen.getByText('001')).toBeInTheDocument()
    })
    expect(apiSpy).toHaveBeenCalledWith('test address')
    apiSpy.mockClear()

    // ensure the inscriptions are not updated when the wallet address is the same
    rerender(<InscriptionList walletAddress="test address" />)

    await waitFor(() => {
      expect(apiSpy).not.toHaveBeenCalled()
      expect(screen.getByText('001')).toBeInTheDocument()
    })
    apiSpy.mockClear()

    // ensure the inscriptions are updated when the wallet address changes
    rerender(<InscriptionList walletAddress="new address" />)

    await waitFor(() => {
      expect(screen.getByText('002')).toBeInTheDocument()
    })
    expect(apiSpy).toHaveBeenCalledWith('new address')
    apiSpy.mockClear()
  })
})

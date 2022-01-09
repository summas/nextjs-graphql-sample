/**
 * @jest-environment jsdom
 */
import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { setupServer } from 'msw/node'
import { getPage } from 'next-page-tester'
import { initTestHelpers } from 'next-page-tester'
import { handlers } from '../mock/handlers'
import 'setimmediate'

initTestHelpers()

const server = setupServer(...handlers)
beforeAll(() => {
  server.listen()
})
afterEach(() => {
  server.resetHandlers()
  cleanup()
})
afterAll(() => {
  server.close()
})

describe(`UserDetailPage Test Cases`, () => {
  it('Should render detailed content of Test user A', async () => {
    const { page } = await getPage({
      route: '/users/b6137849-7f1d-c2db-e609-22056fb86db3',
    })
    render(page)
    expect(await screen.findByText('User detail')).toBeInTheDocument()
    expect(
      screen.getByText('ID : b6137849-7f1d-c2db-e609-22056fb86db3')
    ).toBeInTheDocument()
    expect(screen.getByText('Test user A')).toBeInTheDocument()
    expect(
      screen.getByText('2021-01-13T18:06:46.412969+00:00')
    ).toBeInTheDocument()
  })
  it('Should render detailed content of Test user B', async () => {
    const { page } = await getPage({
      route: '/users/2b07950f-9959-1bc7-834d-5656e4aeaac2',
    })
    render(page)
    expect(await screen.findByText('User detail')).toBeInTheDocument()
    expect(
      screen.getByText('ID : 2b07950f-9959-1bc7-834d-5656e4aeaac2')
    ).toBeInTheDocument()
    expect(screen.getByText('Test user B')).toBeInTheDocument()
    expect(
      screen.getByText('2021-02-13T18:06:46.412969+00:00')
    ).toBeInTheDocument()
  })

  it('Should render detailed content of Test user C', async () => {
    const { page } = await getPage({
      route: '/users/7fe58619-10ec-5239-6f43-1da15a634aba',
    })
    render(page)
    expect(await screen.findByText('User detail')).toBeInTheDocument()
    expect(
      screen.getByText('ID : 7fe58619-10ec-5239-6f43-1da15a634aba')
    ).toBeInTheDocument()
    expect(screen.getByText('Test user C')).toBeInTheDocument()
    expect(
      screen.getByText('2021-03-13T18:06:46.412969+00:00')
    ).toBeInTheDocument()
  })
  it('Should route back to blog-page from detail page', async () => {
    const { page } = await getPage({
      route: '/users/7fe58619-10ec-5239-6f43-1da15a634aba',
    })
    render(page)
    expect(await screen.findByText('User detail')).toBeInTheDocument()
    userEvent.click(screen.getByTestId('back-to-main'))
    expect(await screen.findByText('SSG+ISR')).toBeInTheDocument()
  })
})

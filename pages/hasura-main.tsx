import { VFC } from 'react'
import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { GET_USERS } from '../queries/queries'
import { GetUsersQuery } from '../types/generated/graphql'
import { Layout } from '../components/Layout'

const FetchMain: VFC = () => {
  const { data, error } = useQuery<GetUsersQuery>(GET_USERS, {
    //fetchPolicy: 'network-only', //　毎回サーバーにデータを見に行く
    fetchPolicy: 'cache-and-network', //ほとんどコレでOK、サーバーに行く前にキャッシュを使った後、サーバーに確認して最新の表示をする
    //fetchPolicy: 'cache-first', //　デフォルトで設定される、一旦取得したデータがキャッシュにある場合がキャッシュを読みに行く、サーバーは読みに行かない、データが頻繁に変わるものに関しては適さない
    // fetchPolicy: 'no-cache',
  })
  if (error)
    return (
      <Layout title="Hasura fetchPolicy">
        <p>Error: {error.message}</p>
      </Layout>
    )
  return (
    <Layout title="Hasura fetchPolicy">
      <p className="mb-6 font-bold">Hasura main page</p>
      {console.log(data)}
      {data?.users.map((user) => {
        return (
          <p className="my-1" key={user.id}>
            {user.name}
          </p>
        )
      })}
      <Link href="/hasura-sub">
        <a className="mt-6">Next</a>
      </Link>
    </Layout>
  )
}
export default FetchMain

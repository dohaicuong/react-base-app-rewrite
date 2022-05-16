import { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'

type SignupPageProps = {
  ok: boolean
}

const SignupPage: NextPage<SignupPageProps> = props => {
  if (!props.ok) return <>go away</>

  return (
    <>
      <p>
        Already have an account?
        {' '}
        <Link href='/login'>
          <a>
            <strong>Login</strong>
          </a>
        </Link>
      </p>
    </>
  )
}

// THIS SHOULD BE USE INSTEAD OF getInitialProps
export const getServerSideProps: GetServerSideProps<SignupPageProps> = async context => {
  return {
    props: {
      ok: true
    }
  }
}

export default SignupPage

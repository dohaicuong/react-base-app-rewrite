import Link from 'next/link'
import { useRouter } from 'next/router'

import { useForm, SubmitHandler } from 'react-hook-form'
import { emailPattern } from './emailPattern'
import { LoginInput, useLoginMutation } from './useLoginMutation'

export const LoginForm = () => {
  const router = useRouter()
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>()

  const loginMutation = useLoginMutation(router.query.portal as string)

  const onSubmit: SubmitHandler<LoginInput> = data => {
    loginMutation.mutate(data, {
      onSuccess: res => {
        console.log(res)
      },
      onError: error => {
        console.warn(error)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p>log in to go1</p>
      <p>
        Don't have an account?
        {' '}
        <Link href='/signup'>
          <a>
            <strong>Sign up</strong>
          </a>
        </Link>
      </p>

      {loginMutation.error && (
        <>
          <p style={{ color: 'red' }}>
            Please ensure that your email and password are correct. Still having trouble?
            {' '}
            <Link href='#'>
              <a>Reset your password.</a>
            </Link>
          </p>
        </>
      )}

      <p>
        <input
          placeholder='email'
          {...register('email', {
            required: 'You must enter an email.',
            pattern: {
              value: emailPattern,
              message: 'Invalid email format.'
            }
          })}
          disabled={loginMutation.isLoading}
        />
        {errors.email?.message && (
          <span> {errors.email.message}</span>
        )}
      </p>

      <p>
        <input
          placeholder='password'
          type='password'
          {...register('password', {
            required: 'You must enter a password.',
            minLength: {
              value: 4,
              message: 'Password is too short, at least 4 characters'
            },
          })}
          disabled={loginMutation.isLoading}
        />
        {errors.password?.message && (
          <span> {errors.password.message}</span>
        )}
      </p>

      <Link href='#'>
        <a>
          <strong>Forgot your password?</strong>
        </a>
      </Link>

      <p>
        <button
          type='submit'
          disabled={loginMutation.isLoading}
        >
          Log in
        </button>
      </p>

      <p>
        By continuing you agree to
        {' '}
        <Link href='#'>
          <a>
            <strong>Terms of Use</strong>
          </a>
        </Link>
        {' '}
        and
        {' '}
        <Link href='#'>
          <a>
            <strong>Privacy Policy.</strong>
          </a>
        </Link>
      </p>
    </form>
  )
}

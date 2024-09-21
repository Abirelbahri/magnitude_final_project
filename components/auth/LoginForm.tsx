'use client'
import { useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { motion } from 'framer-motion'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

type Inputs = {
  email: string
  password: string
}

const LoginForm = ({ handleclick }: any) => {
  const { data: session } = useSession()
  const params = useSearchParams()
  let callbackUrl = params.get('callbackUrl') || '/'
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  useEffect(() => {
    if (session && session.user) {
      router.push(callbackUrl)
    }
  }, [callbackUrl, params, router, session])

  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { email, password } = form
    signIn('credentials', {
      email,
      password,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50, transition: { duration: 0.3 } }}
      transition={{ duration: 0.9 }}
      className="flex w-[60vw] flex-col pl-[6%]"
    >
      <h1 className="text-3xl font-semibold text-white mt-[16%] leading-tight">
        Create Your Account to <br /> Unleash Your Dreams
      </h1>

      <div className="mt-10 flex items-center justify-between w-[70%]">
        <FaArrowLeft
          onClick={handleclick}
          className="bg-gray-600 w-8 h-8 rounded-full p-2 cursor-pointer hover:bg-gray-500 transition"
          color="white"
        />
        <p className="font-light text-sm pl-16 text-white">Don't have an account?</p>
        <button
          onClick={handleclick}
          className="bg-gray-800 text-white rounded-xl p-2 underline hover:bg-gray-700 transition"
        >
          Register
        </button>
      </div>

      {params.get('error') && (
        <div className="text-red-500 mt-3 text-sm">
          {params.get('error') === 'CredentialsSignin'
            ? 'Invalid email or password'
            : params.get('error')}
        </div>
      )}
      {params.get('success') && (
        <div className="text-green-500 mt-3 text-sm">{params.get('success')}</div>
      )}

      <form onSubmit={handleSubmit(formSubmit)} className="mt-6">
        <input
          type="email"
          required
          id="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
              message: 'Email is invalid',
            },
          })}
          placeholder="Email Address"
          className="w-[70%] p-2 pl-6 rounded-xl bg-gray-700 text-white focus:bg-gray-600 focus:outline-none transition-all mb-3"
        />
        {errors.email?.message && (
          <div className="text-red-500 mb-2">{errors.email.message}</div>
        )}
        <input
          type="password"
          required
          id="password"
          {...register('password', {
            required: 'Password is required',
          })}
          placeholder="Password"
          className="w-[70%] p-2 pl-6 rounded-xl bg-gray-700 text-white focus:bg-gray-600 focus:outline-none transition-all mb-3"
        />
        {errors.password?.message && (
          <div className="text-red-500 mb-2">{errors.password.message}</div>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 w-[70%] p-2 flex items-center justify-between bg-green-600 text-white rounded-xl hover:bg-green-500 transition-all duration-200 disabled:opacity-50"
        >
          <p className="text-center w-full">Login</p>
          <FaArrowRight color="white" className="bg-black w-8 h-8 rounded-full p-2" />
        </button>
      </form>

      <p className="mt-5 font-light text-sm text-gray-400">
        By signing in, you agree to MAGNITUDE&apos;s{" "}
        <span className="underline text-white">Terms of Service</span>, <br />{" "}
        <span className="underline text-white">Privacy Policy</span>, and{" "}
        <span className="underline text-white">Data Usage Properties</span>.
      </p>
    </motion.div>
  )
}

export default LoginForm

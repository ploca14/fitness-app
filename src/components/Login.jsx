import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { $fetch } from 'ohmyfetch'

import {
  TrophyIcon,
} from '@heroicons/react/24/outline'

export default function Login({ setToken }) {
  const [authError, setAuthError] = useState()

  // form validation rules 
  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email address is required'),
    password: Yup.string().required('Password is required')
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  async function loginUser(credentials) {
    return $fetch('https://fitnessbackend2022.azurewebsites.net/api/Users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .catch(error => setAuthError(error.data))
  }

  async function onSubmit(credentials) {
    const { jwt } = await loginUser(credentials)
    setToken(jwt)
  }

  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex flex-shrink-0 items-center px-4 gap-2 justify-center">
            <TrophyIcon className="w-10 text-blue-700" />
            <h1 className="text-2xl font-bold">Fitness App</h1>
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    {...register('email')}
                    className={`
                      block w-full appearance-none rounded-md border px-3 py-2 shadow-sm focus:outline-none sm:text-sm
                      ${errors.email
                          ? 'border-red-300 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
                          : 'border-gray-300 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500'
                      }
                    `}
                  />
                  {errors.email && 
                    <p className="mt-2 text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  }
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    {...register('password')}
                    className={`
                      block w-full appearance-none rounded-md border px-3 py-2 shadow-sm focus:outline-none sm:text-sm
                      ${errors.password
                          ? 'border-red-300 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
                          : 'border-gray-300 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500'
                      }
                    `}
                  />
                  {errors.password && 
                    <p className="mt-2 text-sm text-red-600">
                      {errors.password.message}
                    </p>
                  }
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {isSubmitting && <span className="">0</span>}
                  Sign in
                </button>
                {authError &&
                  <div className="mt-2 text-sm text-red-600">{authError[""][0]}</div>
                }
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

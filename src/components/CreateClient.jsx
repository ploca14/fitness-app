import Page from './Page';
import useUser from './useUser';
import useApi from './useApi';
import { Redirect, Link, useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from 'react-query';
import * as Yup from 'yup';


function CreateClient() {
  const { user } = useUser();
  const { apiFetch } = useApi();
  const history = useHistory();
  const queryClient = useQueryClient()

  const mutation = useMutation(newClient => {
    return apiFetch('/Users', {
      method: 'POST',
      body: {
        ...newClient,
        personalTrainerId: user.UserId,
        accountType: 'Client',
      }
    });
  }, {
    onSuccess: () => {
      history.push('/clients')
      queryClient.invalidateQueries('clients')
    },
  })

  // form validation rules 
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().required('Email address is required'),
    password: Yup.string().required('Password is required'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  async function onSubmit(newClient) {
    await mutation.mutate(newClient)
  }

  if (user.Role !== "PersonalTrainer") {
    return (
      <Redirect
        to={{
          pathname: "/",
        }}
      />
    )
  }

  return (
    <Page pageName={`Create a new client`}>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Client information</h3>
              <p className="mt-1 text-sm text-gray-500">
                Add basic information about the new client.
              </p>
            </div>
            <div className="mt-5 space-y-6 md:col-span-2 md:mt-0">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  {...register('firstName')}
                  className={`
                      block w-full appearance-none rounded-md border px-3 py-2 shadow-sm focus:outline-none sm:text-sm
                      ${errors.firstName
                      ? 'border-red-300 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500'
                    }
                    `}
                />
                {errors.firstName &&
                  <p className="mt-2 text-sm text-red-600">
                    {errors.firstName.message}
                  </p>
                }
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  {...register('lastName')}
                  className={`
                      block w-full appearance-none rounded-md border px-3 py-2 shadow-sm focus:outline-none sm:text-sm
                      ${errors.lastName
                      ? 'border-red-300 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500'
                    }
                    `}
                />
                {errors.lastName &&
                  <p className="mt-2 text-sm text-red-600">
                    {errors.lastName.message}
                  </p>
                }
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <input
                    id="email"
                    name="email"
                    type="email"
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
            </div>
          </div>
        </div>

        {mutation.isError ? (
          <div className="mt-2 text-sm text-red-600 text-right">{mutation.error.data.error}</div>
        ) : null}

        <div className="flex justify-end">
          <Link
            to="/clients"
            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={mutation.isLoading}
            className="ml-3 inline-flex justify-center items-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {mutation.isLoading && (
              <svg role="status" className="inline mr-2 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
              </svg>
            )}
            Create
          </button>
        </div>
      </form>
    </Page>
  );
}

export default CreateClient;
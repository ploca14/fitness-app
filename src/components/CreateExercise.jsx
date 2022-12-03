import Page from './Page';
import useUser from './useUser';
import useApi from './useApi';
import { Redirect, Link, useHistory, useParams, useLocation } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import * as Yup from 'yup';
import { useState } from 'react';

function CreateExercise(props) {
  let { id } = useParams();
  const { user } = useUser();
  const { apiFetch } = useApi();
  const { state: prefetchedProgram } = useLocation();
  const { isLoading, isError, data: program, error } = useQuery(['program', id], () => apiFetch(`/WorkoutPrograms/${id}`), { initialData: prefetchedProgram });
  const history = useHistory();
  const queryClient = useQueryClient();
  const [exerciseType, setExerciseType] = useState('reps-exercise');

  const handleChange = (event) => {
    setExerciseType(event.target.value)
  }

  const mutation = useMutation(newExercise => {
    return apiFetch(`/Exercises/Program/${id}`, {
      method: 'POST',
      body: {
        ...newExercise,
        time: exerciseType === 'time-exercise' ? newExercise.time : "",
        repetitions: exerciseType === 'reps-exercise' ? newExercise.repetitions : null,
      },
    });
  }, {
    onSuccess: () => {
      history.push(`/programs/${id}`)
      queryClient.invalidateQueries(['program', id])
    },
  })

  // form validation rules 
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    sets: Yup.number().required('Sets is required').typeError('Sets must be a number'),
    repetitions: Yup.number().when('exerciseType', (_, schema) => {
      return exerciseType === 'reps-exercise' ? schema.required('Repetitions is required').typeError('Repetitions must be a number') : schema.notRequired();
    }),
    time: Yup.string().when('exerciseType', (_, schema) => {
      return exerciseType === 'time-exercise' ? schema.required('Time is required'): schema.notRequired();
    }),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  async function onSubmit(newExercise) {
    await mutation.mutate(newExercise)
  }

  if (!["PersonalTrainer", "Manager"].includes(user.Role)) {
    return (
      <Redirect
        to={{
          pathname: "/",
        }}
      />
    )
  }

  if (isLoading) {
    return <Page pageName="Loading program..."></Page>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <Page pageName={`Create new exercise for ${program.name}`}>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Exercise information</h3>
              <p className="mt-1 text-sm text-gray-500">
                Add basic information about the new exercise.
              </p>
            </div>
            <div className="mt-5 space-y-6 md:col-span-2 md:mt-0">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  {...register('name')}
                  className={`
                      block w-full appearance-none rounded-md border px-3 py-2 shadow-sm focus:outline-none sm:text-sm
                      ${errors.name
                      ? 'border-red-300 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500'
                    }
                    `}
                />
                {errors.name &&
                  <p className="mt-2 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                }
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <div className="mt-1">
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    {...register('description')}
                    className={`
                      block w-full appearance-none rounded-md border px-3 py-2 shadow-sm focus:outline-none sm:text-sm
                      ${errors.description
                        ? 'border-red-300 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
                        : 'border-gray-300 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500'
                      }
                    `}
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">Brief description of the exercise.</p>
                {errors.description &&
                  <p className="mt-2 text-sm text-red-600">
                    {errors.description.message}
                  </p>
                }
              </div>

              <div>
                <label className="text-base font-medium text-gray-900">Exercise type</label>
                <p className="text-sm leading-5 text-gray-500">Is the exercise based on repetitions or time?</p>
                <fieldset className="mt-4">
                  <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                    <div className="flex items-center">
                      <input
                        id="reps-exercise"
                        name="exercise-type"
                        value="reps-exercise"
                        type="radio"
                        checked={exerciseType === 'reps-exercise'}
                        onChange={handleChange}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label htmlFor="reps-exercise" className="ml-3 block text-sm font-medium text-gray-700">
                        Repetitions
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="time-exercise"
                        name="exercise-type"
                        value="time-exercise"
                        type="radio"
                        checked={exerciseType === 'time-exercise'}
                        onChange={handleChange}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label htmlFor="time-exercise" className="ml-3 block text-sm font-medium text-gray-700">
                        Time
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>

              <div className="flex gap-4">
                <div>
                  <label htmlFor="sets" className="block text-sm font-medium text-gray-700">
                    Sets
                  </label>
                  <input
                    type="number"
                    name="sets"
                    id="sets"
                    {...register('sets')}
                    className={`
                      block w-full appearance-none rounded-md border px-3 py-2 shadow-sm focus:outline-none sm:text-sm
                      ${errors.sets
                        ? 'border-red-300 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
                        : 'border-gray-300 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500'
                      }
                    `}
                  />
                  {errors.sets &&
                    <p className="mt-2 text-sm text-red-600">
                      {errors.sets.message}
                    </p>
                  }
                </div>

                {exerciseType === 'reps-exercise' &&
                  <div>
                    <label htmlFor="repetitions" className="block text-sm font-medium text-gray-700">
                      Repetitions
                    </label>
                    <input
                      type="number"
                      name="repetitions"
                      id="repetitions"
                      {...register('repetitions')}
                      className={`
                      block w-full appearance-none rounded-md border px-3 py-2 shadow-sm focus:outline-none sm:text-sm
                      ${errors.repetitions
                          ? 'border-red-300 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
                          : 'border-gray-300 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500'
                        }
                    `}
                    />
                    {errors.repetitions &&
                      <p className="mt-2 text-sm text-red-600">
                        {errors.repetitions.message}
                      </p>
                    }
                  </div>
                }

                {exerciseType === 'time-exercise' &&
                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                      Time
                    </label>
                    <input
                      type="text"
                      name="time"
                      id="time"
                      {...register('time')}
                      className={`
                      block w-full appearance-none rounded-md border px-3 py-2 shadow-sm focus:outline-none sm:text-sm
                      ${errors.time
                          ? 'border-red-300 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
                          : 'border-gray-300 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500'
                        }
                    `}
                    />
                    {errors.time &&
                      <p className="mt-2 text-sm text-red-600">
                        {errors.time.message}
                      </p>
                    }
                  </div>
                }
              </div>
            </div>
          </div>
        </div>

        {mutation.isError ? (
          <div className="mt-2 text-sm text-red-600 text-right">{mutation.error.data.error}</div>
        ) : null}

        <div className="flex justify-end">
          <Link
            to={`/programs/${id}`}
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

export default CreateExercise;
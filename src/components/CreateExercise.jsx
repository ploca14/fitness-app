import Page from './Page';
import useUser from './useUser';
import { Redirect, Link, useParams } from 'react-router-dom';

const program = {
  "workoutProgramId": 173,
  "name": "Workout TO THE MAX!!",
  "description": "Workout for el Jefe Senior",
  "exercises": [
    {
      "exerciseId": 105,
      "name": "Ej Jefe Workout",
      "description": "Stand with your feet spread shoulder width apart. Lower your body as far as you can by pushing your hips back and bending your knees. Pause, and then slowly push yourself back to the starting position.",
      "sets": 4,
      "repetitions": 12,
      "time": "30",
      "workoutProgramId": 173,
      "personalTrainerId": 2
    }
  ],
  "personalTrainerId": 2,
  "clientId": 139
}

function CreateExercise() {
  let { id } = useParams();
  const { user } = useUser();

  if (!["PersonalTrainer", "Manager"].includes(user.Role)) {
    return (
      <Redirect
        to={{
          pathname: "/",
        }}
      />
    )
  }

  return (
    <Page pageName={`Create new exercise for ${program.name}`}>
      <form className="space-y-6">
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
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
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    defaultValue={''}
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">Brief description of the exercise.</p>
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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="repetitions" className="block text-sm font-medium text-gray-700">
                    Repetitions
                  </label>
                  <input
                    type="number"
                    name="repetitions"
                    id="repetitions"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                  Time
                </label>
                <input
                  type="text"
                  name="time"
                  id="time"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Link
            to={`/programs/${id}`}
            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Create
          </button>
        </div>
      </form>
    </Page>
  );
}

export default CreateExercise;
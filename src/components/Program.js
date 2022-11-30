import { ClockIcon } from '@heroicons/react/24/outline';
import { useParams, Link } from 'react-router-dom';
import useUser from './useUser';
import Page from './Page';

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

function Program() {
  const { id } = useParams();
  const { user } = useUser();

  return (
    <Page pageName={program.name}>
      <div>
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <p className="mt-2 text-sm text-gray-700">
              {program.description}
            </p>
          </div>
          {["PersonalTrainer", "Manager"].includes(user.Role) &&
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <Link
                to={`/programs/${program.workoutProgramId}/create-exercise`}
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
              >
                Add exercise
              </Link>
            </div>
          }
        </div>
        <div className="overflow-hidden mt-8 bg-white shadow sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {program.exercises.map((exercise) => (
              <li key={exercise.exerciseId}>
                <div className="flex items-center px-4 py-4 sm:px-6">
                  <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <div className="flex text-sm">
                        <p className="font-medium text-indigo-600">{exercise.name}</p>
                      </div>
                      <div className="mt-2 flex">
                        <div className="flex items-center text-sm text-gray-500">
                          {exercise.description}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex text-sm">
                        <p className="font-medium text-gray-800 flex">
                          {exercise.time}
                          <ClockIcon className="w-5 text-gray-500 ml-1" />
                        </p>
                      </div>
                      <div className="mt-2 flex">
                        <div className="flex items-center text-sm text-gray-600">
                          {exercise.sets}x{exercise.repetitions}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </Page>
  );
}

export default Program;

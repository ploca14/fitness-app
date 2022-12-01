import Page from './Page';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import useApi from './useApi';
import { useQuery } from 'react-query';

function Programs() {
  const { apiFetch } = useApi();
  const { isLoading, isError, data: programs, error } = useQuery('todos', () => apiFetch('/WorkoutPrograms'))

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <Page pageName="Programs">
      <div>
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <p className="mt-2 text-sm text-gray-700">
              A list of all your workout programs. Here you can add manage all your workout programs.
            </p>
          </div>
        </div>
        <div className="overflow-hidden mt-8 bg-white shadow sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {isLoading ? (
              <div className="px-4 py-4 sm:px-6">Loading programs...</div>
            ) : programs.map((program) => (
              <li key={program.workoutProgramId}>
                <Link to={`/programs/${program.workoutProgramId}`} className="block hover:bg-gray-50">
                  <div className="flex items-center px-4 py-4 sm:px-6">
                    <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                      <div className="truncate">
                        <div className="flex text-sm">
                          <p className="truncate font-medium text-indigo-600">{program.name}</p>
                        </div>
                        <div className="mt-2 flex">
                          <div className="flex items-center text-sm text-gray-500">
                            {program.description}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ml-5 flex-shrink-0">
                      <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </Page>
  );
}

export default Programs;

import Page from './Page';
import useUser from './useUser';
import { Link, useParams, Redirect } from 'react-router-dom';

const user = {
  "userId": 139,
  "firstName": "Ib",
  "lastName": "Ibsen",
  "email": "a@a",
  "password": null,
  "personalTrainerId": 2,
  "accountType": "Client"
}

function CreateProgram() {
  let { id } = useParams();
  const { user } = useUser();

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
    <Page pageName={`Create new program for ${user.firstName} ${user.lastName}`}>
      <form className="space-y-6">
        <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Program information</h3>
              <p className="mt-1 text-sm text-gray-500">
                Add basic information about the new program.
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
                <p className="mt-2 text-sm text-gray-500">Brief description of the program.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Link
            to="/clients"
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

export default CreateProgram;
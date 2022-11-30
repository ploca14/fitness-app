function Page(props) {
  return (
    <main className="flex-1">
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">{props.pageName}</h1>
        </div>
        <div className="mx-auto max-w-7xl p-4 sm:px-6 md:px-8">
          {props.children}
        </div>
      </div>
    </main>
  );
}

export default Page;
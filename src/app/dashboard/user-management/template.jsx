export default function Template({ children }) {
  return (
    <>
      <section className="container px-4 mx-auto">
        <div className="flex items-center gap-x-3">
          <h2 className="text-lg font-medium text-white dark:text-white">
            Team members
          </h2>

          <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
            100 users
          </span>
        </div>
        <div className="">{children}</div>
      </section>
    </>
  );
}

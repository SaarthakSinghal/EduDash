const Announcements = () => {
  return (
    <div className="rounded-xl bg-white p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Announcements</h1>
        <p className="text-sm text-gray-300">View All</p>
      </div>
      {/* ANNOUNCEMENT CARDS */}
      <div className="mt-4 flex flex-col gap-4">
        {/* CARD 1 */}
        <div className="rounded-md border-2 border-lamaSky bg-white p-4">
          <div className="flex items-center justify-between">
            <h1 className="font-semibold text-gray-600">Title</h1>
            <h4 className="text-sm text-gray-400">02-03-2025</h4>
          </div>
          <div className="mt-2 text-sm text-gray-300">Description</div>
        </div>
        {/* CARD 2 */}
        <div className="rounded-md border-2 border-lamaYellow bg-white p-4">
            <div className="flex items-center justify-between">
            <h1 className="font-semibold text-gray-600">Title</h1>
            <h4 className="text-sm text-gray-400">02-03-2025</h4>
          </div>
          <div className="mt-2 text-sm text-gray-300">Description</div>
        </div>
        {/* CARD 3 */}
        <div className="border-lamaPurple rounded-md border-2 bg-white p-4">
            <div className="flex items-center justify-between">
            <h1 className="font-semibold text-gray-600">Title</h1>
            <h4 className="text-sm text-gray-400">02-03-2025</h4>
          </div>
          <div className="mt-2 text-sm text-gray-300">Description</div>
        </div>
      </div>
    </div>
  );
};

export default Announcements;

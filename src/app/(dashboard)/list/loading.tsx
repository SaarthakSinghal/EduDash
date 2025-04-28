const ListLoading = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <div className="w-1/2 h-10 bg-gray-200 rounded-md"></div>
        <div className="w-1/2 h-10 bg-gray-200 rounded-md"></div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="w-full h-10 bg-gray-200 rounded-md"></div>
        <div className="w-full h-10 bg-gray-200 rounded-md"></div>
      </div>
    </div>
  )
}

export default ListLoading;

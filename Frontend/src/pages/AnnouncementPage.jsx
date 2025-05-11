import NavDashT from "../Teacher/component/navDashT";

function AnnouncementPage() {
  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-slate-900 to-slate-950 text-white flex p-8">
      

      <div className="w-full lg:w-1/4 xl:w-1/5">
        <NavDashT />
      </div>

      <div className="flex flex-col lg:flex-row w-full lg:w-3/4 xl:w-4/5 gap-8 ">
  
        <div className="border-2 border-slate-700 rounded-xl p-6 w-full max-w-md bg-slate-800 shadow-lg h-[600px]">
          <h1 className="text-3xl font-bold text-center mb-6">Make an Announcement</h1>
          <form action="#" className="space-y-5">
            <div>
              <label htmlFor="title" className="block text-lg font-semibold mb-1">Title</label>
              <input
                type="text"
                id="title"
                placeholder="Enter the title"
                className="border-2 p-3 rounded-xl w-full bg-slate-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-lg font-semibold mb-1">Description</label>
              <input
                type="text"
                id="description"
                placeholder="Enter about the announcement"
                className="border-2 p-3 rounded-xl w-full bg-slate-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="file" className="block text-lg font-semibold mb-1">Upload Document</label>
              <input
                type="file"
                id="file"
                className="border-2 p-3 rounded-xl w-full bg-slate-900 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition-all"
              />
            </div>

            <div>
              <input type="checkbox" className="accent-blue-600 w-5 h-5" />
              <label htmlFor="important" className="text-lg font-medium p-2">
                Mark as important
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition-all text-white font-semibold py-3 rounded-xl mt-4"
            >
              Submit Announcement
            </button>
          </form>
        </div>

  
        <div className="flex items-center lg:h-[700px] w-full flex-col bg-slate-800 rounded-xl shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-4">Announcements</h1>
          <p className="text-gray-500">No announcement yet..</p>
        </div>

      </div>
    </div>
  );
}

export default AnnouncementPage;

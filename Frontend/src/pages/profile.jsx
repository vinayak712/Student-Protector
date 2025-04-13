import { useState } from 'react';
import { Camera, User, Mail, BookOpen, Save, Calendar } from 'lucide-react';

function Profile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    usn: "",
    joiningYear: "",
    passingYear: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 pt-[50px]">
      <div className="max-w-4xl w-full bg-slate-800 rounded-xl shadow-xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Profile Sidebar */}
          <div className="w-full md:w-72 bg-slate-900 p-6 flex flex-col items-center">
            <div className="relative">
              <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-blue-500">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-colors"
              >
                <Camera className="w-4 h-4 text-white" />
                <input type="file" id="avatar-upload" className="hidden" accept="image/*" />
              </label>
            </div>
            <h2 className="mt-4 text-xl font-semibold text-white">Student</h2>
            <p className="text-slate-400 text-sm">student@example.com</p>
            <div className="mt-6 w-full space-y-3">
              <div className="flex items-center gap-2 text-slate-400">
                <Mail className="w-4 h-4 text-blue-500" />
                <span className="text-sm">Email Verified</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <BookOpen className="w-4 h-4 text-blue-500" />
                <span className="text-sm">Computer Science</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <BookOpen className="w-4 h-4 text-blue-500" />
                <span className="text-sm">1DS23CS257</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Calendar className="w-4 h-4 text-blue-500" />
                <span className="text-sm">2023 - 2027</span>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="flex-1 p-6">
            <h1 className="text-2xl font-bold text-white mb-6">Profile Details</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-300 mb-1 flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-500" />
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className=" text-sm font-medium text-slate-300 mb-1 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-500" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className=" text-sm font-medium text-slate-300 mb-1 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-500" />
                  USN Number
                </label>
                <input
                  type="text"
                  value={formData.usn}
                  onChange={(e) => setFormData({ ...formData, usn: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="1DS23CS***"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className=" text-sm font-medium text-slate-300 mb-1 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    Joining Year
                  </label>
                  <input
                    type="number"
                    value={formData.joiningYear}
                    onChange={(e) => setFormData({ ...formData, joiningYear: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="2023"
                    min="2000"
                    max="2099"
                  />
                </div>

                <div>
                  <label className=" text-sm font-medium text-slate-300 mb-1 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    Passing Year
                  </label>
                  <input
                    type="number"
                    value={formData.passingYear}
                    onChange={(e) => setFormData({ ...formData, passingYear: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="2027"
                    min="2000"
                    max="2099"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 w-full bg-blue-500 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
import React from 'react';
import {
  Users, Bell, File, FileUp, Download, Trash2, Send, ChevronDown, Sun, Moon
} from 'lucide-react';
import NavDash from './navDashT';
function Teacherdashboard() {
  const darkMode = false; // demo toggle
  const toggleDarkMode = () => {}; // demo handler

  const stats = [
    { label: "Courses", value: 5, color: "bg-blue-500", icon: Users },
    { label: "Students", value: 120, color: "bg-green-500", icon: Users },
    { label: "Assignments", value: 10, color: "bg-purple-500", icon: Users },
    { label: "Messages", value: 42, color: "bg-yellow-500", icon: Users },
  ];

  const notifications = [
    { id: 1, read: false },
    { id: 2, read: true }
  ];

  const students = ["Alice", "Bob", "Charlie"];
  const activeChat = "Alice";
  const messages = [
    { id: 1, content: "Hello, professor!", isTeacher: false, timestamp: new Date() },
    { id: 2, content: "Hi Alice, how can I help you?", isTeacher: true, timestamp: new Date() }
  ];
  const newMessage = "";

  const documents = [
    { id: 1, name: "Syllabus.pdf", size: "1.2MB", uploadedAt: new Date() },
    { id: 2, name: "Schedule.docx", size: "800KB", uploadedAt: new Date() }
  ];

  const activeTab = "chat";

  return (
      <div className='min-h-screen w-screen bg-gradient-to-br from-slate-900 to-slate-950 text-white'>
          <NavDash /> 
          
          <main className="ml-64 p-8">
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Welcome back, Dr. Smith</h1>
        <div className="flex items-center gap-4">
          <button onClick={toggleDarkMode} className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
            {darkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
          </button>
          <div className="relative">
            <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
              <Bell className="h-6 w-6" />
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                {notifications.filter(n => !n.read).length}
              </span>
            </button>
          </div>
          <button className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <img
              src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
              alt="Profile"
              className="h-8 w-8 rounded-full object-cover"
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Dr. Smith</span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chat and Documents Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button className="flex-1 px-6 py-3 text-sm font-medium text-blue-600 border-b-2 border-blue-600">
              Chat
            </button>
            <button className="flex-1 px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">
              Documents
            </button>
          </div>

          {/* Chat Area */}
          <div className="flex h-[600px]">
            <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 p-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Students</h3>
              <div className="space-y-2">
                {students.map(student => (
                  <button key={student} className="w-full p-3 rounded-lg text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <Users className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      </div>
                      <span>{student}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 flex flex-col">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{activeChat}</h3>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.isTeacher ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] rounded-lg p-3 ${msg.isTeacher ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white'}`}>
                      <p>{msg.content}</p>
                      <p className="text-xs mt-1 opacity-70">a moment ago</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-gray-800 dark:text-white"
                  />
                  <button className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700">
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Documents Panel */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Documents</h3>
            <label className="cursor-pointer bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700">
              <input type="file" className="hidden" />
              <FileUp className="h-5 w-5 inline-block mr-2" />
              Upload Document
            </label>
          </div>
          <div className="space-y-4">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <File className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">{doc.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">1 hour ago</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg">
                    <Download className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/50 rounded-lg">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
   </div>
  );
}

export default Teacherdashboard;

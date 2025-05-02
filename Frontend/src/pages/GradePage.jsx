import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { 
  BarChart3, PieChart, LineChart, Upload, Send, 
  Download, Paperclip, ChevronDown, ChevronUp,
  Calendar, Clock, ArrowUpRight, FileText, Trash2
} from "lucide-react";
import { studentAuthStore } from "../api/studentAuthStore";
import { axiosInstance } from "../lib/axios";
import NavDash from "../components/navDash";
import toast from "react-hot-toast";
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend, 
  ArcElement,
  PointElement,
  LineElement
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

function GradesPage() {
  const [activeChart, setActiveChart] = useState("performance");
  const [files, setFiles] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [chartData, setChartData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showMessagePanel, setShowMessagePanel] = useState(true);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  
  const { studentInfo, fetchStudentInfo } = studentAuthStore();
  
  // Scroll to bottom of messages when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  // Fetch grades data, files and messages on load
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch student info if needed
        if (!studentInfo) {
          await fetchStudentInfo();
        }
        
        // Fetch grades data
        const gradesResponse = await axiosInstance.get('/charts/grades');
        
        // Fetch files
        const filesResponse = await axiosInstance.get('/charts/files');
        setFiles(filesResponse.data);
        
        // Fetch messages
        const messagesResponse = await axiosInstance.get('/charts/messages');
        setMessages(messagesResponse.data);
        
        // Prepare chart data
        prepareChartData(gradesResponse.data);
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load grades data");
        setIsLoading(false);
        
        // Use mock data for preview
        prepareMockData();
      }
    };
    
    fetchData();
  }, [fetchStudentInfo, studentInfo]);
  
  // Mock data for preview
  const prepareMockData = () => {
    const performance = {
      labels: ['Mathematics', 'Computer Science', 'Physics', 'Chemistry', 'English', 'Biology'],
      datasets: [{
        label: 'Your Score',
        data: [85, 92, 78, 88, 95, 76],
        backgroundColor: 'rgba(99, 102, 241, 0.6)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 1
      }, {
        label: 'Class Average',
        data: [72, 84, 75, 80, 85, 70],
        backgroundColor: 'rgba(139, 92, 246, 0.4)',
        borderColor: 'rgba(139, 92, 246, 1)',
        borderWidth: 1
      }]
    };
    
    const attendance = {
      labels: ['Present', 'Absent', 'Late'],
      datasets: [{
        data: [92, 5, 3],
        backgroundColor: [
          'rgba(52, 211, 153, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(251, 191, 36, 0.8)'
        ],
        borderColor: [
          'rgba(52, 211, 153, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(251, 191, 36, 1)'
        ],
        borderWidth: 1
      }]
    };
    
    const progress = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Score Trend',
        data: [75, 78, 82, 79, 85, 90],
        fill: false,
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        tension: 0.4
      }]
    };
    
    setChartData({ performance, attendance, progress });
    
    // Mock files
    setFiles([
      { _id: '1', filename: 'math_assignment.pdf', uploadedAt: new Date().toISOString(), size: '1.2 MB' },
      { _id: '2', filename: 'physics_report.docx', uploadedAt: new Date(Date.now() - 86400000).toISOString(), size: '850 KB' }
    ]);
    
    // Mock messages
    setMessages([
      { _id: '1', sender: { name: 'Prof. Williams' }, message: 'Please upload your mathematics assignment before Friday.', timestamp: new Date(Date.now() - 172800000).toISOString() },
      { _id: '2', sender: { name: 'You' }, message: 'I have a question about the physics formula on page 42.', timestamp: new Date(Date.now() - 86400000).toISOString() },
      { _id: '3', sender: { name: 'Prof. Williams' }, message: 'Could you be more specific about which formula?', timestamp: new Date(Date.now() - 43200000).toISOString() }
    ]);
  };
  
  // Prepare chart data from API response
  const prepareChartData = (data) => {
    // Format data for charts based on API response
    // This would depend on your actual API response format
    setChartData({
      performance: data.performance || {},
      attendance: data.attendance || {},
      progress: data.progress || {}
    });
  };
  
  // Handle file selection
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  // Upload file with message
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedFile && !message.trim()) {
      toast.error("Please add a file or message before submitting");
      return;
    }
    
    try {
      setIsUploading(true);
      
      const formData = new FormData();
      if (selectedFile) {
        formData.append('file', selectedFile);
      }
      if (message.trim()) {
        formData.append('message', message);
      }
      
      await axiosInstance.post('/charts/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Refresh data
      const filesResponse = await axiosInstance.get('/charts/files');
      setFiles(filesResponse.data);
      
      const messagesResponse = await axiosInstance.get('/charts/messages');
      setMessages(messagesResponse.data);
      
      // Clear form
      setSelectedFile(null);
      setMessage('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      toast.success('Upload successful!');
    } catch (error) {
      console.error("Upload error:", error);
      toast.error('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };
  
  // Delete file
  const handleDeleteFile = async (fileId) => {
    try {
      await axiosInstance.delete(`/charts/files/${fileId}`);
      setFiles(files.filter(file => file._id !== fileId));
      toast.success("File deleted successfully");
    } catch (error) {
      toast.error("Failed to delete file");
    }
  };
  
  // Chart options
  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Academic Performance',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      }
    }
  };
  
  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Attendance Record',
      },
    },
  };
  
  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Progress Over Time',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      }
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Format time for display
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-950">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-t-blue-500 border-blue-500/30 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-400">Loading charts and data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 text-white">
      <NavDash />
      
      <div className="ml-24 md:ml-64 p-6 pt-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <BarChart3 className="text-blue-400" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Academic Performance
              </span>
            </h1>
            <p className="text-gray-400 mt-1">Track your progress and manage academic documents</p>
          </motion.div>
          
          {/* Chart Type Selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 flex flex-wrap gap-3"
          >
            <button
              onClick={() => setActiveChart('performance')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                activeChart === 'performance'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
              }`}
            >
              <BarChart3 size={16} />
              Performance
            </button>
            <button
              onClick={() => setActiveChart('attendance')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                activeChart === 'attendance'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
              }`}
            >
              <PieChart size={16} />
              Attendance
            </button>
            <button
              onClick={() => setActiveChart('progress')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                activeChart === 'progress'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
              }`}
            >
              <LineChart size={16} />
              Progress
            </button>
          </motion.div>
          
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2 bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6 shadow-xl"
            >
              <div className="w-full h-[400px] flex items-center justify-center">
                {activeChart === 'performance' && chartData.performance && (
                  <Bar data={chartData.performance} options={barOptions} />
                )}
                
                {activeChart === 'attendance' && chartData.attendance && (
                  <Pie data={chartData.attendance} options={pieOptions} />
                )}
                
                {activeChart === 'progress' && chartData.progress && (
                  <Line data={chartData.progress} options={lineOptions} />
                )}
              </div>
              
              <div className="mt-6 pt-6 border-t border-slate-700">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold">Academic Statistics</h3>
                  <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 transition-colors">
                    <Download size={16} />
                    Download Report
                  </button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                  <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-500/20 p-2 rounded-lg">
                        <BarChart3 size={20} className="text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Current GPA</p>
                        <h4 className="text-xl font-bold">3.8/4.0</h4>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-500/20 p-2 rounded-lg">
                        <PieChart size={20} className="text-purple-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Attendance</p>
                        <h4 className="text-xl font-bold">92%</h4>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-500/20 p-2 rounded-lg">
                        <ArrowUpRight size={20} className="text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Improvement</p>
                        <h4 className="text-xl font-bold">+12%</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Files and Messages Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-slate-800/50 rounded-2xl border border-slate-700/50 overflow-hidden shadow-xl flex flex-col"
            >
              <div className="p-5 bg-slate-800 border-b border-slate-700 flex justify-between items-center">
                <h3 className="font-semibold flex items-center gap-2">
                  <FileText size={18} className="text-blue-400" />
                  Files & Messages
                </h3>
                <button 
                  onClick={() => setShowMessagePanel(!showMessagePanel)}
                  className="text-gray-400 hover:text-white transition-colors p-1"
                >
                  {showMessagePanel ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
              </div>
              
              {/* Files Section */}
              <div className="p-4 border-b border-slate-700 overflow-y-auto max-h-[200px]">
                <h4 className="text-sm font-medium text-gray-400 mb-3">Recent Files</h4>
                
                {files.length === 0 ? (
                  <p className="text-center text-gray-500 py-4 text-sm">No files uploaded yet</p>
                ) : (
                  <div className="space-y-3">
                    {files.map((file) => (
                      <div key={file._id} className="bg-slate-800 rounded-lg p-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="bg-slate-700 p-2 rounded">
                            <FileText size={16} className="text-blue-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{file.filename}</p>
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                              <span>{file.size}</span>
                              <span>•</span>
                              <span>{formatDate(file.uploadedAt)}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <button className="text-gray-400 hover:text-white transition-colors p-1">
                            <Download size={14} />
                          </button>
                          <button 
                            onClick={() => handleDeleteFile(file._id)}
                            className="text-gray-400 hover:text-red-400 transition-colors p-1"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Messages Section */}
              {showMessagePanel && (
                <div className="flex-grow overflow-hidden flex flex-col">
                  {/* Messages list */}
                  <div className="flex-grow p-4 overflow-y-auto" style={{ maxHeight: '300px' }}>
                    {messages.length === 0 ? (
                      <p className="text-center text-gray-500 py-4 text-sm">No messages yet</p>
                    ) : (
                      <div className="space-y-4">
                        {messages.map((msg) => (
                          <div 
                            key={msg._id} 
                            className={`flex ${msg.sender.name === 'You' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div 
                              className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                                msg.sender.name === 'You' 
                                  ? 'bg-blue-600 rounded-tr-none' 
                                  : 'bg-slate-700 rounded-tl-none'
                              }`}
                            >
                              {msg.sender.name !== 'You' && (
                                <p className="text-xs font-medium text-blue-300 mb-1">{msg.sender.name}</p>
                              )}
                              <p className="text-sm">{msg.message}</p>
                              <div className="flex justify-end items-center gap-1 mt-1">
                                <Clock size={10} className="text-gray-400" />
                                <span className="text-[10px] text-gray-400">
                                  {formatTime(msg.timestamp)}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                        <div ref={messagesEndRef}></div>
                      </div>
                    )}
                  </div>
                  
                  {/* File upload and message form */}
                  <form 
                    onSubmit={handleSubmit} 
                    className="p-4 bg-slate-800 border-t border-slate-700 flex flex-col gap-3"
                  >
                    {selectedFile && (
                      <div className="bg-slate-700/50 rounded-lg p-2 text-sm flex items-center justify-between">
                        <span className="truncate">{selectedFile.name}</span>
                        <button 
                          type="button"
                          onClick={() => {
                            setSelectedFile(null);
                            if (fileInputRef.current) fileInputRef.current.value = '';
                          }}
                          className="text-gray-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    )}
                    
                    <div className="relative">
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="w-full bg-slate-700 border border-slate-600 rounded-lg py-2 pl-4 pr-20 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                      />
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current.click()}
                          className="text-gray-400 hover:text-blue-400 transition-colors p-1"
                        >
                          <Paperclip size={16} />
                        </button>
                        <button
                          type="submit"
                          disabled={isUploading || (!selectedFile && !message.trim())}
                          className={`text-white p-1 rounded-full ${
                            isUploading || (!selectedFile && !message.trim())
                              ? 'bg-blue-600/50 cursor-not-allowed'
                              : 'bg-blue-600 hover:bg-blue-700'
                          }`}
                        >
                          {isUploading ? (
                            <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          ) : (
                            <Send size={14} />
                          )}
                        </button>
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GradesPage;
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { 
  BellRing, Send, Paperclip, ChevronDown, MoreHorizontal, 
  Calendar, Clock, FileText, Trash2, Eye, Download,
  ThumbsUp, MessageCircle, Filter, MessageSquare
} from "lucide-react";
import { studentAuthStore } from "../api/studentAuthStore";
import { TeacherAuthStore } from "../api/teacherAuthStore";
import { axiosInstance } from "../lib/axios";
import NavDashT from "../Teacher/component/navDashT";
import toast from "react-hot-toast";
import { format, formatDistanceToNow } from "date-fns";

function AnnouncementPage() {
  const [announcements, setAnnouncements] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, files, important
  const [showDropdownId, setShowDropdownId] = useState(null);
  const fileInputRef = useRef(null);
  
  const { studentInfo, studentUser } = studentAuthStore();
  const { teacherInfo, teacherUser } = TeacherAuthStore();
  
  // Determine current user and role
  const currentUser = teacherUser || studentUser;
  const userRole = teacherUser ? 'teacher' : 'student';
  
  // Fetch announcements on load and when filter changes
  useEffect(() => {
    fetchAnnouncements();
  }, [filter]);
  
  // Close dropdown menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (showDropdownId && !event.target.closest('.announcement-actions')) {
        setShowDropdownId(null);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdownId]);
  
  const fetchAnnouncements = async () => {
    try {
      setIsLoading(true);
      
      // Apply filter based on selection
      const params = filter !== 'all' ? { filter } : {};
      const response = await axiosInstance.get('/api/announcements', { params });
      
      setAnnouncements(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching announcements:", error);
      toast.error("Failed to load announcements");
      setIsLoading(false);
      
      // Mock data for preview during development
      const mockData = getMockAnnouncements();
      setAnnouncements(mockData);
    }
  };
  
  const getMockAnnouncements = () => {
    return [
      {
        _id: "1",
        message: "Welcome to the new semester! Please download the updated syllabus and schedule for this course.",
        sender: {
          _id: "123",
          name: "Professor Johnson",
          role: "teacher",
          avatar: "https://randomuser.me/api/portraits/men/41.jpg"
        },
        files: [
          {
            _id: "f1",
            filename: "CS301_Syllabus_2025.pdf",
            originalname: "CS301_Syllabus_2025.pdf",
            size: "1.4 MB",
            mimetype: "application/pdf"
          },
          {
            _id: "f2",
            filename: "Spring_Schedule.xlsx",
            originalname: "Spring_Schedule.xlsx",
            size: "820 KB",
            mimetype: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          }
        ],
        important: true,
        likes: 12,
        comments: 5,
        createdAt: "2025-04-22T14:30:00.000Z"
      },
      {
        _id: "2",
        message: "Assignment #3 is due next Friday. Remember to submit both the code files and your documentation report.",
        sender: {
          _id: "456",
          name: "Dr. Williams",
          role: "teacher",
          avatar: "https://randomuser.me/api/portraits/women/33.jpg"
        },
        files: [
          {
            _id: "f3",
            filename: "Assignment3_Template.zip",
            originalname: "Assignment3_Template.zip",
            size: "3.2 MB", 
            mimetype: "application/zip"
          }
        ],
        important: false,
        likes: 8,
        comments: 14,
        createdAt: "2025-04-28T09:15:00.000Z"
      },
      {
        _id: "3",
        message: "The lab session scheduled for tomorrow has been moved to Room 302. Please be there on time.",
        sender: {
          _id: "789",
          name: "Lab Administrator",
          role: "staff",
          avatar: "https://randomuser.me/api/portraits/men/22.jpg" 
        },
        files: [],
        important: true,
        likes: 5,
        comments: 2,
        createdAt: "2025-05-01T18:45:00.000Z"
      }
    ];
  };
  
  // Handle file selection
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  // Submit announcement (for teachers/admins)
  const handleSubmitAnnouncement = async (e) => {
    e.preventDefault();
    
    if (!message.trim() && !selectedFile) {
      toast.error("Please add a message or attach a file");
      return;
    }
    
    try {
      setIsUploading(true);
      const formData = new FormData();
      
      if (message.trim()) {
        formData.append("message", message);
      }
      
      if (selectedFile) {
        formData.append("file", selectedFile);
      }
      
      await axiosInstance.post("/api/announcements", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      // Success! Clear form and refresh
      setMessage("");
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      
      toast.success("Announcement posted successfully!");
      fetchAnnouncements();
    } catch (error) {
      console.error("Error posting announcement:", error);
      toast.error("Failed to post announcement");
    } finally {
      setIsUploading(false);
    }
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return format(date, "MMM d, yyyy");
    } catch (error) {
      return "Invalid date";
    }
  };
  
  // Format time for display
  const formatTime = (dateString) => {
    try {
      const date = new Date(dateString);
      return format(date, "h:mm a");
    } catch (error) {
      return "";
    }
  };
  
  // Get relative time
  const getRelativeTime = (dateString) => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      return "some time ago";
    }
  };
  
  // Delete announcement (if admin or creator)
  const handleDeleteAnnouncement = async (id) => {
    try {
      await axiosInstance.delete(`/api/announcements/${id}`);
      toast.success("Announcement deleted");
      fetchAnnouncements();
    } catch (error) {
      toast.error("Failed to delete announcement");
    } finally {
      setShowDropdownId(null);
    }
  };
  
  // Like announcement
  const handleLikeAnnouncement = async (id) => {
    try {
      await axiosInstance.post(`/api/announcements/${id}/like`);
      fetchAnnouncements();
    } catch (error) {
      toast.error("Failed to like announcement");
    }
  };
  
  // Mark as important
  const handleToggleImportant = async (id, currentStatus) => {
    try {
      await axiosInstance.patch(`/api/announcements/${id}/important`, {
        important: !currentStatus,
      });
      fetchAnnouncements();
      setShowDropdownId(null);
    } catch (error) {
      toast.error("Failed to update announcement");
    }
  };
  
  // Get file icon based on mime type
  const getFileIcon = (mimetype) => {
    if (mimetype.includes('pdf')) {
      return <FileText className="text-red-400" />;
    } else if (mimetype.includes('image')) {
      return <Eye className="text-purple-400" />;
    } else if (mimetype.includes('spreadsheet') || mimetype.includes('excel')) {
      return <FileText className="text-green-400" />;
    } else if (mimetype.includes('zip') || mimetype.includes('compressed')) {
      return <FileText className="text-orange-400" />;
    }
    return <FileText className="text-blue-400" />;
  };
  
  const isTeacherOrAdmin = () => {
    return userRole === 'teacher' || userRole === 'admin';
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-950">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-t-blue-500 border-blue-500/30 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-400">Loading announcements...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 text-white">
      <NavDashT />
      
      <div className="ml-24 md:ml-64 p-6 pt-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex justify-between items-center"
          >
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <BellRing className="text-blue-400" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  Announcements
                </span>
              </h1>
              <p className="text-gray-400 mt-1">Stay updated with important notifications and updates</p>
            </div>
            
            <div className="flex items-center gap-3">
              <select 
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Announcements</option>
                <option value="files">With Attachments</option>
                <option value="important">Important Only</option>
              </select>
              
              <button 
                onClick={() => fetchAnnouncements()}
                className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
                aria-label="Refresh announcements"
              >
                <Filter size={18} />
              </button>
            </div>
          </motion.div>
          
          {/* Create Announcement Form (teachers/admins only) */}
          {isTeacherOrAdmin() && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-8 bg-slate-800/50 rounded-xl p-5 border border-slate-700/50"
            >
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <MessageSquare size={20} className="text-blue-400" />
                Create Announcement
              </h2>
              
              <form onSubmit={handleSubmitAnnouncement} className="space-y-4">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share an announcement with your students..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px] resize-none"
                />
                
                {selectedFile && (
                  <div className="bg-slate-700/50 rounded-lg p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText size={18} className="text-blue-400" />
                      <span className="text-sm truncate max-w-md">{selectedFile.name}</span>
                      <span className="text-xs text-gray-400">
                        ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedFile(null);
                        if (fileInputRef.current) fileInputRef.current.value = "";
                      }}
                      className="text-gray-400 hover:text-red-400 transition-colors"
                      aria-label="Remove file"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
                
                <div className="flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <Paperclip size={18} />
                    <span>Attach File</span>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.rar,.jpg,.jpeg,.png,.gif"
                    />
                  </button>
                  
                  <button
                    type="submit"
                    disabled={isUploading || (!message.trim() && !selectedFile)}
                    className={`px-6 py-2.5 rounded-lg flex items-center gap-2 ${
                      isUploading || (!message.trim() && !selectedFile)
                        ? "bg-blue-600/50 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    } transition-colors`}
                  >
                    {isUploading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Posting...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Post Announcement</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
          
          {/* Announcements List */}
          <div className="space-y-6">
            {announcements.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <MessageCircle size={48} className="mb-4 text-gray-500" />
                <p className="text-xl font-semibold">No announcements yet</p>
                <p className="mt-2 text-sm">Check back later for updates</p>
              </div>
            ) : (
              announcements.map((announcement, index) => (
                <motion.div
                  key={announcement._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                  className={`bg-slate-800/50 rounded-xl overflow-hidden border ${
                    announcement.important
                      ? "border-amber-500/50"
                      : "border-slate-700/50"
                  }`}
                >
                  {/* Announcement Header */}
                  <div className="flex items-center justify-between p-4 bg-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                        <img
                          src={announcement.sender.avatar || "https://via.placeholder.com/40"}
                          alt={announcement.sender.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{announcement.sender.name}</h3>
                          {announcement.important && (
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-amber-500/20 text-amber-400 border border-amber-500/30">
                              Important
                            </span>
                          )}
                        </div>
                        <div className="flex items-center text-xs text-gray-400 mt-1">
                          <Calendar size={12} className="mr-1" />
                          <span>{formatDate(announcement.createdAt)}</span>
                          <span className="mx-1">•</span>
                          <Clock size={12} className="mr-1" />
                          <span>{formatTime(announcement.createdAt)}</span>
                          <span className="mx-1">•</span>
                          <span>{getRelativeTime(announcement.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Actions dropdown */}
                    <div className="relative announcement-actions">
                      <button
                        onClick={() => setShowDropdownId(showDropdownId === announcement._id ? null : announcement._id)}
                        className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                        aria-label="More options"
                      >
                        <MoreHorizontal size={18} />
                      </button>
                      
                      {showDropdownId === announcement._id && (
                        <div className="absolute right-0 top-full mt-1 bg-slate-800 rounded-lg shadow-lg border border-slate-700 overflow-hidden z-10 w-48">
                          {isTeacherOrAdmin() && (
                            <button
                              onClick={() => handleToggleImportant(announcement._id, announcement.important)}
                              className="w-full text-left px-4 py-2.5 hover:bg-slate-700 flex items-center gap-2 transition-colors"
                            >
                              <BellRing size={14} />
                              {announcement.important ? "Remove importance" : "Mark as important"}
                            </button>
                          )}
                          
                          {(isTeacherOrAdmin() || announcement.sender._id === currentUser?._id) && (
                            <button
                              onClick={() => handleDeleteAnnouncement(announcement._id)}
                              className="w-full text-left px-4 py-2.5 hover:bg-slate-700 flex items-center gap-2 text-red-400 transition-colors"
                            >
                              <Trash2 size={14} />
                              Delete announcement
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Announcement Content */}
                  <div className="p-5">
                    <div className="text-gray-100 whitespace-pre-line">
                      {announcement.message}
                    </div>
                    
                    {/* Attached Files */}
                    {announcement.files && announcement.files.length > 0 && (
                      <div className="mt-5 border-t border-slate-700 pt-4">
                        <h4 className="text-sm font-medium text-gray-400 mb-3">Attachments</h4>
                        <div className="space-y-2">
                          {announcement.files.map((file) => (
                            <div
                              key={file._id}
                              className="bg-slate-800 rounded-lg p-3 flex items-center justify-between"
                            >
                              <div className="flex items-center gap-3">
                                {getFileIcon(file.mimetype)}
                                <div>
                                  <p className="text-sm font-medium">{file.originalname}</p>
                                  <p className="text-xs text-gray-400">{file.size}</p>
                                </div>
                              </div>
                              <a
                                href={`/api/files/${file._id}`}
                                download
                                className="text-blue-400 hover:text-blue-300 transition-colors"
                                aria-label="Download file"
                              >
                                <Download size={16} />
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Announcement Footer */}
                  <div className="px-5 py-3 bg-slate-800/70 border-t border-slate-700 flex items-center gap-6">
                    <button
                      onClick={() => handleLikeAnnouncement(announcement._id)}
                      className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors"
                      aria-label={announcement.liked ? "Unlike" : "Like"}
                    >
                      <ThumbsUp size={18} className={announcement.liked ? "text-blue-400" : ""} />
                      <span>{announcement.likes || 0}</span>
                    </button>
                    <button
                      onClick={() => toast.success("Comments feature coming soon!")}
                      className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors"
                      aria-label="Comment"
                    >
                      <MessageCircle size={18} />
                      <span>{announcement.comments || 0}</span>
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnnouncementPage;
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Upload,
  Download,
  Paperclip,
  Trash2,
  FileUp,
  Search,
  Filter,
} from "lucide-react";
import NavDashT from "../Teacher/component/navDashT";
import { studentAuthStore } from "../api/studentAuthStore"
import { TeacherAuthStore } from "../api/teacherAuthStore";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import NavDash from "../components/navDash";
function SharedDocumentsPage() {
  const [documents, setDocuments] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [fileTypeFilter, setFileTypeFilter] = useState("all");
  const fileInputRef = useRef(null);
  const [uploaderName, setUploaderName] = useState("");
  const [description, setDescription] = useState("");
  const { studentUser } = studentAuthStore();
  const { teacherUser } = TeacherAuthStore();
  const currentUser = teacherUser || studentUser;
  const userRole = teacherUser ? 'teacher' : 'student';
  // Fetch documents on component mount
  useEffect(() => {
    fetchDocuments();
  }, []);

  // Function to fetch all documents
  // Function to fetch all documents
  const fetchDocuments = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get("/shared-documents");
      setDocuments(response.data);
    } catch (error) {
      console.error("Error fetching documents:", error);
      toast.error("Failed to load documents");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Submit document
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      toast.error("Please select a file to upload");
      return;
    }

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("uploaderName", uploaderName || "Anonymous");
      formData.append("description", description);

      await axiosInstance.post("/shared-documents", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Reset form
      setSelectedFile(null);
      setUploaderName("");
      setDescription("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      toast.success("Document uploaded successfully!");
      fetchDocuments(); // Refresh documents list
    } catch (error) {
      console.error("Error uploading document:", error);
      toast.error("Failed to upload document");
    } finally {
      setIsUploading(false);
    }
  };

// Handle document download
const handleDownload = async (docItem) => {
    try {
      // Extract the base URL without the /api suffix
      const baseUrl = axiosInstance.defaults.baseURL.replace(/\/api$/, '');
      
      // Create a temporary anchor element to force download
      const link = document.createElement('a');
      link.href = `${baseUrl}/uploads/shared-documents/${docItem.filename}`;
      link.download = docItem.originalname;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success("Downloading document...");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download document");
    }
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    else if (bytes < 1024 * 1024 * 1024)
      return (bytes / (1024 * 1024)).toFixed(1) + " MB";
    else return (bytes / (1024 * 1024 * 1024)).toFixed(1) + " GB";
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get file icon based on mimetype
  const getFileIcon = (mimetype) => {
    if (mimetype.includes("pdf")) {
      return <FileText className="text-red-400" />;
    } else if (mimetype.includes("word") || mimetype.includes("doc")) {
      return <FileText className="text-blue-400" />;
    } else if (mimetype.includes("image")) {
      return <FileText className="text-purple-400" />;
    } else if (mimetype.includes("spreadsheet") || mimetype.includes("excel")) {
      return <FileText className="text-green-400" />;
    } else if (mimetype.includes("zip") || mimetype.includes("compressed")) {
      return <FileText className="text-orange-400" />;
    }
    return <FileText className="text-blue-400" />;
  };

  // Filter documents by search term and type
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.originalname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.uploaderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase());

    if (fileTypeFilter === "all") return matchesSearch;
    return matchesSearch && doc.mimetype.includes(fileTypeFilter);
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-950">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-t-blue-500 border-blue-500/30 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-400">Loading documents...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 text-white">
     {userRole === 'teacher' ? <NavDashT /> : <NavDash />}

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
              <FileUp className="text-blue-400" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Shared Document Repository
              </span>
            </h1>
            <p className="text-gray-400 mt-1">
              Upload and access shared documents for students and teachers
            </p>
          </motion.div>

          {/* Upload Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8 bg-slate-800/50 rounded-xl p-5 border border-slate-700/50"
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Upload size={20} className="text-blue-400" />
              Upload New Document
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name input */}
              <div>
                <label className="text-sm font-medium text-gray-300 mb-1 block">
                  Your Name (optional)
                </label>
                <input
                  type="text"
                  value={uploaderName}
                  onChange={(e) => setUploaderName(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                />
              </div>

              {/* Description input */}
              <div>
                <label className="text-sm font-medium text-gray-300 mb-1 block">
                  Document Description (optional)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px] resize-none"
                  placeholder="Add a description for this document"
                />
              </div>

              {/* File selection */}
              {selectedFile && (
                <div className="bg-slate-700/50 rounded-lg p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText size={18} className="text-blue-400" />
                    <span className="text-sm truncate max-w-md">
                      {selectedFile.name}
                    </span>
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
                  <span>Select File</span>
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
                  disabled={isUploading || !selectedFile}
                  className={`px-6 py-2.5 rounded-lg flex items-center gap-2 ${
                    isUploading || !selectedFile
                      ? "bg-blue-600/50 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  } transition-colors`}
                >
                  {isUploading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <Upload size={16} />
                      <span>Upload Document</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6 flex flex-wrap gap-4 items-center"
          >
            <div className="relative flex-grow">
              <Search
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-400" />
              <select
                value={fileTypeFilter}
                onChange={(e) => setFileTypeFilter(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Files</option>
                <option value="pdf">PDF Documents</option>
                <option value="image">Images</option>
                <option value="word">Word Documents</option>
                <option value="excel">Spreadsheets</option>
                <option value="zip">Archives</option>
              </select>
            </div>
          </motion.div>

          {/* Document List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden"
          >
            <div className="p-4 border-b border-slate-700 bg-slate-800">
              <h2 className="font-semibold">Available Documents</h2>
            </div>

            {filteredDocuments.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <FileText size={48} className="text-gray-500 mb-4" />
                <p className="text-gray-400">No documents found</p>
                {searchTerm && (
                  <p className="text-gray-500 text-sm mt-2">
                    Try changing your search terms
                  </p>
                )}
              </div>
            ) : (
              <div className="divide-y divide-slate-700">
                {filteredDocuments.map((doc) => (
                  <div
                    key={doc._id}
                    className="p-4 hover:bg-slate-800/70 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="bg-slate-700 p-2 rounded mt-1">
                          {getFileIcon(doc.mimetype)}
                        </div>
                        <div>
                          <h3 className="font-medium text-white">
                            {doc.originalname}
                          </h3>
                          {doc.description && (
                            <p className="text-gray-400 text-sm mt-1">
                              {doc.description}
                            </p>
                          )}
                          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <span className="text-gray-400">
                                Uploaded by:
                              </span>{" "}
                              {doc.uploaderName || "Anonymous"}
                            </span>
                            <span className="flex items-center gap-1">
                              <span className="text-gray-400">Size:</span>{" "}
                              {formatFileSize(doc.size)}
                            </span>
                            <span className="flex items-center gap-1">
                              <span className="text-gray-400">Date:</span>{" "}
                              {formatDate(doc.uploadDate)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDownload(doc)}
                        className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors p-1"
                      >
                        <Download size={18} />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default SharedDocumentsPage;

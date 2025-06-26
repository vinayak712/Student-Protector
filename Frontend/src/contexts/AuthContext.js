import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { studentAuthStore } from '../api/studentAuthStore';
import { teacherAuthStore } from '../api/teacherAuthStore';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const { studentUser, fetchStudentInfo } = studentAuthStore();
  const { teacherUser, fetchTeacherInfo } = teacherAuthStore();
  const navigate = useNavigate();
  
  // Determine auth status
  const isAuthenticated = studentUser || teacherUser;
  const userRole = teacherUser ? 'teacher' : studentUser ? 'student' : null;
  const currentUser = teacherUser || studentUser;

  // Handle redirects based on role
  const redirectToUserDashboard = (role = userRole) => {
    if (role === 'teacher') {
      navigate('/teacherDash');
    } else if (role === 'student') {
      navigate('/dashboard');
    }
  };

  // Auth check on mount
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        await Promise.all([fetchStudentInfo(), fetchTeacherInfo()]);
      } catch (error) {
        console.error("Authentication check failed:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, [fetchStudentInfo, fetchTeacherInfo]);

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated,
      userRole,
      currentUser,
      isLoading,
      redirectToUserDashboard,
      studentUser,
      teacherUser
    }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export const useAuth = () => useContext(AuthContext);
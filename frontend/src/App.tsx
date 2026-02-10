import { BrowserRouter, Routes, Route } from 'react-router';
import AppLayout from './ui/AppLayout';
import Departments from './pages/Departments';
import { Toaster } from 'react-hot-toast';
import Subjects from './pages/Subjects';
import ProtectedRoute from './ui/ProtectedRoute';
import Faculty from './pages/Faculty';
import Classes from './pages/Classes';
import Enrollments from './pages/Enrollments';
import ClassShow from './pages/ClassShow';
import DepartmentShow from './pages/DepartmentShow';
import SubjectShow from './pages/SubjectShow';
import FacultyShow from './pages/FacultyShow';
import Home from './pages/Home';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Login from './pages/Login';
import Signup from './pages/Signup';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/departments" element={<Departments />} />
              <Route path="/subjects" element={<Subjects />} />
              <Route path="/faculty" element={<Faculty />} />
              <Route path="/enrollments" element={<Enrollments />} />
              <Route path="/classes" element={<Classes />} />
              <Route path="/classes/:id" element={<ClassShow />} />
              <Route path="/departments/:id" element={<DepartmentShow />} />
              <Route path="/subjects/:id" element={<SubjectShow />} />
              <Route path="/faculty/:id" element={<FacultyShow />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            duration: 3000
          },
          error: {
            duration: 5000
          },
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
            backgroundColor: 'var(--background)',
            color: 'var(--foreground)'
          }
        }}
      />
    </>
  );
};

export default App;

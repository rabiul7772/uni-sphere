import { Suspense, lazy } from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes, Route } from 'react-router';
import { Spinner } from '@/components/ui/spinner';

import AppLayout from './ui/AppLayout';
import ProtectedRoute from './ui/ProtectedRoute';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const Departments = lazy(() => import('./pages/Departments'));
const DepartmentShow = lazy(() => import('./pages/DepartmentShow'));
const Subjects = lazy(() => import('./pages/Subjects'));
const SubjectShow = lazy(() => import('./pages/SubjectShow'));
const Faculty = lazy(() => import('./pages/Faculty'));
const FacultyShow = lazy(() => import('./pages/FacultyShow'));
const Classes = lazy(() => import('./pages/Classes'));
const ClassShow = lazy(() => import('./pages/ClassShow'));
const Enrollments = lazy(() => import('./pages/Enrollments'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="h-screen w-full flex items-center justify-center">
              <Spinner size="xl" />
            </div>
          }
        >
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
        </Suspense>
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

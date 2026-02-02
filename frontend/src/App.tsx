import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import AppLayout from './ui/AppLayout';
import Departments from './pages/Departments';
import { Toaster } from 'react-hot-toast';
import Subjects from './pages/Subjects';
import ProtectedRoute from './ui/ProtectedRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Faculty from './pages/Faculty';

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
              <Route path="/enrollments" element={<div>Enrollments</div>} />
              <Route path="/classes" element={<div>Classes</div>} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
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

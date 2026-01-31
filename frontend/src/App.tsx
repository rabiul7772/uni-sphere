import { BrowserRouter, Routes, Route } from 'react-router';
import AppLayout from './ui/AppLayout';
import Departments from './pages/Departments';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<div>Home</div>} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/subjects" element={<div>Subjects</div>} />
            <Route path="/faculty" element={<div>Faculty</div>} />
            <Route path="/enrollments" element={<div>Enrollments</div>} />
            <Route path="/classes" element={<div>Classes</div>} />
          </Routes>
        </AppLayout>
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

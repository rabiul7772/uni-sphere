import { BrowserRouter, Routes, Route } from 'react-router';
import AppLayout from './ui/AppLayout';
import Departments from './pages/Departments';

const App = () => {
  return (
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
  );
};

export default App;

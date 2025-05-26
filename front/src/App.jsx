import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './Pages/Home_Page';
import { LoginForm, RegisterForm } from './components/sc-form';
import { Navigation } from './components/navigation';
import { About } from './Pages/about';
import { Education } from './Pages/education';
import { UploadPenyakit } from './pages/UploadPenyakit';

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        {/* Routes yang menggunakan layout Navigation */}
        <Route path="/" element={<Navigation />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<About />} />
          <Route path="education" element={<Education />} />
          <Route path="upload-penyakit" element={<UploadPenyakit />} />
        </Route>

        {/* Routes tanpa Navigation */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

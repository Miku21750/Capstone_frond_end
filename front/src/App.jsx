<<<<<<< HEAD
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './Pages/Home_Page';
import { LoginForm, RegisterForm } from './components/sc-form';
import { Navigation } from './components/navigation';
import { About } from './Pages/about';
import { Education } from './Pages/education';
import { UploadPenyakit } from './pages/UploadPenyakit';

=======
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import { HomePage } from './Pages/Home_Page'
import { LoginForm, RegisterForm } from './components/sc-form'
import { Navigation } from './components/navigation'
import { About } from './Pages/about'
import Education from './Pages/Education'
import { 
  AskDermatologist, 
  DailySkincareRoutine, 
  Faqs, 
  HygieneAdvice, 
  LifestyleChoices, 
  MythsFact, 
  NaturalRemedies, 
  OverTheCounter, 
  Overviewinfo, 
  Prescription, 
  ResourcesReferences, 
  SkinCondition,
  SunProtection, 
  WhenToSeekHelp 
} from './components/education-info'
>>>>>>> upstream/main
function App() {
  const [count, setCount] = useState(0);

  return (
<<<<<<< HEAD
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
=======
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigation />}>
            <Route index element={<HomePage />} />
            <Route path='/about' element={<About />} />
          </Route>
          <Route path='/education' element={<Education />} >
            <Route index element={<Overviewinfo/>}/>
            <Route path='/education/prevention-tips/daily-skincare-routine' element={<DailySkincareRoutine />}></Route>
            <Route path='/education/prevention-tips/hygiene-advice' element={<HygieneAdvice />}></Route>
            <Route path='/education/skin-conditions/:name' element={<SkinCondition />}></Route>
            <Route path='/education/prevention-tips/lifestyle-choices' element={<LifestyleChoices />}></Route>
            <Route path='/education/prevention-tips/sun-protection' element={<SunProtection />}></Route>

            <Route path='/education/treatment-option/over-the-counter' element={<OverTheCounter/>}/>
            <Route path='/education/treatment-option/prescription' element={<Prescription/>}/>
            <Route path='/education/treatment-option/natural-remedies' element={<NaturalRemedies/>}/>
            <Route path='/education/treatment-option/when-to-seek-help' element={<WhenToSeekHelp/>}/>

            <Route path='/education/treatment-option/when-to-seek-help' element={<WhenToSeekHelp/>}/>
            <Route path="/education/other/myths-facts" element={<MythsFact/>}/>
            <Route path="/education/other/faqs" element={<Faqs/>}/>
            <Route path="/education/other/resources-references" element={<ResourcesReferences/>}/>
            <Route path="/education/other/ask-a-dermatologist" element={<AskDermatologist/>}/>
          </Route>
          <Route path='/login' element={<LoginForm />}></Route>
          <Route path='/register' element={<RegisterForm />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
>>>>>>> upstream/main
}

export default App;

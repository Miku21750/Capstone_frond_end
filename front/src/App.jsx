import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { HomePage } from './Pages/Home_Page';
import { LoginForm, RegisterForm } from './components/sc-form';
import { Navigation } from './components/navigation';
import { About } from './Pages/about';
import { UploadPenyakit } from './pages/UploadPenyakit';
import GateKeeping from './utils/GateKeeping';
import EducationalVideos, { 
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
import { Dashboard } from './Pages/Dashboard';
import Information from './Pages/Information';
import { FeedbackPage } from './components/feedbacks';
import { NearbyClinics } from './Pages/Maps';
import Terms from './Pages/Terms';
import PrivacyPage from './Pages/Privacy';
import CookiePage from './Pages/Cookies';
function App() {
  return (
    <>
          <Routes>
            <Route path='/' element={<Navigation />}>
            <Route index element={<HomePage />} />
            <Route path='/about' element={<About />} />
            <Route path='/feedback' element={<FeedbackPage />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/cookieterm" element={<CookiePage />} />
          </Route>
          <Route path='/education' element={<Information />} >
            <Route index element={<Overviewinfo/>}/>
            <Route path='/education/educational-video' element={<EducationalVideos/>}></Route>
            <Route path='/education/prevention-tips/daily-skincare-routine' element={<DailySkincareRoutine />}></Route>
            <Route path='/education/prevention-tips/hygiene-advice' element={<HygieneAdvice />}></Route>
            <Route path='/education/skin-conditions/:name' element={<SkinCondition />}></Route>
            <Route path='/education/prevention-tips/lifestyle-choices' element={<LifestyleChoices />}></Route>
            <Route path='/education/prevention-tips/sun-protection' element={<SunProtection />}></Route>

            <Route path='/education/treatment-option/over-the-counter' element={<OverTheCounter/>}/>
            <Route path='/education/treatment-option/prescription' element={<Prescription/>}/>
            <Route path='/education/treatment-option/natural-remedies' element={<NaturalRemedies/>}/>
            <Route path='/education/treatment-option/when-to-seek-help' element={<WhenToSeekHelp/>}/>

            <Route path="/education/other/myths-facts" element={<MythsFact/>}/>
            <Route path="/education/other/faqs" element={<Faqs/>}/>
            <Route path="/education/other/resources-references" element={<ResourcesReferences/>}/>
            <Route path="/education/other/ask-a-dermatologist" element={<AskDermatologist/>}/>
          </Route>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/maps' element={<NearbyClinics/>}></Route>
          <Route path='/login' element={<LoginForm />}></Route>
          <Route path='/register' element={<RegisterForm />}></Route>
          
          <Route element={<GateKeeping />}>
            <Route path='/upload-penyakit' element={<UploadPenyakit />}/>
          </Route>
        </Routes>
    </>
  )
}

export default App;

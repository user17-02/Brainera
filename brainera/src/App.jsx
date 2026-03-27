import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import CoursesPage from './pages/CoursesPage';
import CourseDetail from './pages/CourseDetail';
import Team from './pages/Team';
import PricingPage from './pages/PricingPage';
import TestimonialsPage from './pages/TestimonialsPage';
import FAQPage from './pages/FAQPage';
import BlogPage from './pages/BlogPage';
import ContactUs from './pages/ContactUs';
import LoginRegister from './pages/LoginRegister'; // Import LoginRegister component
import AdminDashboard from './pages/AdminDashboard'; // Import AdminDashboard component
import UserManagement from './pages/UserManagement';
import CourseManagement from './pages/CourseManagement';
import EnrollmentManagement from './pages/EnrollmentManagement';
import ReviewManagement from './pages/ReviewManagement';
import PaymentPage from './pages/PaymentPage'; // New import
import AdminDashboardOverview from './pages/AdminDashboardOverview'; // New import
import LearningDashboard from './pages/LearningDashboard'; // Import LearningDashboard component
import InstructorDashboard from './pages/InstructorDashboard'; // Import InstructorDashboard component
import InstructorMyCourses from './pages/InstructorMyCourses'; // Import InstructorMyCourses component
import InstructorEnrolledStudents from './pages/InstructorEnrolledStudents'; // <-- NEW IMPORT
import InstructorCourseReviews from './pages/InstructorCourseReviews'; // NEW IMPORT for instructor course reviews
import InstructorDashboardOverview from './pages/InstructorDashboardOverview'; // NEW IMPORT for default instructor route
import ProtectedRoute from './components/ProtectedRoute'; // NEW IMPORT for ProtectedRoute

// Force rebuild
function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isInstructorRoute = location.pathname.startsWith('/instructor');


  return (
    <div className="d-flex flex-column min-vh-100"> {/* Make entire app a flex column */}
      {!isAdminRoute && !isInstructorRoute && <Header />}
      <main className="flex-grow-1"> {/* Main content area takes available space */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/course-detail/:courseId" element={<CourseDetail />} />
          <Route path="/team" element={<Team />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/login-register" element={<LoginRegister />} />
          <Route path="/checkout/:courseId" element={<PaymentPage />} /> {/* New Payment Route */}
          <Route path="/my-learning" element={<LearningDashboard />} /> {/* New Learning Dashboard Route */}
          
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin" element={<AdminDashboard />}>
                <Route index element={<AdminDashboardOverview />} /> {/* Default child for /admin */}
                <Route path="users" element={<UserManagement />} />
                <Route path="courses" element={<CourseManagement />} />
                <Route path="enrollments" element={<EnrollmentManagement />} />
                <Route path="reviews" element={<ReviewManagement />} />
            </Route>
          </Route>

          {/* Instructor Dashboard Routes */}
          <Route element={<ProtectedRoute allowedRoles={['instructor']} />}>
            <Route path="/instructor" element={<InstructorDashboard />}>
              <Route index element={<InstructorDashboardOverview />} /> {/* Default child for /instructor */}
              <Route path="my-courses" element={<InstructorMyCourses />} />
              <Route path="my-courses/:courseId/students" element={<InstructorEnrolledStudents />} />
              <Route path="my-courses/:courseId/reviews" element={<InstructorCourseReviews />} />
            </Route>
          </Route>
        </Routes>
      </main>
      {!isAdminRoute && !isInstructorRoute && <Footer />}
    </div>
  );
}

export default App;

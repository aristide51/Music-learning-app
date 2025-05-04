import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Payment from './pages/Payment';
import PaymentConfirmation from './pages/PaymentConfirmation';
import AdminDashboard from './pages/AdminDashboard';
import AdminCourses from './pages/AdminCourses';
import AdminUsers from './pages/AdminUsers';
import AdminPayments from './pages/AdminPayments';
import Support from './pages/Support';
import FAQ from './pages/FAQ';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100 flex flex-col">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:id" element={<CourseDetail />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/payment/confirmation" element={<PaymentConfirmation />} />
              <Route path="/admin" element={
                <ProtectedAdminRoute>
                  <AdminDashboard />
                </ProtectedAdminRoute>
              } />
              <Route path="/admin/courses" element={
                <ProtectedAdminRoute>
                  <AdminCourses />
                </ProtectedAdminRoute>
              } />
              <Route path="/admin/users" element={
                <ProtectedAdminRoute>
                  <AdminUsers />
                </ProtectedAdminRoute>
              } />
              <Route path="/admin/payments" element={
                <ProtectedAdminRoute>
                  <AdminPayments />
                </ProtectedAdminRoute>
              } />
              <Route path="/support" element={<Support />} />
              <Route path="/faq" element={<FAQ />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App; 
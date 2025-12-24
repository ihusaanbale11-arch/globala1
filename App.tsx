
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './components/PublicLayout';
import AdminLayout from './components/AdminLayout';
import Home from './pages/public/Home';
import About from './pages/public/About';
import Services from './pages/public/Services';
import Jobs from './pages/public/Jobs';
import Candidates from './pages/public/Candidates';
import Contact from './pages/public/Contact';
import RequestManpower from './pages/public/RequestManpower';
import ClientDashboard from './pages/public/ClientDashboard';
import CandidateDashboard from './pages/public/CandidateDashboard';
import AgentDashboard from './pages/public/AgentDashboard';
import { AuthPage } from './pages/AuthPages';

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import CandidateManagement from './pages/admin/CandidateManagement';
import ClientManagement from './pages/admin/ClientManagement';
import AgentManagement from './pages/admin/AgentManagement';
import InquiryManagement from './pages/admin/InquiryManagement';
import ApplicationManagement from './pages/admin/ApplicationManagement';
import VacancyManagement from './pages/admin/VacancyManagement';
import RecruitedCandidateManagement from './pages/admin/RecruitedCandidateManagement';

// Enterprise Finance Modules
import FinanceDashboard from './pages/admin/FinanceDashboard';
import FinanceInvoicing from './pages/admin/FinanceInvoicing';
import FinanceInvoiceDetail from './pages/admin/FinanceInvoiceDetail';
import FinanceExpenses from './pages/admin/FinanceExpenses';

// WEBSITE MANAGEMENT SYSTEM (CMS)
import WebsiteDashboard from './pages/admin/WebsiteManagement/Dashboard';
import PageBuilder from './pages/admin/WebsiteManagement/PageBuilder';
import BlogManager from './pages/admin/WebsiteManagement/BlogManager';
import TestimonialManager from './pages/admin/WebsiteManagement/TestimonialManager';
import TeamManager from './pages/admin/WebsiteManagement/TeamManager';

// USER MANAGEMENT SYSTEM
import CandidateProfileManager from './pages/admin/WebsiteManagement/UserManagement/CandidateProfileManager';
import ClientVerification from './pages/admin/WebsiteManagement/UserManagement/ClientVerification';
import AgentVerification from './pages/admin/WebsiteManagement/UserManagement/AgentVerification';
import NewsletterBuilder from './pages/admin/WebsiteManagement/UserManagement/NewsLetterBuilder';
import UserAnalytics from './pages/admin/WebsiteManagement/UserManagement/UserAnalytics';
import CommunicationOrchestrator from './pages/admin/WebsiteManagement/UserManagement/CommunicationOrchestrator';

import ProtectedRoute from './components/ProtectedRoute';
import { DataProvider } from './context/DataContext';

function App() {
  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="jobs" element={<Jobs />} />
            <Route path="candidates" element={<Candidates />} />
            <Route path="contact" element={<Contact />} />
            <Route path="request-manpower" element={<ProtectedRoute role="client"><RequestManpower /></ProtectedRoute>} />
            <Route path="client/dashboard" element={<ProtectedRoute role="client"><ClientDashboard /></ProtectedRoute>} />
            <Route path="candidate/dashboard" element={<ProtectedRoute role="candidate"><CandidateDashboard /></ProtectedRoute>} />
            <Route path="agent/dashboard" element={<ProtectedRoute role="agent"><AgentDashboard /></ProtectedRoute>} />
          </Route>

          <Route path="/login" element={<AuthPage type="login" role="client" />} />
          <Route path="/register" element={<AuthPage type="register" role="client" />} />
          <Route path="/candidate/login" element={<AuthPage type="login" role="candidate" />} />
          <Route path="/candidate/register" element={<AuthPage type="register" role="candidate" />} />
          <Route path="/agent/login" element={<AuthPage type="login" role="agent" />} />
          <Route path="/agent/register" element={<AuthPage type="register" role="agent" />} />
          <Route path="/admin/login" element={<AuthPage type="login" role="admin" />} />

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="candidates" element={<CandidateManagement />} />
            <Route path="clients" element={<ClientManagement />} />
            <Route path="agents" element={<AgentManagement />} />
            <Route path="vacancies" element={<VacancyManagement />} />
            <Route path="applications" element={<ApplicationManagement />} />
            <Route path="inquiries" element={<InquiryManagement />} />
            <Route path="recruited-candidates" element={<RecruitedCandidateManagement />} />
            <Route path="finance/dashboard" element={<FinanceDashboard />} />
            <Route path="finance/invoices" element={<FinanceInvoicing />} />
            <Route path="finance/invoices/:id" element={<FinanceInvoiceDetail />} />
            <Route path="finance/expenses" element={<FinanceExpenses />} />

            {/* WEBSITE & USER MANAGEMENT */}
            <Route path="website/dashboard" element={<WebsiteDashboard />} />
            <Route path="website/pages" element={<PageBuilder />} />
            <Route path="website/blog" element={<BlogManager />} />
            <Route path="website/testimonials" element={<TestimonialManager />} />
            <Route path="website/team" element={<TeamManager />} />
            
            <Route path="website/users/candidates" element={<CandidateProfileManager />} />
            <Route path="website/users/verification" element={<ClientVerification />} />
            <Route path="website/users/agents" element={<AgentVerification />} />
            <Route path="website/users/newsletters" element={<NewsletterBuilder />} />
            <Route path="website/users/analytics" element={<UserAnalytics />} />
            <Route path="website/users/communications" element={<CommunicationOrchestrator />} />
          </Route>
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;

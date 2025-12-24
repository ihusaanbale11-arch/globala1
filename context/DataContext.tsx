
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import alasql from 'alasql';
import { 
  Candidate, Client, Inquiry, DashboardStats, JobApplication, JobVacancy, 
  RecruitedCandidate, Agent, Invoice, Newsletter, CommunicationLog,
  WebPage, BlogPost, Testimonial, TeamMember, Payment, Expense, Budget
} from '../types';
import { MOCK_CANDIDATES, MOCK_CLIENTS, MOCK_INQUIRIES, MOCK_VACANCIES, MOCK_APPLICATIONS, MOCK_RECRUITED_CANDIDATES, MOCK_AGENTS } from '../constants';

interface DataContextType {
  candidates: Candidate[];
  clients: Client[];
  agents: Agent[];
  inquiries: Inquiry[];
  jobApplications: JobApplication[];
  jobVacancies: JobVacancy[];
  recruitedCandidates: RecruitedCandidate[];
  invoices: Invoice[];
  payments: Payment[];
  expenses: Expense[];
  budgets: Budget[];
  newsletters: Newsletter[];
  commLogs: CommunicationLog[];
  
  // Auth state
  currentUser: Client | null;
  currentCandidate: Candidate | null;
  currentAgent: Agent | null;
  isAdminLoggedIn: boolean;

  // CMS Entities
  webPages: WebPage[];
  blogPosts: BlogPost[];
  testimonials: Testimonial[];
  teamMembers: TeamMember[];
  
  addCandidate: (candidate: Candidate) => void;
  updateCandidate: (candidate: Candidate) => void;
  deleteCandidate: (id: string) => void;
  verifyCandidate: (id: string) => void;
  
  addClient: (client: Client) => void;
  updateClient: (client: Client) => void;
  verifyClient: (id: string) => void;
  deleteClient: (id: string) => void;
  updateClientStatus: (id: string, status: Client['status']) => void;

  addAgent: (agent: Agent) => void;
  updateAgentStatus: (id: string, status: Agent['status']) => void;
  deleteAgent: (id: string) => void;

  addNewsletter: (nl: Newsletter) => void;
  sendNewsletter: (id: string) => void;
  deleteNewsletter: (id: string) => void;

  updateWebPage: (page: WebPage) => void;
  addBlogPost: (post: BlogPost) => void;
  updateBlogPost: (post: BlogPost) => void;
  deleteBlogPost: (id: string) => void;
  addTestimonial: (t: Testimonial) => void;
  updateTestimonialStatus: (id: string, status: Testimonial['status']) => void;
  toggleFeaturedTestimonial: (id: string) => void;
  updateTeamMember: (member: TeamMember) => void;
  addTeamMember: (member: TeamMember) => void;
  deleteTeamMember: (id: string) => void;

  submitJobApplication: (app: JobApplication) => void;
  updateApplicationStatus: (id: string, status: JobApplication['status']) => void;
  addInquiry: (inquiry: Inquiry) => void;
  updateInquiryStatus: (id: string, status: Inquiry['status']) => void;
  replyToInquiry: (id: string, response: string) => void;

  addJobVacancy: (vacancy: JobVacancy) => void;
  deleteJobVacancy: (id: string) => void;

  addRecruitedCandidate: (record: RecruitedCandidate) => void;
  deleteRecruitedCandidate: (id: string) => void;

  // Finance
  addInvoice: (invoice: Invoice) => void;
  addPayment: (payment: Payment) => void;
  addExpense: (expense: Expense) => void;
  updateExpenseStatus: (id: string, status: Expense['status']) => void;
  addBudget: (budget: Budget) => void;
  deleteBudget: (id: string) => void;

  logAction: (action: string, module: string, details: string) => void;
  stats: DashboardStats;
  
  loginAdmin: () => void;
  logoutAdmin: () => void;
  loginClient: (client: Client) => void;
  logoutClient: () => void;
  loginCandidate: (cand: Candidate) => void;
  logoutCandidate: () => void;
  loginAgent: (agent: Agent) => void;
  logoutAgent: () => void;
  
  refreshData: () => void;
  resetToDefaults: () => void;
  clearAllData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const initSQLDatabase = () => {
  alasql('CREATE TABLE IF NOT EXISTS candidates (id STRING, name STRING, email STRING, profession STRING, nationality STRING, experience NUMBER, status STRING, skills JSON, imageUrl STRING, resumeUrl STRING, certificateUrl STRING, agentId STRING, isVerified BOOLEAN, completenessScore NUMBER, communicationPrefs JSON, privacyConsentedDate STRING, lastActive STRING)');
  alasql('CREATE TABLE IF NOT EXISTS clients (id STRING, companyName STRING, contactPerson STRING, email STRING, status STRING, billingTerms STRING, isVerified BOOLEAN, businessLicenseUrl STRING, verificationNotes STRING)');
  alasql('CREATE TABLE IF NOT EXISTS agents (id STRING, agencyName STRING, contactPerson STRING, email STRING, phone STRING, country STRING, status STRING)');
  alasql('CREATE TABLE IF NOT EXISTS inquiries (id STRING, name STRING, email STRING, subject STRING, message STRING, status STRING, date STRING, response STRING)');
  alasql('CREATE TABLE IF NOT EXISTS jobVacancies (id STRING, title STRING, location STRING, type STRING, salary STRING, description STRING)');
  alasql('CREATE TABLE IF NOT EXISTS jobApplications (id STRING, vacancyId STRING, vacancyTitle STRING, applicantName STRING, email STRING, phone STRING, experience STRING, resumeUrl STRING, status STRING, date STRING)');
  alasql('CREATE TABLE IF NOT EXISTS recruitedCandidates (id STRING, name STRING, passportNumber STRING, nationality STRING, designation STRING, employer STRING, arrivalDate STRING, addedBy STRING, passportPhotoUrl STRING, workPermitUrl STRING)');
  alasql('CREATE TABLE IF NOT EXISTS invoices (id STRING, invoiceNumber STRING, clientId STRING, clientName STRING, issueDate STRING, dueDate STRING, status STRING, currency STRING, totalAmount NUMBER, isRecurring BOOLEAN, notes STRING)');
  alasql('CREATE TABLE IF NOT EXISTS payments (id STRING, invoiceId STRING, amount NUMBER, paymentDate STRING, method STRING, reference STRING, reconciled BOOLEAN)');
  alasql('CREATE TABLE IF NOT EXISTS expenses (id STRING, title STRING, vendor STRING, amount NUMBER, currency STRING, date STRING, category STRING, budgetId STRING, status STRING, submittedBy STRING, aiProcessed BOOLEAN, policyViolation STRING, notes STRING)');
  alasql('CREATE TABLE IF NOT EXISTS budgets (id STRING, category STRING, department STRING, allocated NUMBER, spent NUMBER, remaining NUMBER, period STRING)');
  alasql('CREATE TABLE IF NOT EXISTS newsletters (id STRING, subject STRING, content STRING, targetAudience STRING, status STRING, sentDate STRING, stats JSON)');
  alasql('CREATE TABLE IF NOT EXISTS commLogs (id STRING, userId STRING, userName STRING, type STRING, direction STRING, subject STRING, timestamp STRING, status STRING)');
  
  alasql('CREATE TABLE IF NOT EXISTS webPages (id STRING, title STRING, slug STRING, blocks JSON, status STRING, seo JSON, lastModified STRING)');
  alasql('CREATE TABLE IF NOT EXISTS blogPosts (id STRING, title STRING, excerpt STRING, content STRING, author STRING, category STRING, tags JSON, featuredImage STRING, status STRING, publishDate STRING, readTime STRING, seoScore NUMBER)');
  alasql('CREATE TABLE IF NOT EXISTS testimonials (id STRING, authorName STRING, position STRING, company STRING, content STRING, rating NUMBER, imageUrl STRING, videoUrl STRING, industry STRING, isFeatured BOOLEAN, status STRING, date STRING)');
  alasql('CREATE TABLE IF NOT EXISTS teamMembers (id STRING, name STRING, role STRING, department STRING, bio STRING, imageUrl STRING, skills JSON, socialLinks JSON, sortOrder NUMBER, isPublic BOOLEAN)');

  const savedData = localStorage.getItem('glow_tours_unified_db');
  if (savedData) {
    try {
      alasql.tables = JSON.parse(savedData);
    } catch (e) { seedDatabase(); }
  } else { seedDatabase(); }
};

const seedDatabase = () => {
  alasql('DELETE FROM candidates');
  alasql('DELETE FROM clients');
  alasql('DELETE FROM agents');
  alasql('DELETE FROM inquiries');
  alasql('DELETE FROM jobVacancies');
  alasql('DELETE FROM jobApplications');
  alasql('DELETE FROM recruitedCandidates');
  alasql('DELETE FROM newsletters');
  alasql('DELETE FROM webPages');
  alasql('DELETE FROM blogPosts');
  alasql('DELETE FROM testimonials');
  alasql('DELETE FROM teamMembers');

  MOCK_CANDIDATES.forEach(c => alasql('INSERT INTO candidates VALUES ?', [{
    ...c, 
    isVerified: c.isVerified ?? Math.random() > 0.5, 
    completenessScore: c.completenessScore ?? Math.floor(Math.random() * 40) + 60,
    communicationPrefs: c.communicationPrefs ?? { email: true, sms: false, whatsapp: true },
    privacyConsentedDate: c.privacyConsentedDate ?? '2023-01-01',
    lastActive: c.lastActive ?? '2023-11-20'
  }]));
  
  MOCK_CLIENTS.forEach(c => alasql('INSERT INTO clients VALUES ?', [{
    ...c, 
    isVerified: c.isVerified ?? (c.status === 'Active'),
    businessLicenseUrl: '',
    verificationNotes: ''
  }]));

  MOCK_AGENTS.forEach(a => alasql('INSERT INTO agents VALUES ?', [a]));
  MOCK_INQUIRIES.forEach(i => alasql('INSERT INTO inquiries VALUES ?', [i]));
  MOCK_VACANCIES.forEach(v => alasql('INSERT INTO jobVacancies VALUES ?', [v]));
  MOCK_APPLICATIONS.forEach(a => alasql('INSERT INTO jobApplications VALUES ?', [a]));
  MOCK_RECRUITED_CANDIDATES.forEach(r => alasql('INSERT INTO recruitedCandidates VALUES ?', [r]));

  alasql('INSERT INTO newsletters VALUES ?', [{
    id: 'nl1', subject: 'Welcome to Glow Tours', content: 'Our new portal is live...', targetAudience: 'All', status: 'Sent', sentDate: '2023-10-15', stats: { opens: 450, clicks: 120, delivered: 480 }
  }]);

  saveDatabase();
};

const saveDatabase = () => {
  localStorage.setItem('glow_tours_unified_db', JSON.stringify(alasql.tables));
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [jobVacancies, setJobVacancies] = useState<JobVacancy[]>([]);
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);
  const [recruitedCandidates, setRecruitedCandidates] = useState<RecruitedCandidate[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [commLogs, setCommLogs] = useState<CommunicationLog[]>([]);
  const [webPages, setWebPages] = useState<WebPage[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => localStorage.getItem('isAdminLoggedIn') === 'true');
  const [currentUser, setCurrentUser] = useState<Client | null>(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  });
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(() => {
    const saved = localStorage.getItem('currentCandidate');
    return saved ? JSON.parse(saved) : null;
  });
  const [currentAgent, setCurrentAgent] = useState<Agent | null>(() => {
    const saved = localStorage.getItem('currentAgent');
    return saved ? JSON.parse(saved) : null;
  });

  const refreshData = useCallback(() => {
    // Crucial Fix: Add || [] to every alasql query to ensure state is never undefined
    setCandidates(alasql('SELECT * FROM candidates') || []);
    setClients(alasql('SELECT * FROM clients') || []);
    setAgents(alasql('SELECT * FROM agents') || []);
    setInquiries(alasql('SELECT * FROM inquiries') || []);
    setJobVacancies(alasql('SELECT * FROM jobVacancies') || []);
    setJobApplications(alasql('SELECT * FROM jobApplications') || []);
    setRecruitedCandidates(alasql('SELECT * FROM recruitedCandidates') || []);
    setInvoices(alasql('SELECT * FROM invoices') || []);
    setPayments(alasql('SELECT * FROM payments') || []);
    setExpenses(alasql('SELECT * FROM expenses') || []);
    setBudgets(alasql('SELECT * FROM budgets') || []);
    setNewsletters(alasql('SELECT * FROM newsletters') || []);
    setCommLogs(alasql('SELECT * FROM commLogs') || []);
    setWebPages(alasql('SELECT * FROM webPages') || []);
    setBlogPosts(alasql('SELECT * FROM blogPosts') || []);
    setTestimonials(alasql('SELECT * FROM testimonials') || []);
    setTeamMembers(alasql('SELECT * FROM teamMembers') || []);
  }, []);

  useEffect(() => { initSQLDatabase(); refreshData(); }, [refreshData]);

  const exec = (sql: string, params?: any[]) => {
    try { alasql(sql, params); saveDatabase(); refreshData(); } catch (e) { console.error("SQL Error:", e); }
  };

  const addCandidate = useCallback((c: Candidate) => exec('INSERT INTO candidates VALUES ?', [{
    ...c,
    isVerified: c.isVerified ?? false,
    completenessScore: c.completenessScore ?? 40,
    communicationPrefs: c.communicationPrefs ?? { email: true, sms: false, whatsapp: false },
    privacyConsentedDate: c.privacyConsentedDate ?? new Date().toISOString().split('T')[0],
    lastActive: c.lastActive ?? new Date().toISOString().split('T')[0]
  }]), []);
  const updateCandidate = useCallback((c: Candidate) => { alasql('DELETE FROM candidates WHERE id = ?', [c.id]); exec('INSERT INTO candidates VALUES ?', [c]); }, []);
  const verifyCandidate = useCallback((id: string) => exec('UPDATE candidates SET isVerified = true WHERE id = ?', [id]), []);
  const deleteCandidate = useCallback((id: string) => exec('DELETE FROM candidates WHERE id = ?', [id]), []);

  const addClient = useCallback((c: Client) => exec('INSERT INTO clients VALUES ?', [{
    ...c,
    isVerified: c.isVerified ?? false,
    businessLicenseUrl: c.businessLicenseUrl ?? '',
    verificationNotes: c.verificationNotes ?? ''
  }]), []);
  const updateClient = useCallback((c: Client) => { alasql('DELETE FROM clients WHERE id = ?', [c.id]); exec('INSERT INTO clients VALUES ?', [c]); }, []);
  const verifyClient = useCallback((id: string) => exec('UPDATE clients SET isVerified = true, status = "Active" WHERE id = ?', [id]), []);
  const deleteClient = useCallback((id: string) => exec('DELETE FROM clients WHERE id = ?', [id]), []);
  const updateClientStatus = useCallback((id: string, s: Client['status']) => exec('UPDATE clients SET status = ? WHERE id = ?', [s, id]), []);

  const addAgent = useCallback((a: Agent) => exec('INSERT INTO agents VALUES ?', [a]), []);
  const updateAgentStatus = useCallback((id: string, s: Agent['status']) => exec('UPDATE agents SET status = ? WHERE id = ?', [s, id]), []);
  const deleteAgent = useCallback((id: string) => exec('DELETE FROM agents WHERE id = ?', [id]), []);

  const submitJobApplication = useCallback((a: JobApplication) => exec('INSERT INTO jobApplications VALUES ?', [a]), []);
  const updateApplicationStatus = useCallback((id: string, s: JobApplication['status']) => exec('UPDATE jobApplications SET status = ? WHERE id = ?', [s, id]), []);

  const addInquiry = useCallback((i: Inquiry) => exec('INSERT INTO inquiries VALUES ?', [i]), []);
  const updateInquiryStatus = useCallback((id: string, s: Inquiry['status']) => exec('UPDATE inquiries SET status = ? WHERE id = ?', [s, id]), []);
  const replyToInquiry = useCallback((id: string, response: string) => exec('UPDATE inquiries SET status = "Replied", response = ? WHERE id = ?', [response, id]), []);

  const addJobVacancy = useCallback((v: JobVacancy) => exec('INSERT INTO jobVacancies VALUES ?', [v]), []);
  const deleteJobVacancy = useCallback((id: string) => exec('DELETE FROM jobVacancies WHERE id = ?', [id]), []);

  const addRecruitedCandidate = useCallback((r: RecruitedCandidate) => exec('INSERT INTO recruitedCandidates VALUES ?', [r]), []);
  const deleteRecruitedCandidate = useCallback((id: string) => exec('DELETE FROM recruitedCandidates WHERE id = ?', [id]), []);

  const addInvoice = useCallback((inv: Invoice) => exec('INSERT INTO invoices VALUES ?', [inv]), []);
  const addPayment = useCallback((p: Payment) => {
    exec('INSERT INTO payments VALUES ?', [p]);
    if (p.reconciled) {
        exec('UPDATE invoices SET status = "Paid" WHERE id = ?', [p.invoiceId]);
    }
  }, []);

  const addExpense = useCallback((e: Expense) => exec('INSERT INTO expenses VALUES ?', [e]), []);
  const updateExpenseStatus = useCallback((id: string, s: Expense['status']) => exec('UPDATE expenses SET status = ? WHERE id = ?', [s, id]), []);
  const addBudget = useCallback((b: Budget) => exec('INSERT INTO budgets VALUES ?', [b]), []);
  const deleteBudget = useCallback((id: string) => exec('DELETE FROM budgets WHERE id = ?', [id]), []);

  const addNewsletter = useCallback((nl: Newsletter) => exec('INSERT INTO newsletters VALUES ?', [nl]), []);
  const sendNewsletter = useCallback((id: string) => exec('UPDATE newsletters SET status = "Sent", sentDate = ? WHERE id = ?', [new Date().toISOString().split('T')[0], id]), []);
  const deleteNewsletter = useCallback((id: string) => exec('DELETE FROM newsletters WHERE id = ?', [id]), []);

  const updateWebPage = useCallback((page: WebPage) => { alasql('DELETE FROM webPages WHERE id = ?', [page.id]); exec('INSERT INTO webPages VALUES ?', [page]); }, []);
  const addBlogPost = useCallback((post: BlogPost) => exec('INSERT INTO blogPosts VALUES ?', [post]), []);
  const updateBlogPost = useCallback((post: BlogPost) => { alasql('DELETE FROM blogPosts WHERE id = ?', [post.id]); exec('INSERT INTO blogPosts VALUES ?', [post]); }, []);
  const deleteBlogPost = useCallback((id: string) => exec('DELETE FROM blogPosts WHERE id = ?', [id]), []);
  const addTestimonial = useCallback((t: Testimonial) => exec('INSERT INTO testimonials VALUES ?', [t]), []);
  const updateTestimonialStatus = useCallback((id: string, s: Testimonial['status']) => exec('UPDATE testimonials SET status = ? WHERE id = ?', [s, id]), []);
  const toggleFeaturedTestimonial = useCallback((id: string) => {
   const result = alasql<{ isFeatured: boolean }[]>('SELECT isFeatured FROM testimonials WHERE id = ?', [id]);
    const t = result[0]?.isFeatured;
  }, []);
  const addTeamMember = useCallback((tm: TeamMember) => exec('INSERT INTO teamMembers VALUES ?', [tm]), []);
  const updateTeamMember = useCallback((tm: TeamMember) => { alasql('DELETE FROM teamMembers WHERE id = ?', [tm.id]); exec('INSERT INTO teamMembers VALUES ?', [tm]); }, []);
  const deleteTeamMember = useCallback((id: string) => exec('DELETE FROM teamMembers WHERE id = ?', [id]), []);

  const logAction = useCallback((action: string, module: string, details: string) => console.log(`[${module}] ${action}: ${details}`), []);
  
  const loginAdmin = useCallback(() => { setIsAdminLoggedIn(true); localStorage.setItem('isAdminLoggedIn', 'true'); }, []);
  const logoutAdmin = useCallback(() => { setIsAdminLoggedIn(false); localStorage.removeItem('isAdminLoggedIn'); }, []);

  const loginClient = useCallback((client: Client) => { setCurrentUser(client); localStorage.setItem('currentUser', JSON.stringify(client)); }, []);
  const logoutClient = useCallback(() => { setCurrentUser(null); localStorage.removeItem('currentUser'); }, []);

  const loginCandidate = useCallback((cand: Candidate) => { setCurrentCandidate(cand); localStorage.setItem('currentCandidate', JSON.stringify(cand)); }, []);
  const logoutCandidate = useCallback(() => { setCurrentCandidate(null); localStorage.removeItem('currentCandidate'); }, []);

  const loginAgent = useCallback((agent: Agent) => { setCurrentAgent(agent); localStorage.setItem('currentAgent', JSON.stringify(agent)); }, []);
  const logoutAgent = useCallback(() => { setCurrentAgent(null); localStorage.removeItem('currentAgent'); }, []);

  const stats: DashboardStats = {
    totalCandidates: candidates.length, 
    activeClients: clients.filter(c => c.status === 'Active').length, 
    pendingInquiries: inquiries.filter(i => i.status === 'New').length, 
    successfulPlacements: recruitedCandidates.length,
  };

  const resetToDefaults = useCallback(() => {
    localStorage.removeItem('glow_tours_unified_db');
    window.location.reload();
  }, []);

  const clearAllData = useCallback(() => {
    alasql('DELETE FROM candidates');
    alasql('DELETE FROM clients');
    alasql('DELETE FROM agents');
    alasql('DELETE FROM inquiries');
    alasql('DELETE FROM jobVacancies');
    alasql('DELETE FROM jobApplications');
    alasql('DELETE FROM recruitedCandidates');
    alasql('DELETE FROM newsletters');
    alasql('DELETE FROM invoices');
    alasql('DELETE FROM payments');
    alasql('DELETE FROM expenses');
    alasql('DELETE FROM budgets');
    saveDatabase();
    refreshData();
  }, [refreshData]);

  return (
    <DataContext.Provider value={{
      candidates, clients, agents, inquiries, jobApplications, jobVacancies, recruitedCandidates, invoices, payments, expenses, budgets, newsletters, commLogs,
      webPages, blogPosts, testimonials, teamMembers,
      currentUser, currentCandidate, currentAgent, isAdminLoggedIn,
      addCandidate, updateCandidate, deleteCandidate, verifyCandidate,
      addClient, updateClient, verifyClient, deleteClient, updateClientStatus,
      addAgent, updateAgentStatus, deleteAgent,
      addNewsletter, sendNewsletter, deleteNewsletter,
      updateWebPage, addBlogPost, updateBlogPost, deleteBlogPost, addTestimonial, updateTestimonialStatus, toggleFeaturedTestimonial, updateTeamMember, addTeamMember, deleteTeamMember,
      submitJobApplication, updateApplicationStatus, addInquiry, updateInquiryStatus, replyToInquiry,
      addJobVacancy, deleteJobVacancy, addRecruitedCandidate, deleteRecruitedCandidate,
      addInvoice, addPayment, addExpense, updateExpenseStatus, addBudget, deleteBudget,
      logAction, stats, 
      loginAdmin, logoutAdmin, loginClient, logoutClient, loginCandidate, logoutCandidate, loginAgent, logoutAgent,
      refreshData, resetToDefaults, clearAllData
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
};

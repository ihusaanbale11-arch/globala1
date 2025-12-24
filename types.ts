
export enum UserRole {
  ADMIN = 'ADMIN',
  CLIENT = 'CLIENT',
  GUEST = 'GUEST',
  CANDIDATE = 'CANDIDATE',
  AGENT = 'AGENT'
}

export interface Agent {
  id: string;
  agencyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  country: string;
  status: 'Active' | 'Pending' | 'Suspended';
}

export type CandidatePipelineStatus = 'Applied' | 'Screened' | 'Interviewed' | 'Offered' | 'Accepted' | 'Onboarding' | 'Placed' | 'Available' | 'Processing' | 'Hired';

export interface Candidate {
  id: string;
  name: string;
  email: string;
  password?: string;
  profession: string;
  nationality: string;
  experience: number;
  status: CandidatePipelineStatus;
  skills: string[];
  imageUrl: string;
  resumeUrl?: string;
  certificateUrl?: string;
  agentId?: string;
  // USER MANAGEMENT ENHANCEMENTS
  isVerified: boolean;
  completenessScore: number;
  communicationPrefs: {
    email: boolean;
    sms: boolean;
    whatsapp: boolean;
  };
  privacyConsentedDate: string;
  lastActive: string;
}

export interface RecruitedCandidate {
  id: string;
  name: string;
  passportNumber: string;
  nationality: string;
  designation: string;
  employer: string;
  arrivalDate: string;
  addedBy: string;
  passportPhotoUrl?: string;
  workPermitUrl?: string;
}

export interface Client {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  status: 'Active' | 'Pending' | 'Suspended';
  billingTerms?: 'Immediate' | 'Net 15' | 'Net 30' | 'Net 60';
  // USER MANAGEMENT ENHANCEMENTS
  isVerified: boolean;
  businessLicenseUrl?: string;
  verificationNotes?: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'New' | 'Replied' | 'Archived';
  date: string;
  response?: string;
}

// NEWSLETTER & COMMUNICATIONS
export interface Newsletter {
  id: string;
  subject: string;
  content: string;
  targetAudience: 'Candidates' | 'Clients' | 'All';
  status: 'Draft' | 'Sent' | 'Scheduled';
  sentDate?: string;
  stats: {
    opens: number;
    clicks: number;
    delivered: number;
  };
}

export interface CommunicationLog {
  id: string;
  userId: string;
  userName: string;
  type: 'Email' | 'SMS' | 'System';
  direction: 'Outbound' | 'Inbound';
  subject: string;
  timestamp: string;
  status: 'Delivered' | 'Failed' | 'Read';
}

// CMS & WEBSITE MANAGEMENT TYPES
export type ContentStatus = 'Draft' | 'Review' | 'Published' | 'Scheduled';

export interface PageBlock {
  id: string;
  type: 'Hero' | 'Features' | 'Stats' | 'CTA' | 'Text' | 'Image';
  content: any;
  order: number;
}

export interface WebPage {
  id: string;
  title: string;
  slug: string;
  blocks: PageBlock[];
  status: ContentStatus;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  lastModified: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  featuredImage: string;
  status: ContentStatus;
  publishDate: string;
  readTime: string;
  seoScore: number;
}

export interface Testimonial {
  id: string;
  authorName: string;
  position: string;
  company: string;
  content: string;
  rating: number;
  imageUrl?: string;
  videoUrl?: string;
  industry: string;
  isFeatured: boolean;
  status: 'Pending' | 'Approved' | 'Rejected';
  date: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: 'Executive' | 'Operations' | 'Recruitment' | 'Finance' | 'IT';
  bio: string;
  imageUrl: string;
  skills: string[];
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
  sortOrder: number;
  isPublic: boolean;
}

// FINANCIAL CORE TYPES
export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
  candidateId?: string;
}

export type InvoiceStatus = 'Draft' | 'Sent' | 'Paid' | 'Overdue' | 'Cancelled' | 'Disputed';

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientId: string;
  clientName: string;
  issueDate: string;
  dueDate: string;
  status: InvoiceStatus;
  currency: 'USD' | 'MVR' | 'EUR';
  exchangeRate: number;
  lineItems: InvoiceLineItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  totalAmount: number;
  isRecurring: boolean;
  recurringFrequency?: 'Monthly' | 'Quarterly' | 'Yearly';
  notes?: string;
  lastReminderSent?: string;
  qrCodeData?: string;
}

export interface Payment {
  id: string;
  invoiceId: string;
  amount: number;
  paymentDate: string;
  method: string;
  reference: string;
  reconciled: boolean;
}

export interface Expense {
  id: string;
  title: string;
  vendor: string;
  amount: number;
  currency: 'USD' | 'MVR';
  date: string;
  category: string;
  budgetId: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Reimbursed' | 'Flagged';
  submittedBy: string;
  aiProcessed: boolean;
  policyViolation?: string;
  notes?: string;
}

export interface Budget {
  id: string;
  category: string;
  department: string;
  allocated: number;
  spent: number;
  remaining: number;
  period: string;
}

export interface DashboardStats {
  totalCandidates: number;
  activeClients: number;
  pendingInquiries: number;
  successfulPlacements: number;
}

export interface JobVacancy {
  id: string;
  title: string;
  location: string;
  type: string;
  salary: string;
  description: string;
}

export interface JobApplication {
  id: string;
  vacancyId: string;
  vacancyTitle: string;
  applicantName: string;
  email: string;
  phone: string;
  experience: string;
  resumeUrl?: string;
  status: 'New' | 'Reviewed' | 'Rejected' | 'Hired';
  date: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

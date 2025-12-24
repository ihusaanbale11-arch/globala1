
import { Candidate, Client, Inquiry, ServiceItem, JobVacancy, JobApplication, RecruitedCandidate, Agent } from './types';

export const MOCK_AGENTS: Agent[] = [
  { id: 'a1', agencyName: 'Dhaka Manpower Solutions', contactPerson: 'Rahim Khan', email: 'rahim@dms.bd', phone: '+880 1711 223344', country: 'Bangladesh', status: 'Active' },
  { id: 'a2', agencyName: 'Kathmandu HR Services', contactPerson: 'Arjun Thapa', email: 'arjun@khr.np', phone: '+977 9851 123456', country: 'Nepal', status: 'Active' },
  { id: 'a3', agencyName: 'Manila Recruitment Hub', contactPerson: 'Maria Santos', email: 'maria@manila.ph', phone: '+63 917 888 9999', country: 'Philippines', status: 'Pending' }
];

// Added missing GDPR and metadata fields for Candidate
export const MOCK_CANDIDATES: Candidate[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    profession: 'Civil Engineer',
    nationality: 'India',
    experience: 5,
    status: 'Available',
    skills: ['AutoCAD', 'Project Management', 'Site Supervision'],
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    agentId: 'a1',
    isVerified: true,
    completenessScore: 85,
    communicationPrefs: { email: true, sms: true, whatsapp: false },
    privacyConsentedDate: '2023-01-10',
    lastActive: '2023-11-20'
  },
  {
    id: '2',
    name: 'Sarah Jenkins',
    email: 'sarah@example.com',
    profession: 'Hospitality Manager',
    nationality: 'Philippines',
    experience: 8,
    status: 'Processing',
    skills: ['Guest Relations', 'Team Leadership', 'English Fluent'],
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    isVerified: false,
    completenessScore: 65,
    communicationPrefs: { email: true, sms: false, whatsapp: true },
    privacyConsentedDate: '2023-02-15',
    lastActive: '2023-11-21'
  },
  {
    id: '3',
    name: 'Ahmed Al-Fayed',
    email: 'ahmed@example.com',
    profession: 'Chef de Partie',
    nationality: 'Egypt',
    experience: 4,
    status: 'Available',
    skills: ['Mediterranean Cuisine', 'Food Safety', 'Menu Planning'],
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    isVerified: true,
    completenessScore: 90,
    communicationPrefs: { email: true, sms: false, whatsapp: false },
    privacyConsentedDate: '2023-03-20',
    lastActive: '2023-11-19'
  },
  {
    id: '4',
    name: 'Anita Roy',
    email: 'anita@example.com',
    profession: 'Nurse',
    nationality: 'Nepal',
    experience: 6,
    status: 'Hired',
    skills: ['Patient Care', 'ICU Experience', 'Compassion'],
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    agentId: 'a2',
    isVerified: true,
    completenessScore: 95,
    communicationPrefs: { email: true, sms: true, whatsapp: true },
    privacyConsentedDate: '2023-01-05',
    lastActive: '2023-10-30'
  },
  {
    id: '5',
    name: 'Michael Chen',
    email: 'michael.c@example.com',
    profession: 'IT Specialist',
    nationality: 'Singapore',
    experience: 3,
    status: 'Available',
    skills: ['Network Security', 'Python', 'System Admin'],
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    isVerified: false,
    completenessScore: 45,
    communicationPrefs: { email: true, sms: false, whatsapp: false },
    privacyConsentedDate: '2023-05-12',
    lastActive: '2023-11-15'
  },
  {
    id: '6',
    name: 'Priya Patel',
    email: 'priya.p@example.com',
    profession: 'Accountant',
    nationality: 'India',
    experience: 7,
    status: 'Processing',
    skills: ['QuickBooks', 'Financial Reporting', 'Taxation'],
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    isVerified: true,
    completenessScore: 80,
    communicationPrefs: { email: true, sms: true, whatsapp: true },
    privacyConsentedDate: '2023-04-18',
    lastActive: '2023-11-22'
  },
  {
    id: '7',
    name: 'John Smith',
    email: 'john.smith@example.com',
    profession: 'Electrician',
    nationality: 'UK',
    experience: 10,
    status: 'Available',
    skills: ['Industrial Wiring', 'Safety Protocols', 'Maintenance'],
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    isVerified: true,
    completenessScore: 88,
    communicationPrefs: { email: true, sms: false, whatsapp: false },
    privacyConsentedDate: '2023-01-25',
    lastActive: '2023-11-18'
  },
  {
    id: '8',
    name: 'Maria Rodriguez',
    email: 'maria.r@example.com',
    profession: 'Housekeeping Supervisor',
    nationality: 'Philippines',
    experience: 5,
    status: 'Available',
    skills: ['Staff Training', 'Inventory Management', 'Hygiene Standards'],
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    agentId: 'a3',
    isVerified: false,
    completenessScore: 70,
    communicationPrefs: { email: true, sms: true, whatsapp: true },
    privacyConsentedDate: '2023-06-14',
    lastActive: '2023-11-20'
  },
  {
    id: '9',
    name: 'Kamal Hassan',
    email: 'kamal.h@example.com',
    profession: 'Mason',
    nationality: 'Bangladesh',
    experience: 8,
    status: 'Hired',
    skills: ['Bricklaying', 'Plastering', 'Concrete Work'],
    imageUrl: 'https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    isVerified: true,
    completenessScore: 92,
    communicationPrefs: { email: true, sms: false, whatsapp: true },
    privacyConsentedDate: '2023-02-08',
    lastActive: '2023-09-15'
  },
  {
    id: '10',
    name: 'Elena Popov',
    email: 'elena.p@example.com',
    profession: 'Guest Relations Officer',
    nationality: 'Russia',
    experience: 2,
    status: 'Available',
    skills: ['Russian', 'English', 'Customer Service'],
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    isVerified: false,
    completenessScore: 55,
    communicationPrefs: { email: true, sms: false, whatsapp: false },
    privacyConsentedDate: '2023-08-22',
    lastActive: '2023-11-10'
  },
    {
    id: '11',
    name: 'David Wilson',
    email: 'david.w@example.com',
    profession: 'Scuba Instructor',
    nationality: 'Australia',
    experience: 6,
    status: 'Available',
    skills: ['PADI Certified', 'First Aid', 'Marine Biology'],
    imageUrl: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    isVerified: true,
    completenessScore: 82,
    communicationPrefs: { email: true, sms: false, whatsapp: false },
    privacyConsentedDate: '2023-04-10',
    lastActive: '2023-11-14'
  },
  {
    id: '12',
    name: 'Fatima Al-Zahra',
    email: 'fatima.z@example.com',
    profession: 'Pastry Chef',
    nationality: 'Morocco',
    experience: 4,
    status: 'Processing',
    skills: ['Desserts', 'Baking', 'Decoration'],
    imageUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    isVerified: false,
    completenessScore: 68,
    communicationPrefs: { email: true, sms: true, whatsapp: true },
    privacyConsentedDate: '2023-07-15',
    lastActive: '2023-11-22'
  },
  {
    id: '13',
    name: 'Aishath Nazeer',
    email: 'aishath.n@example.com',
    profession: 'Mathematics Teacher',
    nationality: 'Maldives',
    experience: 5,
    status: 'Available',
    skills: ['Curriculum Design', 'Student Mentoring', 'Calculus'],
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    isVerified: true,
    completenessScore: 89,
    communicationPrefs: { email: true, sms: false, whatsapp: true },
    privacyConsentedDate: '2023-05-20',
    lastActive: '2023-11-20'
  }
];

// Added missing isVerified field for Client
export const MOCK_CLIENTS: Client[] = [
  { id: '1', companyName: 'Sunrise Resorts Maldives', contactPerson: 'Mohamed Ali', email: 'hr@sunriseresorts.mv', status: 'Active', isVerified: true },
  { id: '2', companyName: 'Male Construction Group', contactPerson: 'Ibrahim Rasheed', email: 'procurement@malecon.mv', status: 'Active', isVerified: true },
  { id: '3', companyName: 'Blue Ocean Logistics', contactPerson: 'Aishath Niuma', email: 'admin@blueocean.mv', status: 'Pending', isVerified: false },
  { id: '4', companyName: 'Velana International Airport', contactPerson: 'Hassan Manik', email: 'hr@via.mv', status: 'Active', isVerified: true },
  { id: '5', companyName: 'City Medical Center', contactPerson: 'Dr. Fareesha', email: 'admin@citymed.mv', status: 'Active', isVerified: true },
  { id: '6', companyName: 'Island Transport Solutions', contactPerson: 'Abdullah Saeed', email: 'info@islandtransport.mv', status: 'Suspended', isVerified: false },
];

export const MOCK_INQUIRIES: Inquiry[] = [
  { id: '1', name: 'Sunrise Resorts Maldives', email: 'hr@sunriseresorts.mv', subject: 'Manpower for Resort Construction', message: 'We are looking for 50 general laborers for a project in Kaafu Atoll.', status: 'New', date: '2023-10-25' },
  { id: '2', name: 'Fatima Hassan', email: 'fatima@techmv.com', subject: 'IT Specialists needed', message: 'Do you supply network engineers?', status: 'Replied', date: '2023-10-24', response: 'Yes, we have several qualified network engineers from India and Sri Lanka available immediately.' },
  { id: '3', name: 'Male Construction Group', email: 'procurement@malecon.mv', subject: 'Urgent: Masons Required', message: 'We need 10 experienced masons for the Hulhumale Phase 2 project. Immediate start.', status: 'New', date: '2023-10-26' },
  { id: '4', name: 'John Doe', email: 'john.doe@gmail.com', subject: 'General Inquiry', message: 'I am looking for a job in Maldives as a driver. Do you recruit drivers?', status: 'Replied', date: '2023-10-20', response: 'Currently we are only recruiting for corporate clients. Please check our "Candidates" page to register your profile.' },
  { id: '5', name: 'Blue Ocean Logistics', email: 'admin@blueocean.mv', subject: 'Customs Clearance Officers', message: 'Requirement for 2 customs clearance officers with 5 years experience.', status: 'New', date: '2023-10-27' },
];

export const SERVICES: ServiceItem[] = [
  { id: '1', title: 'Recruitment Services', description: 'End-to-end recruitment solutions sourcing best-fit candidates globally.', icon: 'Users' },
  { id: '2', title: 'Work Permit Management', description: 'Handling all legal documentation and Category A license requirements.', icon: 'FileCheck' },
  { id: '3', title: 'Manpower Supply', description: 'Rapid deployment of skilled and unskilled labor for various industries.', icon: 'HardHat' },
  { id: '4', title: 'Consultancy', description: 'Expert advice on Maldives labor laws and employment strategies.', icon: 'Briefcase' },
];

export const MOCK_VACANCIES: JobVacancy[] = [
  { 
    id: '101', 
    title: 'General Laborer', 
    location: 'Hulhumalé', 
    type: 'Full Time (2 Years)', 
    salary: '$400 - $600 + Food/Accom',
    description: 'We are seeking physically fit general laborers for a large-scale construction project.'
  },
  { 
    id: '102', 
    title: 'Commi Chef (Hot Kitchen)', 
    location: 'Luxury Resort, Baa Atoll', 
    type: 'Full Time', 
    salary: '$600 - $800 + Service Charge',
    description: 'Experienced Commi Chef needed with knowledge of international cuisine.'
  },
  { 
    id: '103', 
    title: 'Registered Nurse', 
    location: 'Malé City', 
    type: 'Contract', 
    salary: '$1200 - $1500',
    description: 'Qualified nurse required for a private clinic. Must have 3+ years experience.'
  },
  { 
    id: '104', 
    title: 'HVAC Technician', 
    location: 'Thilafushi', 
    type: 'Full Time', 
    salary: '$700 - $900',
    description: 'Technician needed for maintenance of industrial cooling systems.'
  },
  { 
    id: '105', 
    title: 'Front Office Manager', 
    location: 'Resort, Kaafu Atoll', 
    type: 'Full Time', 
    salary: '$2000 - $2500 + Service Charge',
    description: 'Seeking a charismatic Front Office Manager with luxury resort experience. Must speak fluent English and German/French.'
  },
  { 
    id: '106', 
    title: 'Heavy Vehicle Driver', 
    location: 'Thilafushi', 
    type: 'Full Time', 
    salary: '$800 - $1000',
    description: 'Experienced driver needed for excavator and dump truck operations. Valid license required.'
  },
  { 
    id: '107', 
    title: 'Spa Therapist', 
    location: 'Resort, Alif Dhaal Atoll', 
    type: 'Full Time', 
    salary: '$800 + Comm + SC',
    description: 'Female spa therapist required with certification in Balinese and Thai massage.'
  },
  { 
    id: '108', 
    title: 'Storekeeper', 
    location: 'Malé City', 
    type: 'Full Time', 
    salary: '$500 - $700',
    description: 'Organized storekeeper needed for a retail warehouse. Basic computer skills required.'
  },
  { 
    id: '109', 
    title: 'Primary School Teacher', 
    location: 'International School, Malé', 
    type: 'Full Time', 
    salary: '$1500 - $2000',
    description: 'Certified primary teacher needed for an international curriculum school. Must have 3+ years of experience.'
  }
];

export const MOCK_APPLICATIONS: JobApplication[] = [
    {
        id: 'app1',
        vacancyId: '102',
        vacancyTitle: 'Commi Chef (Hot Kitchen)',
        applicantName: 'Ahmed Al-Fayed',
        email: 'ahmed@example.com',
        phone: '+20 123 456 789',
        experience: '3-5 Years',
        status: 'New',
        date: '2023-10-26'
    },
    {
        id: 'app2',
        vacancyId: '101',
        vacancyTitle: 'General Laborer',
        applicantName: 'Kamal Hassan',
        email: 'kamal.h@example.com',
        phone: '+880 171 234 5678',
        experience: '5+ Years',
        status: 'Reviewed',
        date: '2023-10-25'
    },
    {
        id: 'app3',
        vacancyId: '103',
        vacancyTitle: 'Registered Nurse',
        applicantName: 'Anita Roy',
        email: 'anita@example.com',
        phone: '+977 980 123 4567',
        experience: '5+ Years',
        status: 'New',
        date: '2023-10-27'
    },
    {
        id: 'app4',
        vacancyId: '105',
        vacancyTitle: 'Front Office Manager',
        applicantName: 'Sarah Jenkins',
        email: 'sarah@example.com',
        phone: '+63 917 123 4567',
        experience: '5+ Years',
        status: 'Rejected',
        date: '2023-10-20'
    }
];

export const MOCK_RECRUITED_CANDIDATES: RecruitedCandidate[] = [
    {
        id: 'rc1',
        name: 'Anita Roy',
        passportNumber: 'N12345678',
        nationality: 'Nepal',
        designation: 'Staff Nurse',
        employer: 'City Medical Center',
        arrivalDate: '2023-09-15',
        addedBy: 'Admin'
    },
    {
        id: 'rc2',
        name: 'Kamal Hassan',
        passportNumber: 'B98765432',
        nationality: 'Bangladesh',
        designation: 'Mason',
        employer: 'Male Construction Group',
        arrivalDate: '2023-08-20',
        addedBy: 'Admin'
    },
    {
        id: 'rc3',
        name: 'John Smith',
        passportNumber: 'G11223344',
        nationality: 'UK',
        designation: 'Chief Engineer',
        employer: 'Sunrise Resorts',
        arrivalDate: '2023-10-01',
        addedBy: 'Admin'
    },
    {
        id: 'rc4',
        name: 'Maria Rodriguez',
        passportNumber: 'P55667788',
        nationality: 'Philippines',
        designation: 'Housekeeping Supervisor',
        employer: 'Sunrise Resorts',
        arrivalDate: '2023-09-25',
        addedBy: 'Admin'
    },
    {
        id: 'rc5',
        name: 'Li Wei',
        passportNumber: 'C99887766',
        nationality: 'China',
        designation: 'Translator',
        employer: 'Velana International Airport',
        arrivalDate: '2023-10-10',
        addedBy: 'Admin'
    }
];

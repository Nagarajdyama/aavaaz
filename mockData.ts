import { User, Department, Complaint, SOSAlert, Feedback, ComplaintStatus, ComplaintType } from '../types';

// Mock Users
export const users: User[] = [
  {
    id: '1',
    name: 'John Citizen',
    email: 'john@example.com',
    role: 'citizen',
    avatarUrl: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: '2',
    name: 'Sarah Agent',
    email: 'sarah@gov.example',
    role: 'agent',
    avatarUrl: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@gov.example',
    role: 'admin',
    avatarUrl: 'https://i.pravatar.cc/150?img=8',
  },
  {
    id: '4',
    name: 'Alice Citizen',
    email: 'alice@example.com',
    role: 'citizen',
    avatarUrl: 'https://i.pravatar.cc/150?img=9',
  },
  {
    id: '5',
    name: 'Bob Agent',
    email: 'bob@gov.example',
    role: 'agent',
    avatarUrl: 'https://i.pravatar.cc/150?img=3',
  }
];

// Mock Departments
export const departments: Department[] = [
  {
    id: '1',
    name: 'Water & Sanitation',
    description: 'Handles water supply and sanitation issues',
    officialContactInfo: 'water@gov.example.com',
  },
  {
    id: '2',
    name: 'Roads & Infrastructure',
    description: 'Manages road maintenance and infrastructure development',
    officialContactInfo: 'roads@gov.example.com',
  },
  {
    id: '3',
    name: 'Electricity',
    description: 'Handles electricity supply and related issues',
    officialContactInfo: 'electricity@gov.example.com',
  },
  {
    id: '4',
    name: 'Public Health',
    description: 'Manages public health issues and services',
    officialContactInfo: 'health@gov.example.com',
  },
  {
    id: '5',
    name: 'Education',
    description: 'Oversees educational institutions and services',
    officialContactInfo: 'education@gov.example.com',
  },
  {
    id: '6',
    name: 'Law Enforcement',
    description: 'Handles law and order related complaints',
    officialContactInfo: 'police@gov.example.com',
  }
];

// Mock Complaints
export const complaints: Complaint[] = [
  {
    id: '1',
    complaintId: 'AAV-2023-001',
    userId: '1',
    complaintType: 'issue',
    departmentId: '1',
    department: departments[0],
    title: 'Water supply disruption',
    description: 'No water supply in our area for the past 3 days. Several households affected.',
    priority: 'high',
    status: 'resolved',
    createdAt: '2023-10-15T10:30:00Z',
    updatedAt: '2023-10-18T14:20:00Z',
    location: { lat: 28.6139, lng: 77.2090 },
    address_manual: 'Block C, Connaught Place, New Delhi',
    address_geocoded: 'Connaught Place, New Delhi, Delhi 110001',
    mediaUrls: [],
    assignedAgentId: '2',
    assignedAgentName: 'Sarah Agent',
    citizenVisibilityNotes: 'Issue resolved. Water supply restored after repairing main pipeline.',
  },
  {
    id: '2',
    complaintId: 'AAV-2023-002',
    userId: '4',
    complaintType: 'issue',
    departmentId: '2',
    department: departments[1],
    title: 'Pothole on main road',
    description: 'Large pothole on Main Street causing traffic issues and risk of accidents.',
    priority: 'medium',
    status: 'in_progress',
    createdAt: '2023-10-16T09:15:00Z',
    updatedAt: '2023-10-17T11:30:00Z',
    location: { lat: 28.6129, lng: 77.2295 },
    address_manual: 'Main Street, opposite City Mall',
    address_geocoded: 'Main Street, Delhi 110092',
    mediaUrls: ['https://placehold.co/600x400?text=Pothole+Image'],
    assignedAgentId: '5',
    assignedAgentName: 'Bob Agent',
    citizenVisibilityNotes: 'Repair work scheduled for tomorrow.',
  },
  {
    id: '3',
    complaintId: 'AAV-2023-003',
    userId: '1',
    complaintType: 'individual',
    departmentId: '6',
    department: departments[5],
    title: 'Officer misconduct',
    description: 'An officer behaved rudely and refused to file my complaint at the station.',
    priority: 'medium',
    status: 'verification_pending',
    createdAt: '2023-10-17T15:45:00Z',
    updatedAt: '2023-10-17T16:00:00Z',
    location: { lat: 28.6304, lng: 77.2177 },
    address_manual: 'Central Police Station, Delhi',
    address_geocoded: 'Central Police Station, Delhi 110001',
    mediaUrls: [],
    subjectDetails: {
      name: 'Officer Singh',
    },
    verificationStatus: 'pending',
  },
  {
    id: '4',
    complaintId: 'AAV-2023-004',
    userId: '4',
    complaintType: 'issue',
    departmentId: '3',
    department: departments[2],
    title: 'Frequent power cuts',
    description: 'We are experiencing frequent power cuts in our neighborhood for the past week.',
    priority: 'high',
    status: 'assigned',
    createdAt: '2023-10-18T08:20:00Z',
    updatedAt: '2023-10-18T10:15:00Z',
    location: { lat: 28.5708, lng: 77.3260 },
    address_manual: 'Sector 62, Noida',
    address_geocoded: 'Sector 62, Noida, Uttar Pradesh 201309',
    mediaUrls: [],
    assignedAgentId: '2',
    assignedAgentName: 'Sarah Agent',
  },
  {
    id: '5',
    complaintId: 'AAV-2023-005',
    userId: '4',
    complaintType: 'issue',
    departmentId: '4',
    department: departments[3],
    title: 'Garbage not collected',
    description: 'Garbage has not been collected from our area for the past 5 days, causing health hazards.',
    priority: 'medium',
    status: 'submitted',
    createdAt: '2023-10-19T11:30:00Z',
    updatedAt: '2023-10-19T11:30:00Z',
    location: { lat: 28.6139, lng: 77.2090 },
    address_manual: 'Gandhi Nagar, Delhi',
    address_geocoded: 'Gandhi Nagar, Delhi 110031',
    mediaUrls: ['https://placehold.co/600x400?text=Garbage+Image'],
  },
  {
    id: '6',
    complaintId: 'AAV-2023-006',
    userId: '1',
    complaintType: 'individual',
    departmentId: '5',
    department: departments[4],
    title: 'Teacher absenteeism',
    description: 'Mathematics teacher has been absent for 2 weeks without any substitute arrangement.',
    priority: 'high',
    status: 'under_review',
    createdAt: '2023-10-20T09:45:00Z',
    updatedAt: '2023-10-20T14:30:00Z',
    address_manual: 'Government School, Sector 10, Delhi',
    address_geocoded: 'Government School, Sector 10, Delhi 110085',
    mediaUrls: [],
    subjectDetails: {
      name: 'Mr. Sharma',
      providedContactEmail: 'sharma@edu.example.com',
    },
    verificationStatus: 'verified',
    assignedAgentId: '5',
    assignedAgentName: 'Bob Agent',
  }
];

// Mock SOS Alerts
export const sosAlerts: SOSAlert[] = [
  {
    id: '1',
    userId: '1',
    userName: 'John Citizen',
    complaintIdFiled: '3',
    timestampTriggered: '2023-10-17T16:30:00Z',
    locationAtTrigger: { lat: 28.6304, lng: 77.2177 },
    status: 'resolved',
    acknowledgedByAdminId: '3',
    acknowledgedByAdminName: 'Admin User',
    assignedToTeamMember: 'Security Team Lead',
    resolutionNotes: 'Citizen was contacted. Situation resolved peacefully.',
    closedAt: '2023-10-17T17:45:00Z'
  },
  {
    id: '2',
    userId: '4',
    userName: 'Alice Citizen',
    timestampTriggered: '2023-10-20T13:15:00Z',
    locationAtTrigger: { lat: 28.5708, lng: 77.3260 },
    status: 'new',
  }
];

// Mock Feedbacks
export const feedbacks: Feedback[] = [
  {
    id: '1',
    complaintId: '1',
    userId: '1',
    rating: 4,
    comment: 'Issue was resolved promptly, but communication could be better.',
    createdAt: '2023-10-18T15:00:00Z'
  },
  {
    id: '2',
    complaintId: '2',
    userId: '4',
    rating: 3,
    comment: 'Taking longer than expected, but the staff is helpful.',
    createdAt: '2023-10-18T10:30:00Z'
  }
];

// Helper functions to work with mock data
export const getCurrentUser = (): User => {
  return users[0]; // Default to first user (citizen)
};

export const getAdminUser = (): User => {
  return users.find(user => user.role === 'admin') || users[0];
};

export const getAgentUser = (): User => {
  return users.find(user => user.role === 'agent') || users[0];
};

export const getUserComplaints = (userId: string): Complaint[] => {
  return complaints.filter(complaint => complaint.userId === userId);
};

export const getUserSOSAlerts = (userId: string): SOSAlert[] => {
  return sosAlerts.filter(alert => alert.userId === userId);
};

export const getComplaintById = (id: string): Complaint | undefined => {
  return complaints.find(complaint => complaint.id === id);
};

export const getSOSAlertById = (id: string): SOSAlert | undefined => {
  return sosAlerts.find(alert => alert.id === id);
};

export const getComplaintsByDepartment = (departmentId: string): Complaint[] => {
  return complaints.filter(complaint => complaint.departmentId === departmentId);
};

export const getComplaintsByStatus = (status: ComplaintStatus): Complaint[] => {
  return complaints.filter(complaint => complaint.status === status);
};

export const getComplaintsByType = (type: ComplaintType): Complaint[] => {
  return complaints.filter(complaint => complaint.complaintType === type);
};

export const getOpenSOSAlerts = (): SOSAlert[] => {
  return sosAlerts.filter(alert => alert.status === 'new' || alert.status === 'acknowledged');
};

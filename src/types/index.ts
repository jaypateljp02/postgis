export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'on-hold' | 'draft';
  client: string;
  team: TeamMember[];
  progress: number;
  deadline: string;
  budget: number;
  tags: string[];
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'completed';
  assignee: TeamMember;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  projectId: string;
  comments: Comment[];
  attachments: File[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  email: string;
  status: 'online' | 'offline' | 'away';
  department: string;
}

export interface Comment {
  id: string;
  content: string;
  author: TeamMember;
  createdAt: string;
  replies?: Comment[];
}

export interface File {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedBy: TeamMember;
  uploadedAt: string;
  version: number;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  start: string;
  end: string;
  type: 'meeting' | 'deadline' | 'review' | 'other';
  attendees: TeamMember[];
  projectId?: string;
}

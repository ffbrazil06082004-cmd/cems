
import { User, Event, Registration, Department } from './types';

export const DUMMY_STUDENTS: User[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@test.com', role: 'student', registerNumber: 'student001', collegeName: 'State University', department: 'CSE', contactNumber: '123-456-7890', password: 'password' },
  { id: 2, name: 'Bob Williams', email: 'bob@test.com', role: 'student', registerNumber: 'STU002', collegeName: 'State University', department: 'ECE', contactNumber: '234-567-8901', password: 'password2' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@test.com', role: 'student', registerNumber: 'STU003', collegeName: 'State University', department: 'Mech', contactNumber: '345-678-9012', password: 'password3' },
];

export const DUMMY_ADMINS: User[] = [
  { id: 101, name: 'Admin Eve', email: 'admin', role: 'admin', password: 'admin123' },
];

export const DUMMY_EVENTS: Event[] = [
  {
    id: 1,
    name: 'National Tech Symposium 2025',
    date: '2025-11-18T09:00:00',
    description: 'A national-level symposium with workshops on AI, IoT, and Robotics led by industry experts.',
    venue: 'Main Auditorium',
    organizer: 'Tech Committee',
  },
  {
    id: 2,
    name: 'Innovation Hackathon – Campus Edition',
    date: '2025-12-05T09:00:00',
    description: 'Join a 24-hour coding marathon to build innovative solutions, with guidance from startup mentors.',
    venue: 'Innovation Lab',
    organizer: 'Innovation Cell',
  },
  {
    id: 3,
    name: 'Startup Showcase & PitchFest',
    date: '2026-01-12T10:00:00',
    description: 'An opportunity for student entrepreneurs to present their startup ideas to a panel of investors.',
    venue: 'Conference Hall',
    organizer: 'Entrepreneurship Cell',
  },
  {
    id: 4,
    name: 'Cyber Security Awareness Bootcamp',
    date: '2025-11-25T10:00:00',
    description: 'A bootcamp featuring live ethical hacking demonstrations and a competitive Capture the Flag (CTF) contest.',
    venue: 'IT Block Seminar Hall',
    organizer: 'Cyber Security Club',
  },
  {
    id: 5,
    name: 'Robotics League Championship',
    date: '2025-12-10T09:00:00',
    description: 'Witness thrilling robotics competitions like Line Follower, Robo Soccer, and a special Drone Display.',
    venue: 'Indoor Sports Complex',
    organizer: 'Robotics Club',
  },
  {
    id: 6,
    name: 'Data Science & AI Workshop',
    date: '2026-01-03T09:30:00',
    description: 'A hands-on workshop focused on building real-world machine learning projects using Python.',
    venue: 'CSE Dept Smart Classroom',
    organizer: 'AI & Data Science Club',
  },
];

export const DUMMY_REGISTRATIONS: Registration[] = [
  { id: 1, studentId: 1, eventId: 1 },
  { id: 2, studentId: 1, eventId: 3 },
  { id: 3, studentId: 2, eventId: 2 },
  { id: 4, studentId: 3, eventId: 4 },
];
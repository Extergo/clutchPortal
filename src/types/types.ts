export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  contact: string;
  lastVisit: string;
  nextAppointment: string;
  status: string;
  insuranceProvider: string;
  policyNumber: string;
  profileImage: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  profileImage: string;
  date: string;
  time: string;
  type: string;
  status: string;
}

"use client";

import React, { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Users,
  Calendar,
  Activity,
  Clock,
} from "lucide-react";

import {
  AppointmentList,
  PatientCard,
  Stats,
  Sidebar,
  TopNavigation,
  PatientManagementModal,
} from "@/components";

import { Patient, Appointment } from "@/types/types";
import { patients, appointments, stats as statsData } from "@/data/patients";

export default function Home() {
  const [patientsData, setPatientsData] = useState<Patient[]>(patients);
  const [appointmentsData] = useState<Appointment[]>(appointments);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  // Helper function to get icon component by name
  function getIconComponent(iconName: string) {
    switch (iconName) {
      case "Users":
        return <Users className="h-6 w-6" />;
      case "Calendar":
        return <Calendar className="h-6 w-6" />;
      case "Activity":
        return <Activity className="h-6 w-6" />;
      case "Clock":
        return <Clock className="h-6 w-6" />;
      default:
        return <Activity className="h-6 w-6" />;
    }
  }

  // Map icon strings to actual components for stats
  const stats = statsData.map((stat) => ({
    ...stat,
    icon: getIconComponent(stat.icon),
  }));

  // Handle adding a new patient
  const handleAddPatient = (newPatient: Patient) => {
    setPatientsData((prevPatients) => [newPatient, ...prevPatients]);
  };

  // Handle updating an existing patient
  const handleUpdatePatient = (updatedPatient: Patient) => {
    setPatientsData((prevPatients) =>
      prevPatients.map((patient) =>
        patient.id === updatedPatient.id ? updatedPatient : patient
      )
    );
  };

  // Handle deleting a patient
  const handleDeletePatient = (patientId: string) => {
    setPatientsData((prevPatients) =>
      prevPatients.filter((patient) => patient.id !== patientId)
    );
  };

  // Open modal for editing a patient
  const handleEditPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsPatientModalOpen(true);
  };

  // Open modal for adding a new patient
  const handleOpenAddPatientModal = () => {
    setSelectedPatient(null);
    setIsPatientModalOpen(true);
  };

  // Filter patients based on search term
  const filteredPatients = patientsData.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter appointments based on active filter
  const filteredAppointments =
    activeFilter === "All"
      ? appointmentsData
      : appointmentsData.filter(
          (appointment) => appointment.status === activeFilter
        );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Patient Management Modal */}
      <PatientManagementModal
        isOpen={isPatientModalOpen}
        onClose={() => setIsPatientModalOpen(false)}
        onSavePatient={selectedPatient ? handleUpdatePatient : handleAddPatient}
        onDeletePatient={handleDeletePatient}
        initialPatient={selectedPatient}
      />

      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top navigation */}
        <TopNavigation />

        {/* Main area */}
        <main className="flex-1 overflow-auto bg-gray-50 p-4 sm:p-6 lg:p-8">
          {/* Stats */}
          <Stats stats={stats} />

          {/* Search and filters */}
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
            <div className="relative w-full sm:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex space-x-3 w-full sm:w-auto">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </button>
              <button
                onClick={handleOpenAddPatientModal}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Patient
              </button>
            </div>
          </div>

          {/* Content grid */}
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Patient List */}
            <div className="bg-white rounded-lg shadow col-span-2">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900">Patients</h2>
                <div className="mt-4 space-y-4">
                  {filteredPatients.length > 0 ? (
                    filteredPatients.map((patient) => (
                      <div
                        key={patient.id}
                        className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-md transition-colors"
                      >
                        <PatientCard
                          patient={patient}
                          onEdit={() => handleEditPatient(patient)}
                        />
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">
                      No patients match your search criteria.
                    </p>
                  )}
                </div>
                <div className="mt-6 flex justify-between items-center">
                  <p className="text-sm text-gray-500">
                    Showing {filteredPatients.length} of {patientsData.length}{" "}
                    patients
                  </p>
                  <div className="flex space-x-2">
                    <button className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                      Previous
                    </button>
                    <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Appointments */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium text-gray-900">
                    Upcoming Appointments
                  </h2>
                  <button>
                    <MoreHorizontal className="h-5 w-5 text-gray-400" />
                  </button>
                </div>
                <div className="mt-4 flex space-x-3 overflow-x-auto">
                  <button
                    className={`px-3 py-1 text-sm rounded-full whitespace-nowrap ${
                      activeFilter === "All"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                    onClick={() => setActiveFilter("All")}
                  >
                    All
                  </button>
                  <button
                    className={`px-3 py-1 text-sm rounded-full whitespace-nowrap ${
                      activeFilter === "Confirmed"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                    onClick={() => setActiveFilter("Confirmed")}
                  >
                    Confirmed
                  </button>
                  <button
                    className={`px-3 py-1 text-sm rounded-full whitespace-nowrap ${
                      activeFilter === "Pending"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                    onClick={() => setActiveFilter("Pending")}
                  >
                    Pending
                  </button>
                </div>
                <div className="mt-4">
                  <AppointmentList appointments={filteredAppointments} />
                </div>
                <div className="mt-4">
                  <button className="w-full px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    View All Appointments
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

import React from "react";
import { Edit } from "lucide-react";
import { Patient } from "@/types/types";

interface PatientCardProps {
  patient: Patient;
  onEdit?: () => void;
}

export const PatientCard: React.FC<PatientCardProps> = ({
  patient,
  onEdit,
}) => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center space-x-4">
        <img
          src={patient.profileImage}
          alt={`${patient.name}'s profile`}
          className="h-12 w-12 rounded-full object-cover"
        />
        <div>
          <h3 className="text-sm font-medium text-gray-900">{patient.name}</h3>
          <p className="text-sm text-gray-500">
            {patient.age} years old | {patient.gender}
          </p>
          <p className="text-sm text-gray-500">{patient.contact}</p>
        </div>
      </div>
      {onEdit && (
        <button
          onClick={onEdit}
          className="text-gray-500 hover:text-blue-600 focus:outline-none"
          title="Edit Patient"
        >
          <Edit className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default PatientCard;

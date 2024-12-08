import { format } from "date-fns";

// Definición de las interfaces para los recursos FHIR
interface Patient {
  resourceType: "Patient";
  id: string;
  name: { use: string; family: string; given: string[] }[];
  gender: string;
  birthDate: string;
  address: { use: string; line: string[]; city: string; state: string; postalCode: string; country: string }[];
}

interface Condition {
  resourceType: "Condition";
  id: string;
  patient: { reference: string };
  code: { coding: { system: string; code: string; display: string }[] };
  clinicalStatus: { coding: { system: string; code: string; display: string }[] };
  severity: { coding: { system: string; code: string; display: string }[] };
  onsetDateTime: string;
  recordedDate: string;
}

interface Observation {
  resourceType: "Observation";
  id: string;
  status: string;
  category: { coding: { system: string; code: string; display: string }[] }[];
  code: { coding: { system: string; code: string; display: string }[] };
  subject: { reference: string };
  valueQuantity: { value: number; unit: string; system: string; code: string };
  effectiveDateTime: string;
}

interface Encounter {
  resourceType: "Encounter";
  id: string;
  status: string;
  class: { coding: { system: string; code: string; display: string }[] }[];
  type: { coding: { system: string; code: string; display: string }[] }[];
  subject: { reference: string };
  participant: { individual: { reference: string } }[];
  period: { start: string; end: string };
  reasonCode: { coding: { system: string; code: string; display: string }[] }[];
  notes: { text: string }[];
}

// Tipo de datos para el informe FHIR completo
type FhirReport = (Patient | Condition | Observation | Encounter)[];

interface ReportProps {
  report: FhirReport;
}

const ReportViewer: React.FC<ReportProps> = ({ report }) => {
  // Formatear las fechas
  const formatDate = (date: string) => {
    return format(new Date(date), "d MMMM yyyy");
  };

  // Renderizar la información del paciente
  const renderPatientInfo = (patient: Patient, key: number) => (
    <div className="mb-4" key={`rpi-${key}`}>
      <h2 className="text-xl font-bold">Información del Paciente</h2>
      <p>
        <strong>Nombre:</strong> {patient.name[0]?.given[0]} {patient.name[0]?.family}
      </p>
      <p>
        <strong>Género:</strong> {patient.gender}
      </p>
      <p>
        <strong>Fecha de nacimiento:</strong> {formatDate(patient.birthDate)}
      </p>
      <p>
        <strong>Dirección:</strong> {patient.address[0]?.line[0]}, {patient.address[0]?.city},{" "}
        {patient.address[0]?.state}
      </p>
    </div>
  );

  // Renderizar la condición médica
  const renderConditionInfo = (condition: Condition, key: number) => (
    <div className="mb-4" key={`rci-${key}`}>
      <h3 className="text-lg font-semibold">Condición Médica</h3>
      <p>
        <strong>Diagnóstico:</strong> {condition.code.coding[0]?.display}
      </p>
      <p>
        <strong>Estado clínico:</strong> {condition.clinicalStatus.coding[0]?.display}
      </p>
      <p>
        <strong>Severidad:</strong> {condition.severity.coding[0]?.display}
      </p>
      <p>
        <strong>Fecha de inicio:</strong> {formatDate(condition.onsetDateTime)}
      </p>
      <p>
        <strong>Fecha registrada:</strong> {formatDate(condition.recordedDate)}
      </p>
    </div>
  );

  // Renderizar las observaciones
  const renderObservationInfo = (observation: Observation, key: number) => (
    <div className="mb-4" key={`roi-${key}`}>
      <h3 className="text-lg font-semibold">Observaciones</h3>
      <p>
        <strong>{observation.code.coding[0]?.display}:</strong> {observation.valueQuantity?.value}{" "}
        {observation.valueQuantity?.unit}
      </p>
      <p>
        <strong>Fecha de la observación:</strong> {formatDate(observation.effectiveDateTime)}
      </p>
    </div>
  );

  // Renderizar el encuentro médico
  const renderEncounterInfo = (encounter: Encounter, key: number) => (
    <div className="mb-4" key={`rei-${key}`}>
      <h3 className="text-lg font-semibold">Encuentro Médico</h3>
      <p>
        <strong>Tipo de encuentro:</strong> {encounter.type[0]?.coding[0]?.display}
      </p>
      <p>
        <strong>Fecha de inicio:</strong> {formatDate(encounter.period?.start)}
      </p>
      <p>
        <strong>Fecha de fin:</strong> {formatDate(encounter.period?.end)}
      </p>
      <p>
        <strong>Razón de la consulta:</strong> {encounter.reasonCode[0]?.coding[0]?.display}
      </p>
      <p>
        <strong>Notas:</strong>
        {encounter.notes?.map((note: any, index: number) => (
          <p key={index} className="mt-2">
            {note.text}
          </p>
        ))}
      </p>
    </div>
  );

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      {report.map((resource: any, index: number) => {
        switch (resource.resourceType) {
          case "Patient":
            return renderPatientInfo(resource, index);
          case "Condition":
            return renderConditionInfo(resource, index);
          case "Observation":
            return renderObservationInfo(resource, index);
          case "Encounter":
            return renderEncounterInfo(resource, index);
          default:
            return null;
        }
      })}
    </div>
  );
};

export default ReportViewer;

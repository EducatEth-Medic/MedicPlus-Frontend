import { useEffect, useState } from "react";
import ReportViewer from "./ReportViewer";

const Report: React.FC = () => {
  const [report, setReport] = useState<any[]>([]);

  useEffect(() => {
    // Simulando un informe JSON
    const fetchData = async () => {
      const reportData = [
        {
          resourceType: "Patient",
          id: "0x8757c7D953ea058baCDF82717Caf403Bd01F1099",
          name: [
            {
              use: "official",
              family: "Pérez",
              given: ["Juan"],
            },
          ],
          gender: "male",
          birthDate: "1985-06-15",
          address: [
            {
              use: "home",
              line: ["Calle Ficticia 123"],
              city: "Ciudad Ejemplo",
              state: "Estado Ejemplo",
              postalCode: "12345",
              country: "País Ejemplo",
            },
          ],
        },
        {
          resourceType: "Condition",
          id: "condition-124",
          patient: {
            reference: "Patient/0x8757c7D953ea058baCDF82717Caf403Bd01F1099",
          },
          code: {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "426856004",
                display: "Arritmia cardiaca",
              },
            ],
          },
          clinicalStatus: {
            coding: [
              {
                system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
                code: "active",
                display: "Activa",
              },
            ],
          },
          severity: {
            coding: [
              {
                system: "http://terminology.hl7.org/CodeSystem/condition-severity",
                code: "moderate",
                display: "Moderada",
              },
            ],
          },
          onsetDateTime: "2024-11-01",
          recordedDate: "2024-12-07",
        },
        {
          resourceType: "Observation",
          id: "obs-457",
          status: "final",
          category: [
            {
              coding: [
                {
                  system: "http://terminology.hl7.org/CodeSystem/observation-category",
                  code: "vital-signs",
                  display: "Signos vitales",
                },
              ],
            },
          ],
          code: {
            coding: [
              {
                system: "http://loinc.org",
                code: "29463-7",
                display: "Frecuencia cardíaca",
              },
            ],
          },
          subject: {
            reference: "Patient/0x8757c7D953ea058baCDF82717Caf403Bd01F1099",
          },
          valueQuantity: {
            value: 94,
            unit: "latidos/min",
            system: "http://unitsofmeasure.org",
            code: "beats/min",
          },
          effectiveDateTime: "2024-12-07T09:00:00Z",
        },
        {
          resourceType: "Encounter",
          id: "encounter-790",
          status: "finished",
          class: {
            coding: [
              {
                system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
                code: "AMB",
                display: "Ambulatorio",
              },
            ],
          },
          type: [
            {
              coding: [
                {
                  system: "http://terminology.hl7.org/CodeSystem/encounter-type",
                  code: "1793",
                  display: "Visita de seguimiento",
                },
              ],
            },
          ],
          subject: {
            reference: "Patient/0x8757c7D953ea058baCDF82717Caf403Bd01F1099",
          },
          participant: [
            {
              individual: {
                reference: "Practitioner/doctor-124",
              },
            },
          ],
          period: {
            start: "2024-12-07T08:00:00Z",
            end: "2024-12-07T09:00:00Z",
          },
          reasonCode: [
            {
              coding: [
                {
                  system: "http://terminology.hl7.org/CodeSystem/encounter-diagnosis",
                  code: "426856004",
                  display: "Arritmia cardiaca",
                },
              ],
            },
          ],
          notes: [
            {
              text: "Recomendación de seguimiento con ajuste de medicación: iniciar tratamiento con bloqueadores beta y considerar un monitor cardíaco de 24 horas.",
            },
          ],
        },
      ];
      setReport(reportData);
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">{report.length > 0 ? <ReportViewer report={report} /> : <p>Cargando el informe...</p>}</div>
  );
};

export default Report;

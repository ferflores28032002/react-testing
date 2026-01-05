import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { DayActivity, ScheduleConfig } from '../../../core/types/schedule.types';

interface AutoTableDoc extends jsPDF {
  lastAutoTable: {
    finalY: number;
  };
}

interface CellHookData {
  section: 'head' | 'body' | 'foot';
  column: { index: number };
  cell: {
    raw: unknown;
    styles: {
      fillColor: [number, number, number] | string | number | false;
      textColor: [number, number, number] | string | number | false;
    };
  };
}

const ACTIVITY_COLORS: Record<string, [number, number, number]> = {
  S: [59, 130, 246],
  I: [168, 85, 247],
  P: [16, 185, 129],
  B: [249, 115, 22],
  D: [156, 163, 175],
  '-': [229, 231, 235]
};

const ACTIVITY_LABELS: Record<string, string> = {
  S: 'Subida (S)',
  I: 'Inducción (I)',
  P: 'Perforación (P)',
  B: 'Bajada (B)',
  D: 'Descanso (D)',
  '-': 'Inactivo (-)'
};

export const generateSchedulePdf = (schedule: DayActivity[], config: ScheduleConfig) => {
  const doc = new jsPDF();
  
  doc.setFontSize(20);
  doc.setTextColor(0, 0, 0);
  doc.text('Cronograma de Supervisores', 14, 20);
  
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Generado el: ${new Date().toLocaleDateString()}`, 14, 28);

  doc.setFontSize(12);
  doc.setTextColor(0);
  doc.text('Configuración:', 14, 40);
  
  const configData = [
    ['Supervisor 1', config.supervisor1Name || 'Supervisor 1'],
    ['Supervisor 2', config.supervisor2Name || 'Supervisor 2'],
    ['Supervisor 3', config.supervisor3Name || 'Supervisor 3'],
    ['Días Trabajo', config.workDays.toString()],
    ['Días Descanso', config.totalRestDays.toString()],
    ['Días Inducción', config.inductionDays.toString()]
  ];

  autoTable(doc, {
    startY: 45,
    head: [['Parámetro', 'Valor']],
    body: configData,
    theme: 'striped',
    headStyles: { fillColor: [66, 66, 66] },
    styles: { fontSize: 8 },
    margin: { left: 14 },
    tableWidth: 80
  });

  const legendY = 45;
  const legendX = 110;
  
  doc.text('Leyenda:', legendX, 40);
  
  Object.entries(ACTIVITY_COLORS).forEach(([key, color], index) => {
    const yPos = legendY + (index * 7);
    
    doc.setFillColor(color[0], color[1], color[2]);
    doc.rect(legendX, yPos, 5, 5, 'F');
    
    doc.setFontSize(8);
    doc.setTextColor(60);
    doc.text(ACTIVITY_LABELS[key], legendX + 8, yPos + 4);
  });

  const chunkSize = 15;
  let currentY = (doc as unknown as AutoTableDoc).lastAutoTable.finalY + 15;
  if (currentY < 100) currentY = 100;

  for (let i = 0; i < schedule.length; i += chunkSize) {
    const chunk = schedule.slice(i, i + chunkSize);
    const startDay = chunk[0].day;
    const endDay = chunk[chunk.length - 1].day;

    if (currentY > 250) {
      doc.addPage();
      currentY = 20;
    }

    doc.setFontSize(10);
    doc.setTextColor(0);
    doc.text(`Días ${startDay} - ${endDay}`, 14, currentY - 5);

    const tableBody = chunk.map(day => [
      day.day,
      day.supervisor1,
      day.supervisor2,
      day.supervisor3
    ]);

    autoTable(doc, {
      startY: currentY,
      head: [['Día', config.supervisor1Name || 'Supervisor 1', config.supervisor2Name || 'Supervisor 2', config.supervisor3Name || 'Supervisor 3']],
      body: tableBody,
      theme: 'grid',
      headStyles: { fillColor: [66, 66, 66], halign: 'center' },
      columnStyles: {
        0: { halign: 'center', fontStyle: 'bold', cellWidth: 20 },
        1: { halign: 'center', cellWidth: 50 },
        2: { halign: 'center', cellWidth: 50 },
        3: { halign: 'center', cellWidth: 50 }
      },
      didParseCell: (data: CellHookData) => {
        if (data.section === 'body' && data.column.index > 0) {
          const activity = data.cell.raw as string;
          const color = ACTIVITY_COLORS[activity];
          if (color) {
            data.cell.styles.fillColor = color;
            data.cell.styles.textColor = [255, 255, 255];
            if (activity === '-' || activity === 'D') {
              data.cell.styles.textColor = [0, 0, 0];
            }
          }
        }
      },
      margin: { left: 14, right: 14 }
    });

    currentY = (doc as unknown as AutoTableDoc).lastAutoTable.finalY + 15;
  }

  doc.save('cronograma-supervisores.pdf');
};

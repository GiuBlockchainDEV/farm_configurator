import jsPDF from 'jspdf'
import * as XLSX from 'xlsx'

export function ReportGenerator() {
  const exportPdf = () => {
    const doc = new jsPDF()
    doc.text('Irrigation Pro Report', 14, 20)
    doc.save('irrigation-report.pdf')
  }

  const exportXlsx = () => {
    const ws = XLSX.utils.json_to_sheet([{ name: 'Example', value: 123 }])
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Summary')
    XLSX.writeFile(wb, 'irrigation-report.xlsx')
  }

  return (
    <div className="flex gap-2">
      <button className="rounded border px-3 py-2" onClick={exportPdf}>Export PDF</button>
      <button className="rounded border px-3 py-2" onClick={exportXlsx}>Export Excel</button>
    </div>
  )
}


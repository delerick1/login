export default function ScheduleNotes() {
  return (
    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
      <h3 className="text-sm font-medium text-yellow-800 mb-2">Schedule Notes:</h3>
      <ul className="text-sm text-yellow-700 space-y-1">
        <li>• This schedule is assigned by your administrator</li>
        <li>• All times are in your local timezone</li>
        <li>• QA Time is mandatory quality assurance training</li>
        <li>• Contact your supervisor for schedule changes</li>
      </ul>
    </div>
  )
}
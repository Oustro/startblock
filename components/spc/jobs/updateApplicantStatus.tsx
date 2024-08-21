import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function UpdateApplicantStatus({ value } : { value: string}) {
  const status = [
    "Applied",
    "Inverview",
    "Hired",
    "Rejected"
  ];

  return (
    <Select
    defaultValue={value}
    >
      <SelectTrigger
      className="rounded-none bg-transparent w-fit gap-4 border-our-gray text-sm"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
          {status.map((status) => (
            <SelectItem 
            key={status} 
            value={status}
            >
              {status}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  )
}
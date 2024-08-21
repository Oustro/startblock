import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function UpdateApplicantScore({ value } : { value: string | null | undefined }) {
  const scores = [
    "Weak Candidate",
    "Below Average Candidate",
    "Above Average Candidate",
    "Strong Candidate",
  ];

  return (
    <Select
    defaultValue={value || ""}
    >
      <SelectTrigger
      className="rounded-none bg-transparent w-fit gap-4 border-our-gray text-sm"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
          {scores.map((score) => (
            <SelectItem 
            key={score} 
            value={score}
            >
              {score}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  )
}
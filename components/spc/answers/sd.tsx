import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { cn } from "@/lib/utils";

export default function SchoolDropdown({ className, disabled, required, answerQuestionFunction, index } : { className?: string, disabled?: boolean, required?: boolean, answerQuestionFunction?: Function, index?: number }) {
  const schools = [
    "Amherst College",
    "Boston College",
    "Boston University",
    "Brigham Young University",
    "Brown University",
    "California Institute of Technology (Caltech)",
    "Carnegie Mellon University",
    "Columbia University",
    "Cornell University",
    "Dartmouth College",
    "Duke University",
    "Emory University",
    "Georgetown University",
    "Harvard University",
    "Johns Hopkins University",
    "Massachusetts Institute of Technology (MIT)",
    "New York University (NYU)",
    "Northwestern University",
    "Ohio State University",
    "Pennsylvania State University (Penn State)",
    "Princeton University",
    "Rice University",
    "Stanford University",
    "Texas A&M University",
    "Tulane University",
    "University of California, Berkeley",
    "University of California, Los Angeles (UCLA)",
    "University of California, San Diego (UCSD)",
    "University of Chicago",
    "University of Florida",
    "University of Georgia",
    "University of Illinois at Urbana-Champaign",
    "University of Michigan",
    "University of North Carolina at Chapel Hill",
    "University of Notre Dame",
    "University of Pennsylvania",
    "University of Southern California (USC)",
    "University of Texas at Austin",
    "University of Virginia",
    "University of Washington",
    "Vanderbilt University",
    "Washington University in St. Louis",
    "Williams College",
    "Yale University",
    "Other"
  ];

  return (
    <Select
    onValueChange={(e) => answerQuestionFunction && answerQuestionFunction("School", e, index, "SD")}
    disabled={disabled}
    required={required}
    >
      <SelectTrigger className={cn("rounded-none bg-transparent w-fit gap-4 border-our-gray", className)}>
        <SelectValue placeholder="Select..." />
      </SelectTrigger>
      <SelectContent className="rounded-none mt-1">
        {schools.map((school) => (
          <SelectItem key={school} value={school}>{school}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
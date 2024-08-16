"use client"

import { useState } from "react"

import ActionButton from "@/components/ui/action-button";
import Input from "@/components/ui/input-field";
import EllipsisDropdown from "@/components/ui/ellipse-dropdown";

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"

import { CircleMinus } from "lucide-react"

import { saveWhiteList } from "@/lib/team";

export default function WhiteList({ teamId, whitelist } : { teamId: string, whitelist: string[] }) {
  const [currWhitelist, setCurrWhitelist] = useState<string[]>(whitelist)
  const [origin, setOrigin] = useState<string>("")

  const [loading, setLoading] = useState(false)

  function addOrigin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setCurrWhitelist([...currWhitelist, origin])
    return setOrigin("")
  }

  async function saveWhitelist() {
    setLoading(true);
    await saveWhiteList(teamId, currWhitelist);
    return setLoading(false);
  }

  return (
    <>
      <div className="w-full border border-our-gray py-6 px-8 mt-8">
        <h2 className="text-xl font-heading">Allowed Origins</h2>
        <p className="text-our-gray mt-2">This key unlocks the StartBlock API and SDK to be used on your own apps.</p>
        <form 
        className="mt-4"
        onSubmit={addOrigin}
        >
          <div className="flex justify-between gap-4 mt-3">
            <Input
            name="whitelist"
            className="w-[800%]"
            type="url"
            disabled={loading}
            required
            placeholder="https://example.com"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            />
            <ActionButton 
            type="submit"
            disabled={loading}
            >
              Add Origin
            </ActionButton>
          </div>
        </form>
        <Table className="mt-8">
          <TableBody>
            {currWhitelist.length === 0 ? (
              <TableRow className="hover:bg-white border-our-gray hover:bg-transparent">
                <TableCell colSpan={2} className="text-center">No origins found.</TableCell>
              </TableRow>
            ) : ( currWhitelist.map((origin) => (
              <TableRow key={origin} className="border-our-gray hover:bg-transparent">
                <TableCell className="font-medium">{origin}</TableCell>
                <TableCell className="text-right">
                  <EllipsisDropdown>
                    <DropdownMenuItem
                    className="gap-2"
                    onClick={() => setCurrWhitelist(currWhitelist.filter((item) => item !== origin))}
                    >
                      <CircleMinus 
                      size={16} 
                      />
                      Remove
                    </DropdownMenuItem>
                  </EllipsisDropdown>
                </TableCell>
              </TableRow>
            )))}
          </TableBody>
        </Table>
      </div>  
      <div className="py-4 px-8 bg-white border-r border-l border-b border-our-gray flex justify-between items-center">
        <p className="text-our-gray text-sm w-full">Check out our documentation to use StartBlock in your apps.</p>
        <ActionButton 
        className="w-36"
        onClick={saveWhitelist}
        disabled={loading}
        >
          Save Whitelist
        </ActionButton>
      </div>
    </>
  )
}
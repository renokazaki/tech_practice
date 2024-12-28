import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";
import { PlusIcon } from "lucide-react";

const groups = [
  { label: "Personal Account", teams: [{ label: "Evandro V." }] },
  {
    label: "Team Account",
    teams: [
      { label: "Evandro V1." },
      { label: "Evandro V2." },
      { label: "Evandro V3." },
    ],
  },
];

const Teams = () => {
  return (
    <Popover>
      {/* asChild プロパティを使用してネスト問題を解消 */}
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-label="Select a team"
          className="w-auto sm:w-[200px]  justify-around"
        >
          <Avatar className="mr-2 h-8 w-8">
            <AvatarImage
              src="http://avatar.vercel.sh/Evandro.png"
              alt="Avatar"
              className="grayscale"
            />
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandInput placeholder="Search Team..." />
          <CommandList>
            <CommandEmpty>No Team Found</CommandEmpty>
            {groups.map((group) => (
              <CommandGroup key={group.label} heading={group.label}>
                {group.teams.map((team) => (
                  <CommandItem key={team.label} className="text-sm">
                    <Avatar className="mr-2 h-5 w-5">
                      <AvatarImage
                        src={`http://avatar.vercel.sh/${team.label}.png`}
                      />
                    </Avatar>
                    {team.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
          <CommandSeparator />
          <CommandGroup>
            <CommandItem className="mt-4">
              <PlusIcon className=" w-4 h-4 mr-2" />
              create a new team
            </CommandItem>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Teams;

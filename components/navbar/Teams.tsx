import React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCategoryAction } from "@/lib/actions/getCategoryAction";

// import { PlusIcon } from "lucide-react";

// import { Button } from "../ui/button";
// import CategoryDialog from "./CategoryDialog";

export const Teams = async () => {
  // const [isAdd, setIsAdd] = useState(false);

  const category = await getCategoryAction();

  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {category && category.length > 0 ? (
            category.map((item) => (
              <SelectItem
                key={item.id}
                value={item.id.toString()}
                className="cursor-pointer border-b-2"
              >
                <div>{item.id}</div>
              </SelectItem>
            ))
          ) : (
            <div className="text-gray-500 px-4 py-2">No categories found</div>
          )}
        </SelectGroup>

        {/* <Button className="w-[180px] mt-2" onClick={() => setIsAdd(true)}>
          <PlusIcon className=" flex justify-center " />
          create category
        </Button>
        <CategoryDialog isAdd={isAdd} onClose={() => setIsAdd(false)} /> */}
      </SelectContent>
    </Select>
  );
};

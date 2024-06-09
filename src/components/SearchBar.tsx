"use client";

import { FC, useCallback, useState } from "react";
import { Command, CommandGroup, CommandInput, CommandList } from "./ui/Command";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CommandEmpty, CommandItem } from "cmdk";
import { useRouter } from "next/navigation";
import { Users } from "lucide-react";
import debounce from "lodash.debounce";
import { MdVerified } from "react-icons/md";

interface SearchBarProps { }

const SearchBar: FC<SearchBarProps> = ({ }) => {
  const [input, setInput] = useState<string>("");
  const [groups, setGroups] = useState<any[]>([]);

  const {
    data: queryResults,
    refetch,
    isFetched,
    isFetching,
  } = useQuery({
    queryFn: async () => {
      if (!input) return [];
      const { data } = await axios.get(
        `http://localhost:5165/api/subject-group/search?name=${input}`
      );

      setGroups(data.subjectGroupsFound.$values);

      return data;
    },
    queryKey: ["search-query"],
    enabled: false,
  });

  const request = debounce(() => {
    refetch();
  });

  const debounceRequest = useCallback(() => {
    request();
  }, []);

  const router = useRouter();

  return (
    <Command className="relative rounded-lg border max-w-lg z-50 overflow-visible">
      <CommandInput
        value={input}
        onValueChange={(text) => {
          setInput(text);
          debounceRequest();
        }}
        className="outline-none border-none focus:border-none focus:outline-none ring-0"
        placeholder="Procurar um grupo..."
      />
      {input.length > 0 ? (
        <CommandList className="absolute bg-white top-full inset-x-0 shadow rounded-b-md">
          {isFetched && <CommandEmpty>Nenhum resultado.</CommandEmpty>}
          {(groups?.length ?? 0) > 0 ? (
            <CommandGroup heading="Grupos">
              {groups?.map((group) => (
                <CommandItem key={group.name} value={group.name}>
                  <div className="flex items-center">
                    <a
                      className="group-link bg-transparent hover:bg-gray-100 text-black font-semibold py-2 px-4 border border-gray-400 rounded shadow flex items-center"
                      style={{ marginTop: "10px", marginLeft: "7px" }}
                      href={`/subjectgroup/${group.name}`}
                    >
                      <span>{group.name}</span>
                      {group.isOfficial && (
                        <MdVerified
                          title="Grupo oficial."
                          className="text-black-500 cursor-pointer ml-2"
                          style={{ fontSize: "25px", marginTop: "2px" }}
                        />
                      )}
                    </a>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          ) : null}
        </CommandList>
      ) : null}
    </Command>
  );
};

export default SearchBar;

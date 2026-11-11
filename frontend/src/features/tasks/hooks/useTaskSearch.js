import { useCallback, useState } from "react";
import { getTasks } from "../services/taskApi.js";
import useRequest from "./useRequest.js";

export default function useTaskSearch(revision) {
  const [search, setSearch] = useState("");
  const keyword = search.trim();
  const searching = Boolean(keyword);

  const loadSearch = useCallback(
    (signal) => getTasks({ search: keyword, signal }),
    [keyword, revision],
  );
  const searchResults = useRequest(loadSearch, searching, 250);

  return { search, setSearch, searching, searchResults };
}

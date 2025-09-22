type Filter = {
  season: string | null;
  year: string | null;
  genres: string[] | null;
};

type SortBy = {
  label: string;
  value: string;
  selected?: boolean;
};

export { Filter, SortBy };

type SearchParam = {
  searchQuery?: string;
  type?: "ANIME" | "MANGA" | null;
  page?: number | null;
  perPage?: number | null;
  sort?:
    | "TITLE_ENGLISH"
    | "TITLE_ENGLISH_DESC"
    | "TRENDING_DESC"
    | "START_DATE_DESC"
    | "START_DATE";
};

export { SearchParam };

import { StudiosDto } from "@/types/dtos/StudiosDto";

/**
 * Formats a media status string into a more user-friendly representation.
 *
 * @param status - The media status string to format. Expected values are:
 *   - `"RELEASING"`: Represents a media that is currently airing.
 *   - `"FINISHED"`: Represents a media that has been completed.
 *   - `"NOT_YET_RELEASED"`: Represents a media that is upcoming and not yet released.
 *   - `"CANCELLED"`: Represents a media that has been cancelled.
 *   - `"HIATUS"`: Represents a media that is on hiatus.
 *   - Any other string will be returned as-is.
 *
 * @returns A user-friendly string representation of the media status.
 */
const formatMediaStatus = (status: string) => {
  // Type check to ensure status is valid
  if (!status) return "";

  switch (status) {
    case "RELEASING":
      return "Airing";
    case "FINISHED":
      return "Completed";
    case "NOT_YET_RELEASED":
      return "Upcoming";
    case "CANCELLED":
      return "Cancelled";
    case "HIATUS":
      return "Hiatus";
    default:
      return status;
  }
};

/**
 * Formats a given media format string into a more user-friendly representation.
 *
 * @param format - The media format string to be formatted.
 * Possible values include:
 * - `"TV"`: Represents a TV series.
 * - `"TV_SHORT"`: Represents a short TV series.
 * - `"MOVIE"`: Represents a movie.
 * - `"OVA"`: Represents an Original Video Animation.
 * - `"ONA"`: Represents an Original Net Animation.
 * - `"MUSIC"`: Represents a music-related media.
 * - `"MANGA"`: Represents a manga.
 * - `"NOVEL"`: Represents a novel.
 * - `"ONE_SHOT"`: Represents a one-shot manga or similar media.
 *
 * @returns A user-friendly string representation of the media format.
 * If the format is not recognized, the input format string is returned as-is.
 */
const formatMediaFormat = (format: string) => {
  // Type check to ensure format is valid
  if (!format) return "";

  switch (format) {
    case "TV":
      return "TV";
    case "TV_SHORT":
      return "Short TV";
    case "MOVIE":
      return "Movie";
    case "OVA":
      return "OVA";
    case "ONA":
      return "ONA";
    case "MUSIC":
      return "Music";
    case "MANGA":
      return "Manga";
    case "NOVEL":
      return "Novel";
    case "ONE_SHOT":
      return "One Shot";
    default:
      return format;
  }
};

/**
 * Formats a media type string into a more user-friendly format.
 *
 * @param type - The media type to format. Expected values are "ANIME", "MANGA", or other strings.
 * @returns A formatted string representing the media type.
 *          Returns "Anime" for "ANIME", "Manga" for "MANGA", and the original string for other values.
 */
const formatMediaType = (type: string) => {
  // Type check to ensure type is valid
  if (!type) return "";

  switch (type) {
    case "ANIME":
      return "Anime";
    case "MANGA":
      return "Manga";
    default:
      return type;
  }
};

/**
 * Removes HTML tags from a given string.
 *
 * @param description - The input string that may contain HTML tags.
 * @returns A string with all HTML tags removed.
 */
const formatMediaDescription = (description: string) => {
  // Type check to ensure description is valid
  if (!description) return "";

  // Remove HTML tags using a regular expression
  const regex = /(<([^>]+)>)/gi;
  return description.replace(regex, "");
};

/**
 * Formats a media duration (in minutes) into a human-readable string.
 *
 * @param duration - The duration of the media in minutes. Must be a positive number.
 * @returns A formatted string representing the duration in minutes, or "N/A" if the duration is invalid.
 */
const FormatMediaDuration = (duration: number) => {
  // Type check to ensure duration is valid
  if (!duration || duration <= 0) return "N/A";

  return `${duration} mins`;
};

/**
 * Formats a date object from individual day, month, and year components into a readable string.
 *
 * @param params - An object containing the date components.
 * @param params.day - The day of the month (1-31).
 * @param params.month - The month of the year (1-12).
 * @param params.year - The full year (e.g., 2023).
 * @returns A formatted date string in the "MMM DD, YYYY" format (e.g., "Jan 1, 2023")
 *          or "N/A" if any of the date components are invalid.
 */
const formatMediaDates = ({
  day,
  month,
  year,
}: {
  day: number | null;
  month: number | null;
  year: number | null;
}) => {
  // Type check to ensure date parts are valid
  if (!day || !month || !year) return "?";

  // Create a date object
  const date = new Date(year, month - 1, day); // Month is 0-indexed

  // Format the date to a more readable format
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

/**
 * Formats a list of studios into main studios and producers.
 *
 * @param studios - An object of type `StudiosDto` or `null` representing the studios data.
 *                  If `null`, the function returns default empty values.
 *
 * @returns An object containing:
 * - `mainStudios`: An array of strings representing the names of the main studios.
 * - `producers`: A single string of producer names, joined by commas.
 *
 * @example
 * const studios = {
 *   edges: [
 *     { isMain: true, node: { name: "Studio A" } },
 *     { isMain: false, node: { name: "Producer B" } },
 *   ],
 * };
 * const result = formatMediaStudios(studios);
 * // result: { mainStudios: ["Studio A"], producers: "Producer B" }
 */
const formatMediaStudios = (studios: StudiosDto | null) => {
  // Type check to ensure studios is valid
  if (!studios) return { mainStudios: [], producers: [] };

  // Filter the studios to get the main studios and the producers
  let main: Array<{
    id?: number;
    name: string;
  }> = [];
  let producers: string[] = [];

  // Iterate through the edges to separate main studios and producers
  studios.edges.forEach((studio) => {
    if (studio.isMain) {
      main.push({ name: studio.node.name, id: studio.id });
    } else {
      producers.push(studio.node.name);
    }
  });

  // Format the output
  return {
    mainStudios: main, // Return main studios as an array to map over later
    producers: producers.join(", "), // Join producers into a single string
  };
};

/**
 * Formats a media season and year into a readable string.
 *
 * @param params - An object containing the season and year to format.
 * @param params.season - The season of the media (e.g., "WINTER", "SPRING", "SUMMER", "FALL").
 *                        If null or invalid, the function will return "?".
 * @param params.year - The year of the media. If null or invalid, the function will return "?".
 * @returns A formatted string in the format "Season Year" (e.g., "Winter 2023").
 *          Returns "?" if either the season or year is invalid.
 */
const formatMediaSeason = ({
  season,
  year,
}: {
  season: string | null;
  year: number | null;
}) => {
  // Type check to ensure season and year are valid
  if (!season || !year) return "?";

  switch (season) {
    case "WINTER":
      return `Winter ${year}`;
    case "SPRING":
      return `Spring ${year}`;
    case "SUMMER":
      return `Summer ${year}`;
    case "FALL":
      return `Fall ${year}`;
    default:
      return "TBD"; // To Be Decided
  }
};

/**
 * Formats a media relation string into a more user-friendly representation.
 *
 * @param relation - The media relation string to format. Expected values include:
 *   - "ADAPTATION": Returns "Adaptation".
 *   - "PREQUEL": Returns "Prequel".
 *   - "SEQUEL": Returns "Sequel".
 *   - "PARENT": Returns "Parent Story".
 *   - "SIDE_STORY": Returns "Side Story".
 *   - "CHARACTER": Returns "Character".
 *   - "SUMMARY": Returns "Summary".
 *   - "ALTERNATIVE": Returns "Alternative Version".
 *   - "SPIN_OFF": Returns "Spin-off".
 *   If the input does not match any of these values, the function returns the input as-is.
 *
 * @returns A formatted string representing the media relation, or an empty string if the input is invalid.
 */
const formatMediaRelations = (relation: string) => {
  // Type check to ensure relation is valid
  if (!relation) return "";

  switch (relation) {
    case "ADAPTATION":
      return "Adaptation";
    case "PREQUEL":
      return "Prequel";
    case "SEQUEL":
      return "Sequel";
    case "PARENT":
      return "Parent Story";
    case "SIDE_STORY":
      return "Side Story";
    case "CHARACTER":
      return "Character";
    case "SUMMARY":
      return "Summary";
    case "ALTERNATIVE":
      return "Alternative Version";
    case "SPIN_OFF":
      return "Spin-off";
    case "OTHER":
      return "Other";
    default:
      return relation;
  }
};

export {
  formatMediaDates,
  formatMediaDescription,
  FormatMediaDuration,
  formatMediaFormat,
  formatMediaRelations,
  formatMediaSeason,
  formatMediaStatus,
  formatMediaStudios,
  formatMediaType,
};

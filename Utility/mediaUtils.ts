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
const formatDescription = (description: string) => {
  // Type check to ensure description is valid
  if (!description) return "";

  // Remove HTML tags using a regular expression
  const regex = /(<([^>]+)>)/gi;
  return description.replace(regex, "");
};

export {
  formatDescription,
  formatMediaFormat,
  formatMediaStatus,
  formatMediaType,
};

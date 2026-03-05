export function timeAgo(dateString) {
  const now = new Date();
  const past = new Date(dateString);
  const diffInSeconds = Math.floor((now - past) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000, short: "y" },
    { label: "month", seconds: 2592000, short: "mo" },
    { label: "week", seconds: 604800, short: "w" },
    { label: "day", seconds: 86400, short: "d" },
    { label: "hour", seconds: 3600, short: "h" },
    { label: "minute", seconds: 60, short: "m" },
    { label: "second", seconds: 1, short: "s" },
  ];

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto", style: "long" });

  for (let interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count >= 1) {
      const formatted = rtf.format(-count, interval.label);
      const cleanFormatted = formatted.replace(" ago", "");
      // Replace full labels with short versions
      return cleanFormatted
        .replace("years", interval.short)
        .replace("year", interval.short)
        .replace("months", interval.short)
        .replace("month", interval.short)
        .replace("weeks", interval.short)
        .replace("week", interval.short)
        .replace("days", interval.short)
        .replace("day", interval.short)
        .replace("hours", interval.short)
        .replace("hour", interval.short)
        .replace("minutes", interval.short)
        .replace("minute", interval.short)
        .replace("seconds", interval.short)
        .replace("second", interval.short);
    }
  }

  return "just now";
}

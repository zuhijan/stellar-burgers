import { formatRelative, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import { capitalizeFirstLetter } from "./capitalizeFirstLetter";

export const formatDate = (date: string) => {
  const today = new Date();

  const comparisonDate = parseISO(date);

  let timeZone = comparisonDate.toLocaleDateString("ru-Ru", {
    timeZoneName: "short",
  });

  timeZone = timeZone.split(" ")[1];

  const d = formatRelative(comparisonDate, today, {
    locale: ru,
  });

  return capitalizeFirstLetter(d + ", " + timeZone);
};

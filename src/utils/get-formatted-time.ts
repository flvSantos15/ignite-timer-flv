/* eslint-disable prettier/prettier */
export const dateDiffHoursMinutes = (date: number) => {
  const hours = Math.floor(date / 3600000);
  const minutes = Math.floor((date % 3600000) / 60000);

  console.log(date);
  console.log(hours);
  console.log(minutes);

  const currentTimeWork = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padEnd(2, "0")} hrs`;

  return currentTimeWork;
};

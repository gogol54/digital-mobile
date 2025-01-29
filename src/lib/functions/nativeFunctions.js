export const formatDate = (inputDate) => {
    if(inputDate !== undefined && inputDate) {
      const [datePart, timePart] = inputDate.split(" ");
      const [day, month, year] = datePart.split("/").map(Number);
      const [hours, minutes] = timePart.split(":").map(Number);

      const date = new Date(year, month - 1, day, hours, minutes);

      const weekdays = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
      const months = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

      const weekday = weekdays[date.getDay()];
      const formattedDate = `${weekday} ${day} ${months[month - 1]}  •  ${timePart}`;

      return formattedDate;
    }
    else 
      return inputDate
}
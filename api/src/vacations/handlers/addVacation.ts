import { pool } from "../../database";

interface IVacation {
  destination: string;
  description: string;
  startDate: Date;
  endDate: Date;
  price: number;
  image: string;
}

function convertToMySQLDateTime(isoDate) {
  const date = new Date(isoDate);
  return date.toISOString().slice(0, 19).replace("T", " ");
}

async function addVacationApi(vacation: IVacation) {
  const convertedStartDate = convertToMySQLDateTime(vacation.startDate);
  const convertedEndDate = convertToMySQLDateTime(vacation.endDate);

  const query =
    "INSERT INTO vacations.`vacations_table`(destination, description, startDate, endDate, price, image) VALUES (?,?,?,?,?,?);";
  const results = await pool.execute(query, [
    vacation.destination,
    vacation.description,
    convertedStartDate,
    convertedEndDate,
    vacation.price,
    vacation.image,
  ]);
  const [data] = results;
  return data;
}

export { addVacationApi };

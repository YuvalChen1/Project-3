import { pool } from "../../database";

interface IVacation {
  destination: string;
  description: string;
  startDate: Date;
  endDate: Date;
  price: number;
  image: string;
}

async function addVacationApi(vacation: IVacation) {
  const query =
    "INSERT INTO vacations.`vacations_table`(destination, description, startDate, endDate, price, image) VALUES (?,?,?,?,?,?);";
  const results = await pool.execute(query, [
    vacation.destination,
    vacation.description,
    vacation.startDate,
    vacation.endDate,
    vacation.price,
    vacation.image,
  ]);
  const [data] = results;
  return data;
}

export { addVacationApi };

import { pool } from "../../database";

interface IVacation {
  id: number;
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

async function editVacationByIdApi(vacation: IVacation) {
  const convertedStartDate = convertToMySQLDateTime(vacation.startDate);
  const convertedEndDate = convertToMySQLDateTime(vacation.endDate);
  const query = `
    UPDATE vacations_table 
    SET 
      destination = ?,
      description = ?,
      startDate = ?,
      endDate = ?,
      price = ?,
      image = ?
    WHERE id = ?;
  `;
  const results = await pool.execute(query, [
    vacation.destination,
    vacation.description,
    convertedStartDate,
    convertedEndDate,
    vacation.price,
    vacation.image,
    vacation.id,
  ]);
  const [data] = results;
  return data;
}

export { editVacationByIdApi };

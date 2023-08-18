import { pool } from "../../database";

interface IVacation {
  destination: string;
  description: string;
  startDate: Date;
  endDate: Date;
  price: number;
  image: string;
}

async function editVacationByIdApi(id: number, vacation: IVacation) {
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
    vacation.startDate,
    vacation.endDate,
    vacation.price,
    vacation.image,
    id,
  ]);
  const [data] = results;
  return data;
}

export { editVacationByIdApi };

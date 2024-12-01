import Database from '@better-sqlite3/better-sqlite3';

const db = new Database('mushrooms.db');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS mushrooms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    species TEXT NOT NULL,
    location TEXT NOT NULL,
    date TEXT NOT NULL,
    notes TEXT,
    edible BOOLEAN NOT NULL,
    imageUrl TEXT
  )
`);

export const insertMushroom = (mushroom: Omit<Mushroom, 'id'>) => {
  const stmt = db.prepare(`
    INSERT INTO mushrooms (species, location, date, notes, edible, imageUrl)
    VALUES (@species, @location, @date, @notes, @edible, @imageUrl)
  `);
  return stmt.run(mushroom);
};

export const getAllMushrooms = () => {
  const stmt = db.prepare('SELECT * FROM mushrooms ORDER BY date DESC');
  return stmt.all();
};

export const updateMushroom = (mushroom: Mushroom) => {
  const stmt = db.prepare(`
    UPDATE mushrooms 
    SET species = @species, location = @location, date = @date, 
        notes = @notes, edible = @edible, imageUrl = @imageUrl
    WHERE id = @id
  `);
  return stmt.run(mushroom);
};

export const deleteMushroom = (id: number) => {
  const stmt = db.prepare('DELETE FROM mushrooms WHERE id = ?');
  return stmt.run(id);
};
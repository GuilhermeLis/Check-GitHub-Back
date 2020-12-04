import Database from '@ioc:Adonis/Lucid/Database'

export async function rankingByAuthor() {
  const { rows } = await Database.rawQuery(`
    select d.author, count(d.author) as amount
      from developers d
      group by d.author
      order by amount desc
  `)
  return rows
}

export async function rankingByAddintions() {
  const { rows } = await Database.rawQuery(`
    select d.author, SUM(d.additions) as amount
      from developers d
      group by d.author
      order by amount desc
  `)
  return rows
}

export async function rankingByRemovals() {
  const { rows } = await Database.rawQuery(`
    select d.author, SUM(d.removals) as amount
      from developers d
      group by d.author
      order by amount desc
  `)
  return rows
}

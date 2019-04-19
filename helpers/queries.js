const stratObj = `
_id
map
comments
comps {
  name
  isDefense
  characters
}
`

const playerObj = `
_id
mainBtag
lineup
status
role {
name
}
doodle
`

export const getLineup = `
query getLineUp($id: MongoID!) {
  lineupById(_id: $id) {
    _id
    name
    description
    objectives
    players {
      mainBtag
      doodle
    }
    strats {
${stratObj}
    }
    matchHistory {
      date
    }
    matchSchedule {
      date
    }
  }
}
`

export const getPlayer = `
query getPlayer($player: FilterFindOnePlayerInput!) {
  playerOne(filter: $player) {
${playerObj}
  }
}
`

export const updatePlayer = `
mutation modifyPlayer($record: UpdateByIdPlayerInput!) {
  playerUpdateById(record: $record) {
    record {
${playerObj}
    }
  }
}
`



export const getMaps = `
query getMaps {
  mapsMany {
    _id
    name
    mapTypes
    thumbnail
    flagUrl
  }
}
`

export const addStrat = `
mutation addStrat($record: CreateOneStratInput!) {
  stratCreateOne(record: $record) {
    record {
${stratObj}
    }
  }
}
`
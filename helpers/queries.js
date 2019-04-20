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
  name
  lineup
  status
  doodle
  role {
    name
  }
`

/* LINEUP */
export const getLineup = `
query getLineUp($id: MongoID!) {
  lineupById(_id: $id) {
    _id
    name
    description
    objectives
    players {
      mainBtag
      name,
      status,
      doodle,
      role {
        name
      }
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

/* PLAYER */
export const getPlayer = `
query getPlayer($player: FilterFindOnePlayerInput!) {
  playerOne(filter: $player) {
${playerObj}
  }
}
`

export const loginPlayer = `
query {
  playerLogin {
    _id
    mainBtag
    name
    lineup
    status
    doodle
    role {
      name
    }
    profile {
      level
      portrait
      endorsement
      rank
      rank_img
      levelFrame
      levelStars
    }
    lastStats
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

/* DATA */
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

/* STRAT */
export const addStrat = `
mutation addStrat($record: CreateOneStratInput!) {
  stratCreateOne(record: $record) {
    record {
${stratObj}
    }
  }
}
`

/* MATCH */ 
export const createMatch = `
mutation createMatch($record: CreateOneMatchInput!) {
  matchCreateOne(record: $record) {
    record {
      _id
      date
      type
      result {
        map
        score
        enemyScore
      }
      sr
      teamSr
    }
  }
}
`

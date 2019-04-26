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

const matchObj = `
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
`


/* LINEUP */
const GET_LINEUP = `
query getLineUp($id: MongoID!) {
  lineupById(_id: $id) {
    _id
    name
    description
    objectives
    players {
      mainBtag
      name
      status
      doodle
      role {
        name
      }
    }
    strats {
${stratObj}
    }
    matchHistory {
${matchObj}
    }
    matchSchedule {
${matchObj}
    }
  }
}
`

/* PLAYER */
const GET_PLAYER = `
query getPlayer($player: FilterFindOnePlayerInput!) {
  playerOne(filter: $player) {
${playerObj}
  }
}
`

const LOGIN_PLAYER = `
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

const UPDATE_PLAYER = `
mutation modifyPlayer($record: UpdateByIdPlayerInput!) {
  playerUpdateById(record: $record) {
    record {
${playerObj}
    }
  }
}
`

/* DATA */
const GET_MAPS = `
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

const GET_CHARACTERS = `
query getCharacters {
  characterMany {
    _id
    name
    role {
      name
    }
    img
  }
}
`


/* STRAT */
const ADD_STRAT = `
mutation addStrat($record: CreateOneStratInput!) {
  stratCreateOne(record: $record) {
    record {
${stratObj}
    }
  }
}
`

const UPDATE_STRAT = `
mutation stratUpdate($record: UpdateByIdStratInput!) {
  stratUpdateById(record: $record) {
    recordId
  }
}
`

/* MATCH */ 
const CREATE_MATCH = `
mutation createMatch($record: CreateOneMatchInput!) {
  matchCreateOne(record: $record) {
    recordId
  }
}
`

const UDPDATE_MATCH = `
mutation matchUpdate($record: UpdateByIdMatchInput!) {
  matchUpdateById(record: $record) {
    recordId
  }
}
`

export { 
  ADD_STRAT,
  CREATE_MATCH,
  GET_LINEUP,
  GET_MAPS,
  GET_PLAYER,
  LOGIN_PLAYER,
  UPDATE_PLAYER,
  UDPDATE_MATCH,
  UPDATE_STRAT,
  GET_CHARACTERS
 }

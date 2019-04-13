export const getLineup = `
query getLineup($id: MongoID!) {
  lineupById(_id: $id) {
    _id
    name
    description
    objectives
    players {
      mainBtag
    }
    strats {
      _id
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
query GetPlayer($player: FilterFindOnePlayerInput!) {
  playerOne(filter: $player) {
    _id
    mainBtag
    lineup
    status
    role
  }
}
`
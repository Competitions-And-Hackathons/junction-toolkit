/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getGameSetting = /* GraphQL */ `
  query GetGameSetting($id: ID!) {
    getGameSetting(id: $id) {
      id
      version
      speed
      tanos
      backdoor
      infinite
      shoot
      doom
      createdAt
      updatedAt
    }
  }
`;
export const listGameSettings = /* GraphQL */ `
  query ListGameSettings(
    $filter: ModelGameSettingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGameSettings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        version
        speed
        tanos
        backdoor
        infinite
        shoot
        doom
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

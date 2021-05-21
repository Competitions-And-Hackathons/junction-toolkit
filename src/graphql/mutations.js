/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createGameSetting = /* GraphQL */ `
  mutation CreateGameSetting(
    $input: CreateGameSettingInput!
    $condition: ModelGameSettingConditionInput
  ) {
    createGameSetting(input: $input, condition: $condition) {
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
export const updateGameSetting = /* GraphQL */ `
  mutation UpdateGameSetting(
    $input: UpdateGameSettingInput!
    $condition: ModelGameSettingConditionInput
  ) {
    updateGameSetting(input: $input, condition: $condition) {
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
export const deleteGameSetting = /* GraphQL */ `
  mutation DeleteGameSetting(
    $input: DeleteGameSettingInput!
    $condition: ModelGameSettingConditionInput
  ) {
    deleteGameSetting(input: $input, condition: $condition) {
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

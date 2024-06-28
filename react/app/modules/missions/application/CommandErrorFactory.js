class CommandErrorFactory {
  static getErrorMessages() {
    return {
      INVALID_ACCOUNT_NAME: 'Invalid account name!',
      INVALID_MISSION_TITLE: 'Invalid mission title!',
      NOT_ENOUGH_MONEY_TO_PAY_REWARD: 'Not enough money to pay reward!',
    }
  }

  static throwInvalidAccountNameError() {
    throw new Error(
      CommandErrorFactory.getErrorMessages().INVALID_ACCOUNT_NAME
    );
  }

  static throwInvalidMissionTitleError() {
    throw new Error(
      CommandErrorFactory.getErrorMessages().INVALID_MISSION_TITLE
    );
  }

  static throwNotEnoughMoneyToPayRewardError() {
    throw new Error(
      CommandErrorFactory.getErrorMessages().NOT_ENOUGH_MONEY_TO_PAY_REWARD
    );
  }
}

export default CommandErrorFactory;

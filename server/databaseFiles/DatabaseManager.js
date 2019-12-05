class DatabaseManager {
  constructor({ Quiz, Ranking }) {
    this.Quiz = Quiz;
    this.Ranking = Ranking;
  }

  async insertRanking({ nickname, score }) {
    try {
      await this.Ranking.create({ nickname, score });
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = DatabaseManager;

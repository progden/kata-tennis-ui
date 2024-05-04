export class TennisError implements Error {
    name: string = "TennisError";
    message: string;

    constructor(msg: string) {
        this.message = msg;
    }
}

export class TennisGame {
    private scoreMap = ["love", "fifteen", "thirty", "forty"];
    private player1Score: number = 0;
    private player2Score: number = 0;

    score() {
        return this.isWin() ? this.winScore()
            : this.isDeuce() ? this.deuceScore()
                : this.isAdv() ? this.advScore()
                    : this.normalScore();
    }

    private isDeuce() {
        return this.bothPlayerScoreGreatThen4() && this.isDraw();
    }

    private normalScore() {
        if (this.isDraw()) {
            return this.p1DispScore() + "-all";
        }
        return this.p1DispScore() + "-" + this.p2DispScore();
    }

    private deuceScore() {
        return "deuce";
    }

    private advScore() {
        return `${this.winner()} advantage`;
    }

    private winScore() {
        return `${(this.winner())} win`;
    }

    private isWin() {
        return (this.bothPlayerScoreGreatThen4() && this.scoreDiff() >= 2)
            || (!this.bothPlayerScoreGreatThen4() && (this.player1Score >= 4 || this.player2Score >= 4));
    }

    private scoreDiff() {
        return Math.abs(this.player1Score - this.player2Score);
    }

    private isAdv() {
        return this.bothPlayerScoreGreatThen4() && this.scoreDiff() === 1;
    }

    private isDraw() {
        return this.player1Score === this.player2Score;
    }

    private bothPlayerScoreGreatThen4() {
        return this.player1Score >= 3 && this.player2Score >= 3;
    }

    private p2DispScore() {
        return this.scoreMap[this.player2Score];
    }

    private p1DispScore() {
        return this.scoreMap[this.player1Score];
    }

    private winner() {
        return this.player1Score > this.player2Score ? "player1" : "player2";
    }

    wonPoint(player: string) {
        if (player === "player1") {
            this.player1Score++;
            return;
        } else if (player === "player2") {
            this.player2Score++;
            return;
        }

        throw new TennisError("Player not found");
    }
}
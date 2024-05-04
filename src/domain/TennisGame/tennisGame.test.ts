import {beforeEach, expect, test, describe} from 'vitest';
import {TennisGame} from "./tennisGame.ts";

var game = new TennisGame();
beforeEach(() => {
    game = new TennisGame();
});
test("game score is love-all when player2 got 0 point", () => {
    expect(game.score()).toBe("love-all");
    game.wonPoint("player1");
    expect(game.score()).toBe("fifteen-love");
    game.wonPoint("player1");
    expect(game.score()).toBe("thirty-love");
    game.wonPoint("player1");
    expect(game.score()).toBe("forty-love");
});
test("game score is love-fifteen when player2 got 1 point", () => {
    wonPoints("player2");
    expect(game.score()).toBe("love-fifteen");
    game.wonPoint("player1");
    expect(game.score()).toBe("fifteen-all");
    game.wonPoint("player1");
    expect(game.score()).toBe("thirty-fifteen");
    game.wonPoint("player1");
    expect(game.score()).toBe("forty-fifteen");
});

test("game score is love-thirty when player2 got 2 point", () => {
    wonPoints("player2", 2);
    expect(game.score()).toBe("love-thirty");
    game.wonPoint("player1");
    expect(game.score()).toBe("fifteen-thirty");
    game.wonPoint("player1");
    expect(game.score()).toBe("thirty-all");
    game.wonPoint("player1");
    expect(game.score()).toBe("forty-thirty");
});

test("game score is love-forty when player2 got 3 point", () => {
    wonPoints("player2", 3);
    expect(game.score()).toBe("love-forty");
    game.wonPoint("player1");
    expect(game.score()).toBe("fifteen-forty");
    game.wonPoint("player1");
    expect(game.score()).toBe("thirty-forty");
    game.wonPoint("player1");
    expect(game.score()).toBe("deuce");
})

function wonPoints(player: string, times: number = 1) {
    for (let i = 0; i < times; i++)
        game.wonPoint(player);
}

describe.each([
    {p1: 3, p2: 3, expected: "deuce"},
    {p1: 4, p2: 4, expected: "deuce"},
    {p1: 5, p2: 5, expected: "deuce"},
])("deuce", ({p1, p2, expected}) => {
    test(`${p1}-${p2} => ${expected}`, () => {
        wonPoints("player1", p1);
        wonPoints("player2", p2);
        expect(game.score()).toBe(expected);
    });
});

describe.each([
    {p1: 3, p2: 4, expected: "player2 advantage"},
    {p1: 4, p2: 5, expected: "player2 advantage"},
    {p1: 5, p2: 6, expected: "player2 advantage"},
    {p1: 4, p2: 3, expected: "player1 advantage"},
    {p1: 5, p2: 4, expected: "player1 advantage"},
    {p1: 6, p2: 5, expected: "player1 advantage"},
])("advantage", ({p1, p2, expected}) => {
    test(`${p1}-${p2} => ${expected}`, () => {
        wonPoints("player1", p1);
        wonPoints("player2", p2);
        expect(game.score()).toBe(expected);
    });
});

describe.each([
    {p1: 3, p2: 5, expected: "player2 win"},
    {p1: 4, p2: 6, expected: "player2 win"},
    {p1: 5, p2: 7, expected: "player2 win"},
    {p1: 5, p2: 3, expected: "player1 win"},
    {p1: 6, p2: 4, expected: "player1 win"},
    {p1: 7, p2: 5, expected: "player1 win"},
])("adv then win", ({p1, p2, expected}) => {
    test(`${p1}-${p2} => ${expected}`, () => {
        wonPoints("player1", p1);
        wonPoints("player2", p2);
        expect(game.score()).toBe(expected);
    });
});
describe.each([
    {p1: 2, p2: 4, expected: "player2 win"},
    {p1: 1, p2: 4, expected: "player2 win"},
    {p0: 0, p2: 4, expected: "player2 win"},
    {p1: 4, p2: 2, expected: "player1 win"},
    {p1: 4, p2: 1, expected: "player1 win"},
    {p1: 4, p2: 0, expected: "player1 win"},
])("normal win", ({p1, p2, expected}) => {
    test(`${p1}-${p2} => ${expected}`, () => {
        wonPoints("player1", p1);
        wonPoints("player2", p2);
        expect(game.score()).toBe(expected);
    });
});

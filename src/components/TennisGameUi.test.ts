import {test, expect, suite} from "vitest";

import {mount} from "@vue/test-utils";

import TennisGameUI from "./TennisGameUI.vue";
import {vi} from "vitest";

const list: string[] = [];
vi.mock('../domain/TennisGame/tennisGame.ts', () => ({
    TennisGame: vi.fn().mockImplementation(() => ({
        score: vi.fn().mockReturnValue('Some Tennis Score'),
        wonPoint: (name: string) => list.push(name),
    }))
}));


const vueWrapper = mount(TennisGameUI);

function click(selector: string, times: number = 1) {
    for (let i = 0; i < times; i++)
        vueWrapper.get(selector).trigger("click");
}

function shouldCount(player: string, times: number) {
    const filter = list.filter(v => v === player)
    expect(filter).toHaveLength(times);
}

suite("TennisGameUi", () => {
    test("should return message from mock when the game starts", () => {
        const msg = vueWrapper.get(".msg");
        expect(msg.text()).toContain("Some Tennis Score");
    });

    test("should call wonPoint correctly when click button", () => {
        click("#p1Score");
        shouldCount("player1", 1);
        click("#p1Score", 2);
        shouldCount("player1", 3);

        click("#p2Score");
        shouldCount("player1", 3);
        shouldCount("player2", 1);
    });
});
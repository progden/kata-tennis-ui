import {expect, suite, test, vi} from "vitest";

import {mount} from "@vue/test-utils";

import TennisGameUI from "./TennisGameUI.vue";

// mock TennisGameUI 的倚賴物件(Domain Model)
// 透過 spy 和 自訂的 list 來驗證是否呼叫了對應的方法
const scoreSpy = vi.fn();
const list: string[] = [];
vi.mock('../domain/TennisGame/tennisGame.ts', () => ({
    TennisGame: vi.fn().mockImplementation(() => ({
        score: scoreSpy.mockReturnValue('Some Tennis Score'),
        wonPoint: (name: string) => list.push(name),
    }))
}));

const vueWrapper = mount(TennisGameUI);

suite("TennisGameUi", () => {
    test("當遊戲開始時，應返回模擬物件的訊息", () => {
        const msg = vueWrapper.get(".msg");
        expect(msg.text()).toContain("Some Tennis Score");
        expect(scoreSpy).toHaveBeenCalledTimes(1);
    });

    test("當點擊按鈕時應正確地呼叫 wonPoint 和 score", () => {
        givenClick("#p1Score");
        shouldWonPointCount("player1", 1);
        shouldeGetScoreBeCalledTimes(2);

        givenClick("#p1Score", 2);
        shouldWonPointCount("player1", 3);
        shouldeGetScoreBeCalledTimes(4);

        givenClick("#p2Score");
        shouldWonPointCount("player2", 1);
        shouldeGetScoreBeCalledTimes(5);
    });
});

function givenClick(selector: string, times: number = 1) {
    for (let i = 0; i < times; i++)
        vueWrapper.get(selector).trigger("click");
}

function shouldWonPointCount(player: string, times: number) {
    expect(list.filter(v => v === player))
        .toHaveLength(times);
}

function shouldeGetScoreBeCalledTimes(number: number) {
    expect(scoreSpy).toHaveBeenCalledTimes(number);
}

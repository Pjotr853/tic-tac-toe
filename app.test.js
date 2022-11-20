import {describe, expect, test} from '@jest/globals';

import {check_line,
    set_stat_Play_board,
    get_stat_Play_board,
    checkBoardComplete,
    get_board_full,
    check_match,
    addComputerMove}
    from './app';


function resetBoard(){
    for (let i=0; i<9; i++) {
        set_stat_Play_board("",i);
    }
}

test('get and set board test',()=>{
    let play_board = ["", "", "", "", "", "", "", "", ""];
    set_stat_Play_board("",1);
    expect(
        get_stat_Play_board()
    ).toEqual(play_board)
    play_board = ["", "0", "", "", "", "", "", "", ""];
    set_stat_Play_board("0",1);
    expect(
        get_stat_Play_board()
    ).toEqual(play_board)
    play_board = ["", "", "", "", "", "", "", "", "X"];
    set_stat_Play_board("",1);
    set_stat_Play_board("X",8);
    expect(
        get_stat_Play_board()
    ).toEqual(play_board)
    play_board = ["", "", "", "0", "", "", "", "", "X"];
    set_stat_Play_board("0",3);
    expect(
        get_stat_Play_board()
    ).toEqual(play_board)
})

test('check_line test no deuce',()=>{
    expect(
        check_line(0,1,2)
    ).toBe(false)

    set_stat_Play_board("O",3);
    expect(
        check_line(0,1,2)
    ).toBe(false)

    set_stat_Play_board("O",0);
    set_stat_Play_board("O",1);
    expect(
        check_line(0,1,2)
    ).toBe(false)
    set_stat_Play_board("X",2);
    expect(
        check_line(0,1,2)
    ).toBe(false)
})


test('check_line test deuce',()=>{
    resetBoard();
    set_stat_Play_board("O",0);
    set_stat_Play_board("O",1);
    set_stat_Play_board("O",2);
    expect(
        check_line(0,1,2)
    ).toBe(true)

    set_stat_Play_board("X",2);
    set_stat_Play_board("X",4);
    set_stat_Play_board("X",6);
    expect(
        check_line(2,4,6)
    ).toBe(true)

    set_stat_Play_board("O",0);
    set_stat_Play_board("O",3);
    set_stat_Play_board("O",6);
    expect(
        check_line(0,3,6)
    ).toBe(true)
})

test('board is not complete',()=>{
    checkBoardComplete();
    expect(
        get_board_full()
    ).toBe(false)

})

test('board is  complete',()=>{
    for (let i=0; i<9; i++) {
        set_stat_Play_board("X",i);
    }

    checkBoardComplete();
    expect(
        get_board_full()
    ).toBe(true)
})

test('check match',()=>{
    resetBoard();
    expect(
        check_match()
    ).toEqual("")

    set_stat_Play_board("O",0);
    set_stat_Play_board("O",3);
    set_stat_Play_board("O",6);
    expect(
        check_match()
    ).toEqual("O")

    set_stat_Play_board("X",2);
    set_stat_Play_board("X",4);
    set_stat_Play_board("X",6);
    expect(
        check_match()
    ).toEqual("X")

    for (let i=0; i<9; i++) {
        set_stat_Play_board("O",i);
    }
    set_stat_Play_board("X",0);
    set_stat_Play_board("X",2);
    set_stat_Play_board("X",4);
    set_stat_Play_board("X",7);
    expect(
        check_match()
    ).toEqual("tie")

})

test('test computer move',()=>{
    resetBoard();
    checkBoardComplete();
    addComputerMove("hard");
    let isMove;
    let board=get_stat_Play_board();
    for (let i=0; i<9; i++) {
        if(board[i]==='X'){
            isMove=true;
        }
    }
    console.log("isMove" + board);
    expect(
        isMove
    ).toBe(true)
})


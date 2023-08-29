import { NextResponse } from "next/server";

const replacer = [
    ['у', 'y'],
    ['х', 'x'],
    ['а', 'a'],
    ['р', 'p'],
    ['о', 'o'],
    ['х', 'x'],
    ['е', 'e'],
    ['с', 'c'],
    ['А', 'A'],
    ['Е', 'E'],
    ['Р', 'P'],
    ['О', 'O'],
    ['Х', 'X'],
    ['В', 'B'],
    ['С', 'C'],
    ['М', 'M'],
    ['З', '3'],
    ['Н', 'H'],
    ['б', '6'],
    ['Т', 'T'],
    ['К', 'K'],
];


const methodCAR = (text: string) => {
    const words = text.split(' ');

    const formatted = words.map((item) => {
        let finalWord = item;

        replacer.forEach((item, index) => {
            finalWord = finalWord.replaceAll(item[0], item[1]);
        });

        return finalWord;
    });

    return NextResponse.json(
        {
            result: {
                formatted: formatted.join(' '),
            },
        },
        {
            status: 200,
        }
    );
};

export default methodCAR;
import { NextResponse } from "next/server";

const replacer = [
    ['а', '@'],
    ['и', 'u'],
    ['з', '3'],
    ['З', '3'],
    ['И', 'U'],
    ['о', '0'],
    ['О', '0'],
    ['ь', 'b'],
    ['Ь', 'b'],
    ['ч', '4'],
    ['Ч', '4'],
    ['у', 'y'],
    ['У', 'Y'],
    ['ш', 'w'],
    ['К', 'k'],
    ['К', 'K'],
    ['в', 'B'],
    ['В', 'B'],
    ['н', 'H'],
    ['Н', 'H'],
    ['б', '6'],
];


const methodUGLY = (text: string) => {
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

export default methodUGLY;
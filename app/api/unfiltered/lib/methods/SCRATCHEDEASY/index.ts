import { NextResponse } from 'next/server';

const replacer = [
    ['у', 'у̷'],
    ['е', 'е̷'],
    ['г', 'г̷'],
    ['х', 'х̷'],
    ['а', 'а̷'],
    ['р', 'р̷'],
    ['о', 'о̷'],
    ['с', 'с̷'],
    ['б', 'б̷'],
    ['У', 'У̷'],
    ['К', 'К̷'],
    ['Е', 'Е̷'],
    ['Н', 'Н̷'],
    ['З', 'З̷'],
    ['Х', 'Х̷'],
    ['В', 'В̷'],
    ['А', 'А̷'],
    ['Р', 'Р̷'],
    ['О', 'О̷'],
    ['С', 'С̷'],
    ['М', 'М̷'],
    ['Т', 'Т̷'],
    ['Ь', 'Ь̷'],
];

const methodSCRATCHEDEASY = (text: string) => {
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

export default methodSCRATCHEDEASY;

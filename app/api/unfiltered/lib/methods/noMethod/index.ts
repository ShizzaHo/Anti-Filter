import { NextResponse } from "next/server";

const noMethod = () => {
    return NextResponse.json(
        {
            error: {
                message: 'Неправильно указан режим обхода фильтра',
            },
        },
        {
            status: 400,
        }
    );
};

export default noMethod;
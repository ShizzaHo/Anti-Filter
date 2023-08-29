import { NextResponse } from 'next/server';
import methodCAR from './lib/methods/CAR';
import methodUGLY from './lib/methods/UGLY';
import methodSCRATCHED from './lib/methods/SCRATCHED';
import methodSCRATCHEDEASY from './lib/methods/SCRATCHEDEASY';
import noMethod from './lib/methods/noMethod';

export async function GET(request: Request) {
    const searchParams = request.nextUrl.searchParams;

    switch (searchParams.get('method')) {
        case 'CAR':
            return methodCAR(searchParams.get('text'));
            break;
        case 'UGLY':
            return methodUGLY(searchParams.get('text'));
            break;
        case 'SCRATCHED':
            return methodSCRATCHED(searchParams.get('text'));
            break;
        case 'SCRATCHEDEASY':
            return methodSCRATCHEDEASY(searchParams.get('text'));
            break;
        default:
            return noMethod();
            break;
    }
}

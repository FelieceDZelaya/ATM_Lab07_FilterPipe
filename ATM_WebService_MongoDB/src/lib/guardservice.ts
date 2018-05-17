import * as jwt from 'jsonwebtoken';

export class GuardService {

    private _secret = 'cnldkjfnfjddfjdknlmscdghjsndmfghjxfcgvhb';

    constructor() {

    }

    createToken(payLoad : object) : string {

        return jwt.sign(payLoad, this._secret, { expiresIn : 1400 });

    }

    verifyToken(token : string) : boolean {

        let retVal = false;

        jwt.verify(token, this._secret, (err,decoded) => { if(!err){ return retVal = true } });

        return retVal;

    }

    getDecoded(token : string) : object {

        let retVal = {};

        jwt.verify(token, this._secret, (err,decoded) => { if(!err){ return retVal = decoded } });

        return retVal;
        
    }

}
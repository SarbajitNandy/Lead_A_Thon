export default class ChessMove {
    private _moveCode: string;
    private _moveName: string;
    private _data : any;
    constructor(moveCode:string, moveName:string, data:any) {
        this._moveCode=moveCode;
        this._moveName=moveName;
        this._data=data;
    }

    get code() { return this._moveCode;}
    get name() { return this._moveName;}
    get data() { return this._data;}

    toObject() {
        return {
            code:this._moveCode,name:this._moveName,data:this._data
        }
    }
}
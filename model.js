class ChessMove {
    constructor(moveCode, moveName, data) {
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

module.exports=ChessMove
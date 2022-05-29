pragma solidity >=0.4.21 <0.7.0;

contract MyToken {
    struct Token {
        address owner;
        uint256 tokenValue;
    }

    Token[] public tokens;

    event NewToken(uint256 id, address owner, uint256 tokenValue);
    event UpdatedToken(uint256 id, address owner, uint256 tokenValue);

    mapping(address => uint256) public ownerOfToken;

    function createToken(uint256 tokenValue) public {
        require(
            ownerOfToken[msg.sender] == 0,
            "token and value already exist, call update instead"
        );
        uint256 id = tokens.push(Token(msg.sender, tokenValue)) - 1;
        ownerOfToken[msg.sender] = id;
        emit NewToken(id, msg.sender, tokenValue);
    }

    function setTokenValue(uint256 _tokenValue) public {
        require(
            msg.sender == tokens[ownerOfToken[msg.sender]].owner,
            "owner of the token doesnt match the sender"
        );
        uint256 id = ownerOfToken[msg.sender];
        tokens[id].tokenValue = _tokenValue;
        emit UpdatedToken(id, msg.sender, _tokenValue);
    }

    function getTokenBalance(address owner) public view returns (uint256) {
        uint256 id = ownerOfToken[owner];
        return (tokens[id].tokenValue);
    }

    function doesOwnerExist(address owner) public view returns (bool) {
        return ownerOfToken[owner] != 0;
    }
}

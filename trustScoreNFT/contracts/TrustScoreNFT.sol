// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./SignatureLibrary.sol";

error SignatureAlreadyUsed();
error SignatureNotValid();
error NonTransferableNFT();
error InvalidLevel();
error NonExistentToken();

contract TrustScoreNFT is ERC721, Ownable {
    enum Level {
        one,
        two,
        three
    }
    uint256 private _nextTokenId;
    uint256 public itemSupply;

    // Manage the signatures used to mint NFTs
    mapping(bytes => bool) public signatureUsed;
    mapping(uint256 => Level) private _tokenLevels;

    constructor() ERC721("TRUST SCORE NFT", "TRS NFT") Ownable(_msgSender()) {}

    function _allowedSignClaim(address _signer) internal view returns (bool) {
        return _signer == owner();
    }

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://QmcpfAT2D3Vt3rNsqSETm9wcfNEXoEK49zx1YxVB4MQkcv";
    }

    function _exists(uint256 tokenId) internal view returns (bool) {
        return _ownerOf(tokenId) != address(0);
    }

    function tokenLevel(uint256 tokenId) public view returns (Level) {
        if (!_exists(tokenId)) {
            revert NonExistentToken();
        }
        return _tokenLevels[tokenId];
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        if (!_exists(tokenId)) {
            revert NonExistentToken();
        }

        Level level = tokenLevel(tokenId);

        // Return a different URI based on the token's level
        if (level == Level.one) {
            return string(abi.encodePacked(_baseURI(), "/1.json"));
        } else if (level == Level.two) {
            return string(abi.encodePacked(_baseURI(), "/2.json"));
        } else if (level == Level.three) {
            return string(abi.encodePacked(_baseURI(), "/3.json"));
        } else {
            revert("Invalid level");
        }
    }

    function mint(
        address to,
        bytes32 hash,
        bytes memory signature,
        Level level
    ) public {
        if (signatureUsed[signature]) {
            revert SignatureAlreadyUsed();
        }
        if (
            !_allowedSignClaim(SignatureLibrary.recoverSigner(hash, signature))
        ) {
            revert SignatureNotValid();
        }
        signatureUsed[signature] = true;
        uint256 tokenId = _nextTokenId++;
        itemSupply++;
        _tokenLevels[tokenId] = level;
        _safeMint(to, tokenId);
    }

    // make the NFT non-transferable
    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override(ERC721) returns (address) {
        address from = _ownerOf(tokenId);
        if (from != address(0) && to != address(0)) {
            revert("Soulbound: Transfer failed");
        }

        return super._update(to, tokenId, auth);
    }
}

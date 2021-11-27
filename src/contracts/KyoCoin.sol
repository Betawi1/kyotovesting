// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC20.sol";

contract KyoCoin is ERC20 {
	constructor () ERC20("Kyoto Coin", "KYO") {
		_mint(_msgSender(), 1000000 * 10**18);
	}
}
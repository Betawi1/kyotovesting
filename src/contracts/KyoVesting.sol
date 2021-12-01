// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IERC20.sol";
import "./Ownable.sol";
import "./SafeMath.sol";

contract KyoVesting is IERC20, Ownable {
	using SafeMath for uint256;

	uint256 public interval;

	mapping (address => uint256) public employee;
	mapping (address => bool) public revoked;
	mapping (address => bool) public partners;
	mapping (address => bool) public completed;

	//time
	mapping (address => uint256) public first_schedule;
	mapping (address => uint256) public second_schedule;
	mapping (address => uint256) public third_schedule;
	mapping (address => uint256) public fourth_schedule;
	mapping (address => uint256) public fifth_schedule;
	mapping (address => uint256) public sixth_schedule;
	mapping (address => uint256) public seventh_schedule;
	mapping (address => uint256) public eighth_schedule;
	mapping (address => uint256) public ninth_schedule;
	mapping (address => uint256) public tenth_schedule;
	mapping (address => uint256) public eleventh_schedule;
	mapping (address => uint256) public twelfth_schedule;

	//amount
	mapping (address => uint256) public first_payment;
	mapping (address => uint256) public second_payment;
	mapping (address => uint256) public third_payment;
	mapping (address => uint256) public fourth_payment;
	mapping (address => uint256) public fifth_payment;
	mapping (address => uint256) public sixth_payment;
	mapping (address => uint256) public seventh_payment;
	mapping (address => uint256) public eighth_payment;
	mapping (address => uint256) public ninth_payment;
	mapping (address => uint256) public tenth_payment;
	mapping (address => uint256) public eleventh_payment;
	mapping (address => uint256) public twelfth_payment;

	IERC20 public kyo;

	constructor(address _kyo, uint256 _interval) {
		kyo = IERC20(_kyo);
		interval = _interval;
	}

	function add_partner(address _partner, uint256 _amount, uint256 _startTime) public onlyOwner {
		require(_partner != address(0));
		require(employee[_partner] < 1);
		require(partners[_partner] != true, "Partner already added.");
		require(_amount > 0);
		require(completed[_partner] != true, "Partner has already completed the full schedule.");
		employee[_partner] = _amount;
		partners[_partner] = true;

		// add timelocks to schedules
		first_schedule[_partner] = _startTime.add(interval);
		second_schedule[_partner] = first_schedule[_partner].add(interval);
		third_schedule[_partner] = second_schedule[_partner].add(interval);
		fourth_schedule[_partner] = third_schedule[_partner].add(interval);
		fifth_schedule[_partner] = fourth_schedule[_partner].add(interval);
		sixth_schedule[_partner] = fifth_schedule[_partner].add(interval);
		seventh_schedule[_partner] = sixth_schedule[_partner].add(interval);
		eighth_schedule[_partner] = seventh_schedule[_partner].add(interval);
		ninth_schedule[_partner] = eighth_schedule[_partner].add(interval);
		tenth_schedule[_partner] = ninth_schedule[_partner].add(interval);
		eleventh_schedule[_partner] = tenth_schedule[_partner].add(interval);
		twelfth_schedule[_partner] = eleventh_schedule[_partner].add(interval);

		//split amount into the schedules
		uint256 payment = _amount.div(12);
		first_payment[_partner] = payment;
		second_payment[_partner] = payment;
		third_payment[_partner] = payment;
		fourth_payment[_partner] = payment;
		fifth_payment[_partner] = payment;
		sixth_payment[_partner] = payment;
		seventh_payment[_partner] = payment;
		eighth_payment[_partner] = payment;
		ninth_payment[_partner] = payment;
		tenth_payment[_partner] = payment;
		eleventh_payment[_partner] = payment;
		twelfth_payment[_partner] = payment;
	}

	function add_employee(address _employee, uint256 _amount, uint256 _startTime) public onlyOwner {
		require(_employee != address(0));
		require(employee[_employee] < 1, "Employee already exists.");
		require(revoked[_employee] != true, "Revoked employee cannot be added.");
		require(completed[_employee] != true, "Completely vested employee cannot be added.");
		require(_amount > 0);
		employee[_employee] = _amount;

		// add timelocks to schedules
		first_schedule[_employee] = _startTime.add(interval);
		second_schedule[_employee] = first_schedule[_employee].add(interval);
		third_schedule[_employee] = second_schedule[_employee].add(interval);
		fourth_schedule[_employee] = third_schedule[_employee].add(interval);
		fifth_schedule[_employee] = fourth_schedule[_employee].add(interval);
		sixth_schedule[_employee] = fifth_schedule[_employee].add(interval);
		seventh_schedule[_employee] = sixth_schedule[_employee].add(interval);
		eighth_schedule[_employee] = seventh_schedule[_employee].add(interval);
		ninth_schedule[_employee] = eighth_schedule[_employee].add(interval);
		tenth_schedule[_employee] = ninth_schedule[_employee].add(interval);
		eleventh_schedule[_employee] = tenth_schedule[_employee].add(interval);
		twelfth_schedule[_employee] = eleventh_schedule[_employee].add(interval);

		//split amount into the schedules
		uint256 payment = _amount.div(12);
		first_payment[_employee] = payment;
		second_payment[_employee] = payment;
		third_payment[_employee] = payment;
		fourth_payment[_employee] = payment;
		fifth_payment[_employee] = payment;
		sixth_payment[_employee] = payment;
		seventh_payment[_employee] = payment;
		eighth_payment[_employee] = payment;
		ninth_payment[_employee] = payment;
		tenth_payment[_employee] = payment;
		eleventh_payment[_employee] = payment;
		twelfth_payment[_employee] = payment;
	}

	function revoke_employee(address _employee) public onlyOwner {
		require(_employee != address(0));
		require(partners[_employee] != true, "Partners cannot be revoked");
		require(employee[_employee] > 0, "Only active employee can be revoked");
		require(revoked[_employee] != true, "Employee has already been revoked");

		employee[_employee] = 0;
		revoked[_employee] = true;

		first_payment[_employee] = 0;
		second_payment[_employee] = 0;
		third_payment[_employee] = 0;
		fourth_payment[_employee] = 0;
		fifth_payment[_employee] = 0;
		sixth_payment[_employee] = 0;
		seventh_payment[_employee] = 0;
		eighth_payment[_employee] = 0;
		ninth_payment[_employee] = 0;
		tenth_payment[_employee] = 0;
		eleventh_payment[_employee] = 0;
		twelfth_payment[_employee] = 0;
	}

	function withdraw() public returns (bool) {
		require(employee[_msgSender()] > 0, "You must be an active employee/partner to withdraw");
		require(revoked[_msgSender()] != true, "Your membership has been revoked");
		
		if (block.timestamp > first_schedule[_msgSender()] && first_payment[_msgSender()] > 0) {
			require(kyo.transfer(_msgSender(), first_payment[_msgSender()]));
			employee[_msgSender()] = employee[_msgSender()].sub(first_payment[_msgSender()]);
			first_payment[_msgSender()] = 0;
			return true;
		} else if (block.timestamp > second_schedule[_msgSender()] && second_payment[_msgSender()] > 0) {
			require(kyo.transfer(_msgSender(), second_payment[_msgSender()]));
			employee[_msgSender()] = employee[_msgSender()].sub(second_payment[_msgSender()]);
			second_payment[_msgSender()] = 0;
			return true;
		} else if (block.timestamp > third_schedule[_msgSender()] && third_payment[_msgSender()] > 0) {
			require(kyo.transfer(_msgSender(), third_payment[_msgSender()]));
			employee[_msgSender()] = employee[_msgSender()].sub(third_payment[_msgSender()]);
			third_payment[_msgSender()] = 0;
			return true;
		} else if (block.timestamp > fourth_schedule[_msgSender()] && fourth_payment[_msgSender()] > 0) {
			require(kyo.transfer(_msgSender(), fourth_payment[_msgSender()]));
			employee[_msgSender()] = employee[_msgSender()].sub(fourth_payment[_msgSender()]);
			fourth_payment[_msgSender()] = 0;
			return true;
		} else if (block.timestamp > fifth_schedule[_msgSender()] && fifth_payment[_msgSender()] > 0) {
			require(kyo.transfer(_msgSender(), fifth_payment[_msgSender()]));
			employee[_msgSender()] = employee[_msgSender()].sub(fifth_payment[_msgSender()]);
			fifth_payment[_msgSender()] = 0;
			return true;
		} else if (block.timestamp > sixth_schedule[_msgSender()] && sixth_payment[_msgSender()] > 0) {
			require(kyo.transfer(_msgSender(), sixth_payment[_msgSender()]));
			employee[_msgSender()] = employee[_msgSender()].sub(sixth_payment[_msgSender()]);
			sixth_payment[_msgSender()] = 0;
			return true;
		} else if (block.timestamp > seventh_schedule[_msgSender()] && seventh_payment[_msgSender()] > 0) {
			require(kyo.transfer(_msgSender(), seventh_payment[_msgSender()]));
			employee[_msgSender()] = employee[_msgSender()].sub(seventh_payment[_msgSender()]);
			seventh_payment[_msgSender()] = 0;
			return true;
		} else if (block.timestamp > eighth_schedule[_msgSender()] && eighth_payment[_msgSender()] > 0) {
			require(kyo.transfer(_msgSender(), eighth_payment[_msgSender()]));
			employee[_msgSender()] = employee[_msgSender()].sub(eighth_payment[_msgSender()]);
			eighth_payment[_msgSender()] = 0;
			return true;
		} else if (block.timestamp > ninth_schedule[_msgSender()] && ninth_payment[_msgSender()] > 0) {
			require(kyo.transfer(_msgSender(), ninth_payment[_msgSender()]));
			employee[_msgSender()] = employee[_msgSender()].sub(ninth_payment[_msgSender()]);
			ninth_payment[_msgSender()] = 0;
			return true;
		} else if (block.timestamp > tenth_schedule[_msgSender()] && tenth_payment[_msgSender()] > 0) {
			require(kyo.transfer(_msgSender(), tenth_payment[_msgSender()]));
			employee[_msgSender()] = employee[_msgSender()].sub(tenth_payment[_msgSender()]);
			tenth_payment[_msgSender()] = 0;
			return true;
		} else if (block.timestamp > eleventh_schedule[_msgSender()] && eleventh_payment[_msgSender()] > 0) {
			require(kyo.transfer(_msgSender(), eleventh_payment[_msgSender()]));
			employee[_msgSender()] = employee[_msgSender()].sub(eleventh_payment[_msgSender()]);
			eleventh_payment[_msgSender()] = 0;
			return true;
		} else if (block.timestamp > twelfth_schedule[_msgSender()] && twelfth_payment[_msgSender()] > 0) {
			require(kyo.transfer(_msgSender(), twelfth_payment[_msgSender()]));
			employee[_msgSender()] = 0;
			twelfth_payment[_msgSender()] = 0;
			completed[_msgSender()] = true;
			return true;
		} else {
			require(block.timestamp < 1, "The next schedule is not due yet or ended.");
		}
		return false;
	}

	function withdraw_remaining_balance() public onlyOwner {
		uint256 bal = kyo.balanceOf(address(this));
		kyo.transfer(_msgSender(), bal);
	}

	function current_time() public view returns (uint256) {
		uint256 time = block.timestamp;
		return time;
	}

	//IERC20 implementations
	function allowance(address owner, address spender) external virtual override view returns (uint256) {}
	function approve(address spender, uint256 amount) external virtual override returns (bool) {}
	function balanceOf(address account) external virtual override view returns (uint256) {}
	function totalSupply() external virtual override view returns (uint256) {}
	function transfer(address recipient, uint256 amount) external virtual override returns (bool) {}
	function transferFrom(address sender, address recipient, uint256 amount) external virtual override returns (bool) {}
}
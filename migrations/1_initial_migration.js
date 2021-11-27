const Vest = artifacts.require("KyoVesting");

module.exports = async function (deployer) {
  const kyo_address = "0xaEBC9EbDd1CD6808b632aA675eA571EEddD0C5b4";
  await deployer.deploy(Vest, kyo_address, 7889229);
};

module.exports = {
  solidity: {
    version: '0.8.9',
    defaultNetwork: 'mumbai',
    networks: {
      hardhat: {},
      mumbai: {
        url: 'https://mumbai.rpc.thirdweb.com',
        // accounts: [`0x${process.env.PRIVATE_KEY}`]
        accounts: [`${process.env.THIRDWEB_PRIVATE_KEY}`]
      }
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};

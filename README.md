# Example Subgraph Test on Ganache OR Astra Chain

> Before executing test: ../test/myToken.test.forgraph.js

## Prerequisites

**Go to Terminal and follow this process**

### 1. install docker , ganache-cli
### 2. Execute: 
```bash
ganache-cli
```
### 3. Go to another terminal
```bash
git clone https://github.com/graphprotocol/graph-node/
```
```bash
cd graph-node/docker
```
```bash
docker-compose up
```
**Output should look like:**
```
bash
...
graph-node_1  | Apr 23 20:09:26.203 INFO Trying IPFS node at: http://ipfs:5001/
....
graph-node_1  | Apr 23 20:09:26.382 INFO Connecting to Ethereum..., network: mainnet
...
graph-node_1  | Apr 23 20:09:28.197 INFO Starting index node server at: http://localhost:8030, component: IndexNodeServer
graph-node_1  | Apr 23 20:09:28.197 INFO Starting metrics server at: http://localhost:8040, component: MetricsServer
```

> WARNING: If you see following message at the end:
```bash
graph-node_1  | thread 'tokio-runtime-worker' panicked at 'Ethereum node provided net_version 1587671615648, but we expected 1587666096729. Did you change networks without changing the network name?', store/postgres/src/store.rs:236:21
```
execute this command come to this repo and execute
```bash
yarn remove-local
```

If it still doesn't work... start from beginning don't waste time. Stop graph-node and remove, Clone the graph-node from beginning. Maybe even stop the dockers.

>WARNING: If you see this at the end and not changing, you have an issue with the ganache connection
```bash
Apr 23 20:09:26.382 INFO Connecting to Ethereum..., network: mainnet
```

### 4. Install graph-cli ONE TIME only 
```bash
npm install -g @graphprotocol/graph-cli
```

## Create SubGraph through this project

### 1. Deploy Test Contract 
```bash 
truffle compile
truffle migrate
```

### 2. Copy Contract Address from the output of truffle migrate to subgraph yaml: 

**example update**
```bash
    source:
      address: 'CONTRACT_ADDRESS'
```

### 3. Copy contractaddress from the output of truffle migrate to .env variable -> Update CONTRACT_ADDRESS variable

> !! WARNING !! If you don't update this part your data won't show up when you query graph!!!

### 4. Execute Yarn 
```bash
yarn && yarn codegen
```
**Output**
```bash
??? Load subgraph from subgraph.yaml
  Load contract ABI from build/contracts/MyToken.json
??? Load contract ABIs
  Generate types for contract ABI: MyToken (build/...
  Write types to generated/schema.ts
??? Generate types for GraphQL schema
Types generated successfully
```

### 5. Create local Subgraph
```bash
yarn create-local
```
**Output:**
```bash
$ graph create astraToken --node http://127.0.0.1:8020
Created subgraph: astraToken
???  Done in 1.01s.
```

### 6. Deploy to Local
```bash
yarn deploy-local
```

**Output:**
```bash
??? Load subgraph from subgraph.yaml...
??? Compile subgraph...
??? Write compiled subgraph to build/ ...
??? Upload subgraph to IPFS...
Queries (HTTP):     http://127.0.0.1:8000/subgraphs/name/astraToken
Subscriptions (WS): http://127.0.0.1:8001/subgraphs/name/astraToken
???  Done in 2.90s.
```

### 7. Check graph-node terminal;
You should see something like this:

```bash
graph-node_1  | Apr 23 20:20:58.952 INFO Scanning blocks [0, 0], range_size: 1, subgraph_id: QmbWZiRDpGb95WkA1QH8UM3wsUMZeBmr6ZW2UJaMtGZADB, component: SubgraphInstanceManager > BlockStream
```

### 8. execute truffle graph test
```bash
truffle test --network development test/mytoken.test.forgraph.js
```

**Output**
```bash
account: ..
Creating owner token Value: ..
Updating owner token Value: ..
    ??? In the test (151ms)
  1 passing (153ms)
```

### 9. Check your GraphQL:

```bash
http://localhost:8000/subgraphs/name/astraToken/graphql
```

### 10. Example Query:
```bash
{
  myTokens(orderBy: tokenValue, orderDirection: asc) {
    id
    owner
  }
}
```
**Output should look like:**
```bash
{
  "data": {
    "myTokens": [
      {
        "id": "0x2",
        "owner": "..."
      }...
    ]
  }
}
```

> WARNING ! If everything works fine but Data doesn't show up in GRAPH your contract address is wrong
Update the subgraph.yaml add , then execute in order

```bash
yarn run build
yarn run deploy-local
```

### 11. If you want to change something in the project that will effect GraphQL execute this command to update the Subgraph

```bash
yarn run redeploy-local
```

# Example Subgraph Test on ASTRA

### 1. GET ASTRA Chain : https://astraprotocol.github.io/docs/getting-started/astra-testnet.html

### 2. Follow everything in Ganache steps only difference is change this line to ASTRA Chain in docker-compose.yml: 

-      ethereum: 'mainnet:http://127.0.0.1:8545'

+      ethereum: 'astra:http://YourASTRAChainIP:YourASTRAChainPort'

### 3. Change ASTRA_Chain variable in .env

### 4. Execute the Graph test with network ASTRA

```bash
truffle test --network astra test/mytoken.test.forgraph.js
```

# Example ASTRA Chain Test

> Before executing test: ../test/myToken.test.js

## Prerequisites
### 1. GET ASTRA Chain : https://astraprotocol.github.io/docs/getting-started/astra-testnet.html

### 2. Update .env
Update these 3 variables:
```bash
ASTRA_CHAIN=https://YOUR_ASTRA_CHAIN:PORT
ACCOUNT=yourAcountFromMetamask
PRIVATE_KEY=<YOUR_PRIVATE_KEY>
```
### 3. Make sure your account have SKL tokens. Go to Faucet: 

http://faucet.astra.network/

### 4. No need to compile or deploy test runs both before testing. 

**Execute:**

```bash
truffle test test/myToken.test.js
```

If test runs fine it means ASTRA Chain is working. IMA and FileStorage tests will be added eventually. 
